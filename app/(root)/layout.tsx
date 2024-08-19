import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Header } from '@/shared/components/shared';

export const metadata: Metadata = {
  title: 'Andres Pizzeria | Главная',
  description:
    'We use the best Italian practices to create our pizza. We use only fresh ingredients',
};

export default function MainLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
