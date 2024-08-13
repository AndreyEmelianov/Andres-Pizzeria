'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User } from 'lucide-react';
import toast from 'react-hot-toast';

import { Container } from './container';
import { Button } from '../ui';
import { SearchInput } from './search-input';
import { cn } from '@/shared/lib/utils';
import { CartButton } from './cart-button';

interface HeaderProps {
  hasSearchInput?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  hasSearchInput = true,
  hasCart = true,
  className,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    if (searchParams.has('paid')) {
      setTimeout(() => {
        toast.success('Заказ успешно оплачен! Детальная информация отправлена на почту.');
      }, 500);

      router.push('/');
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            <div>
              <h1 className="text-2xl uppercase font-black">Andres Pizzeria</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней просто быть не может</p>
            </div>
          </div>
        </Link>

        {hasSearchInput && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
