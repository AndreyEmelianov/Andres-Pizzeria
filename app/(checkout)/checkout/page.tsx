'use client';
import {
  CardBlock,
  CheckoutCartItem,
  CheckoutSidebar,
  Container,
  Title,
} from '@/shared/components/shared';
import { Input, Textarea } from '@/shared/components/ui';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

export default function CheckoutPage() {
  const { items, totalAmount, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="text-[36px] font-extrabold mb-8" />

      <div className="flex gap-10">
        <div className="flex flex-col flex-1 gap-10 mb-20">
          <CardBlock title="1. Корзина">
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <CheckoutCartItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  disabled={item.disabled}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize,
                  )}
                  onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                  onClickRemoveCartItem={() => removeCartItem(item.id)}
                />
              ))}
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
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
