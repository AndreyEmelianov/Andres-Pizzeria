'use client';
import { X } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { CartItemProps } from './cart-item/cart-item.types';
import * as CartItem from './cart-item';

interface CheckoutCartItemProps extends CartItemProps {
  className?: string;
  onClickCountButton: (type: 'plus' | 'minus') => void;
  onClickRemoveCartItem: () => void;
}

export const CheckoutCartItem: React.FC<CheckoutCartItemProps> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  disabled,
  className,
  onClickCountButton,
  onClickRemoveCartItem,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <div className="flex items-center flex-1 gap-5">
        <CartItem.CartItemImage src={imageUrl} />
        <CartItem.CartItemInfo name={name} details={details} detailsClassName="w-[90%]" />
      </div>

      <CartItem.CartItemPrice value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItem.CartItemCountButtons value={quantity} onClick={onClickCountButton} />
        <button onClick={onClickRemoveCartItem}>
          <X size={20} className="cursor-pointer text-gray-400 hover:text-red-600" />
        </button>
      </div>
    </div>
  );
};
