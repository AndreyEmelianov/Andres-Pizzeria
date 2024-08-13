import { NextRequest, NextResponse } from 'next/server';

import { PaymentCallbackData } from '@/types/youkassa';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { sendEmail } from '@/shared/lib';
import { OrderSuccessTemplate } from '@/shared/components';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Andres pizzeria | Ваш заказ успешно оформлен',
        OrderSuccessTemplate({ orderId: order.id, items }),
      );
    } else {
      console.error('[CheckoutStatus] payment failed');
    }
  } catch (error) {
    console.error('[CheckoutStatus] server error', error);
    return NextResponse.json({ error: 'CheckoutStatus server error', status: 500 });
  }
}
