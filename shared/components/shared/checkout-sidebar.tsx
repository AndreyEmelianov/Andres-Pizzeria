import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

import { CardBlock } from './card-block';
import { CheckoutInformationItem } from './checkout-information-item';
import { Button } from '../ui';
import { calcTotalOrderPrice } from '@/shared/lib';

interface CheckoutSidebarProps {
  totalAmount: number;
}

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({ totalAmount }) => {
  const { vatPrice, deliveryPrice, totalPrice } = calcTotalOrderPrice(totalAmount);

  return (
    <CardBlock className="sticky top-4 p-6">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="text-[32px] font-extrabold">{totalPrice} ₽</span>
      </div>

      <CheckoutInformationItem
        title={
          <div className="flex items-center">
            <Package size={20} className="mr-2 text-[#f1a146]" />
            Стоимость корзины:
          </div>
        }
        value={totalAmount}
      />
      <CheckoutInformationItem
        title={
          <div className="flex items-center">
            <Percent size={20} className="mr-2 text-[#f1a146]" />
            Сервисный сбор:
          </div>
        }
        value={vatPrice}
      />
      <CheckoutInformationItem
        title={
          <div className="flex items-center">
            <Truck size={20} className="mr-2 text-[#f1a146]" />
            Доставка:
          </div>
        }
        value={deliveryPrice}
      />

      <Button type="submit" className="w-full mt-6 h-14 text-lg font-bold rounded-2xl">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </CardBlock>
  );
};
