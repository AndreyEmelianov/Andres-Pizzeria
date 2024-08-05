'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import {
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';

interface CartDrawerProps {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<CartDrawerProps>> = ({
  children,
  className,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#fcf9f5]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">2 товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 -mx-6 mt-5 overflow-auto">
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="/images/pizzas/cheesePizza233x233.webp"
              name="Сырная"
              price={500}
              quantity={1}
              details={getCartItemDetails(1, 30, [{ name: 'Сыр чеддер' }, { name: 'Томат' }])}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="/images/pizzas/cheesePizza233x233.webp"
              name="Сырная"
              price={500}
              quantity={1}
              details={getCartItemDetails(1, 30, [{ name: 'Сыр чеддер' }, { name: 'Томат' }])}
            />
          </div>
        </div>

        <SheetFooter className="-mx-6 p-8 bg-white">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 relative -top-1 mx-2 border-b border-dashed border-b-neutral-200" />
              </span>
              <span className="font-bold text-lg">570 ₽</span>
            </div>
            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
