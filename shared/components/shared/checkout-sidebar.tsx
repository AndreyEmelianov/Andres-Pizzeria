'use client';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

import { CardBlock } from './card-block';
import { CheckoutInformationItem } from './checkout-information-item';
import { Button, Skeleton } from '../ui';
import { calcTotalOrderPrice } from '@/shared/lib';
import { useCart } from '@/shared/hooks';

interface CheckoutSidebarProps {
  setTotalPrice: (totalPrice: number) => void;
  submitting?: boolean;
}

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({ submitting, setTotalPrice }) => {
  const { totalAmount, loading } = useCart();

  const { vatPrice, deliveryPrice, totalPrice } = calcTotalOrderPrice(totalAmount);

  return (
    <CardBlock className="sticky top-4 p-6">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="w-[110px] h-12" />
        ) : (
          <span className="h-12 text-[32px] font-extrabold">{totalPrice} ₽</span>
        )}
      </div>

      <CheckoutInformationItem
        title={
          <div className="flex items-center">
            <Package size={20} className="mr-2 text-[#f1a146]" />
            Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className="h-7 w-16" /> : `${totalAmount} ₽`}
      />
      <CheckoutInformationItem
        title={
          <div className="flex items-center">
            <Percent size={20} className="mr-2 text-[#f1a146]" />
            Сервисный сбор:
          </div>
        }
        value={loading ? <Skeleton className="h-7 w-16" /> : `${vatPrice} ₽`}
      />
      <CheckoutInformationItem
        title={
          <div className="flex items-center">
            <Truck size={20} className="mr-2 text-[#f1a146]" />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className="h-7 w-16" /> : `${deliveryPrice} ₽`}
      />

      <Button
        loading={submitting}
        type="submit"
        onClick={() => setTotalPrice(totalPrice)}
        className="w-full mt-6 h-14 text-lg font-bold rounded-2xl">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </CardBlock>
  );
};
