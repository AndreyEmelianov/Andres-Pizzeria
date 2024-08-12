'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  CheckoutAddressInfo,
  CheckoutCart,
  CheckoutPersonalInfo,
  CheckoutSidebar,
  Container,
  Title,
} from '@/shared/components';
import { CheckoutFormValues, checkoutFormSchema } from '@/shared/constants';

export default function CheckoutPage() {
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

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {};

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="text-[36px] font-extrabold mb-8" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col flex-1 gap-10 mb-20">
              <CheckoutCart />
              <CheckoutPersonalInfo />
              <CheckoutAddressInfo />
            </div>

            <div className="w-[450px]">
              <CheckoutSidebar />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
