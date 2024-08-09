import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

import {
  CardBlock,
  CheckoutCartItem,
  CheckoutInformationItem,
  Container,
  Title,
} from '@/shared/components/shared';
import { Button, Input, Textarea } from '@/shared/components/ui';

export default function CheckoutPage() {
  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="text-[36px] font-extrabold mb-8" />

      <div className="flex gap-10">
        <div className="flex flex-col flex-1 gap-10 mb-20">
          <CardBlock title="1. Корзина">
            <div className="flex flex-col gap-5">
              <CheckoutCartItem
                id={1}
                imageUrl="/images/pizzas/cheesePizza233x233.webp"
                name="Сырная"
                details="Сырная пицца, много сыра, и ещё больше сырного сыра"
                price={300}
                quantity={2}
              />
            </div>
          </CardBlock>
          <CardBlock title="2. Персональная информация">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" placeholder="Имя" className="text-base" />
              <Input name="lastName" placeholder="Фамилия" className="text-base" />
              <Input name="email" placeholder="E-mail" className="text-base" />
              <Input name="phone" placeholder="Телефон" className="text-base" />
            </div>
          </CardBlock>
          <CardBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input name="address" placeholder="Адрес" className="text-base" />
              <Textarea rows={5} placeholder="Комментарий к заказу" className="text-base" />
            </div>
          </CardBlock>
        </div>

        <div className="w-[450px]">
          <CardBlock className="sticky top-4 p-6">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              <span className="text-[32px] font-extrabold">500 ₽</span>
            </div>

            <CheckoutInformationItem
              title={
                <div className="flex items-center">
                  <Package size={20} className="mr-2 text-[#f1a146]" />
                  Стоимость товаров:
                </div>
              }
              value="500"
            />
            <CheckoutInformationItem
              title={
                <div className="flex items-center">
                  <Percent size={20} className="mr-2 text-[#f1a146]" />
                  Сервисный сбор:
                </div>
              }
              value="500"
            />
            <CheckoutInformationItem
              title={
                <div className="flex items-center">
                  <Truck size={20} className="mr-2 text-[#f1a146]" />
                  Доставка:
                </div>
              }
              value="300"
            />

            <Button type="submit" className="w-full mt-6 h-14 text-lg font-bold rounded-2xl">
              Перейти к оплате
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </CardBlock>
        </div>
      </div>
    </Container>
  );
}
