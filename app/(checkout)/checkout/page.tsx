'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import {
  CheckoutAddressInfo,
  CheckoutCart,
  CheckoutPersonalInfo,
  CheckoutSidebar,
  Container,
  Title,
} from '@/shared/components';
import { CheckoutFormValues, checkoutFormSchema } from '@/shared/constants';
import { useCart } from '@/shared/hooks';
import { createOrder } from '@/app/actions';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const { loading } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true);
      const paymentUrl = await createOrder(data, totalPrice);
      setTotalPrice(0);
      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (paymentUrl!) {
        location.href = paymentUrl;
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="text-[36px] font-extrabold mb-8" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col flex-1 gap-10 mb-20">
              <CheckoutCart />
              <CheckoutPersonalInfo className={loading ? 'opacity-50 pointer-events-none' : ''} />
              <CheckoutAddressInfo className={loading ? 'opacity-50 pointer-events-none' : ''} />
            </div>

            <div className="w-[450px]">
              <CheckoutSidebar submitting={submitting} setTotalPrice={setTotalPrice}/>
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
