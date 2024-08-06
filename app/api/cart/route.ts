import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

import { prisma } from '@/prisma/prisma-client';
import { findOrCreateCart, updateCartTotalAmount } from '@/shared/lib';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.error('server error [Cart_Get', error);
    return NextResponse.json({ message: 'Не удалось получить данные корзины' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: { in: data.ingredients },
          },
        },
      },
    });

    if (existingCartItem) {
      await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedUserCart);
    response.cookies.set('cartToken', token);
    return response;
  } catch (error) {
    console.error('server error [Cart_Post', error);
    return NextResponse.json({ message: 'Не удалось добавить товар в корзину' }, { status: 500 });
  }
}
