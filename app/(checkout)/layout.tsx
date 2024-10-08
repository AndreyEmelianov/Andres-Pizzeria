import { Metadata } from 'next';
import { Suspense } from 'react';

import { Container, Header } from '@/shared/components/shared';

export const metadata: Metadata = {
  title: 'Andres Pizzeria | Оформление заказа',
  description: 'Оформление заказа',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#fcf9f5]">
      <Container>
        <Suspense>
          <Header hasSearchInput={false} hasCart={false} className="border-b-gray-200" />
        </Suspense>
        {children}
      </Container>
    </main>
  );
}
