import Image from 'next/image';
import { User } from 'lucide-react';
import Link from 'next/link';

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
