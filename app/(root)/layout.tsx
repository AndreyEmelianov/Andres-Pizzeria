import type { Metadata } from 'next';

import { Header } from '@/components/shared';

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
      <Header />
      {children}
      {modal}
    </main>
  );
}
