'use client';
import React from 'react';

import { getCartItemDetails } from '@/shared/lib';
import { CardBlock } from '../card-block';
import { CheckoutCartItem } from '../checkout-cart-item';
import { PizzaType, PizzaSize } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';
import { CheckoutCartItemSkeleton } from '../checkout-cart-item-skeleton';

interface CheckoutCartProps {
  className?: string;
}

export const CheckoutCart: React.FC<CheckoutCartProps> = ({ className }) => {
  const [loading, setLoading] = React.useState(true);
  const { items, loading: cartLoading, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  React.useEffect(() => {
    if (!cartLoading) {
      setLoading(false);
    }
  }, [cartLoading]);

  if (loading) {
    return (
      <CardBlock title="1. Корзина" className={className}>
        <div className="flex flex-col gap-5">
          {[...Array(4)].map((_, index) => (
            <CheckoutCartItemSkeleton key={index} />
          ))}
        </div>
      </CardBlock>
    );
  }

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
