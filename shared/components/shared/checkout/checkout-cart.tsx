'use client';
import { getCartItemDetails } from '@/shared/lib';
import { CardBlock } from '../card-block';
import { CheckoutCartItem } from '../checkout-cart-item';
import { PizzaType, PizzaSize } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';

interface CheckoutCartProps {
  className?: string;
}

export const CheckoutCart: React.FC<CheckoutCartProps> = ({ className }) => {
  const { items, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <CardBlock title="1. Корзина" className={className}>
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
  );
};
