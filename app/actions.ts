'use server';
import { cookies } from 'next/headers';

import { prisma } from '@/prisma/prisma-client';
import { CheckoutFormValues } from '@/shared/constants';
import { OrderStatus } from '@prisma/client';
import { createPayment, sendEmail } from '@/shared/lib';
import { OrderPayTemplate } from '@/shared/components';

export async function createOrder(data: CheckoutFormValues, totalPrice: number) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: totalPrice,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: totalPrice,
      orderId: order.id,
      description: 'Оплата заказа #' + order.id,
    });

    if (!paymentData) {
      throw new Error('Payment data not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      'Andres pizzeria | Оплатите заказ #' + order.id,
      OrderPayTemplate({
        orderId: order.id,
        totalAmount: totalPrice,
        paymentUrl,
      }),
    );

    return paymentUrl;
  } catch (error) {
    console.error('[CreateOrder] Server error', error);
  }
}