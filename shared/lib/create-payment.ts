import axios from 'axios';

import { PaymentData } from '@/types/youkassa';

interface CreatePaymentProps {
  orderId: number;
  amount: number;
  description: string;
}

export const createPayment = async (details: CreatePaymentProps) => {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount.toString(),
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOUKASSA_CB_URL,
      },
    },
    {
      auth: {
        username: process.env.YOUKASSA_STORE_ID as string,
        password: process.env.YOUKASSA_API_KEY as string,
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
};
