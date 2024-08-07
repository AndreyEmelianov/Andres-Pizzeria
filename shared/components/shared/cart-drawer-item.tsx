import { Trash2Icon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import * as CartItem from './cart-item';
import { CartItemProps } from './cart-item/cart-item.types';

interface CartDrawerItemProps extends CartItemProps {
  className?: string;
  onClickCountButton: (type: 'plus' | 'minus') => void;
  onClickRemoveCartItem?: () => void;
}

export const CartDrawerItem: React.FC<CartDrawerItemProps> = ({
  imageUrl,
  name,
  price,
  details,
  quantity,
  className,
  disabled,
  onClickCountButton,
  onClickRemoveCartItem,
}) => {
  return (
    <div
      className={cn(
        'flex gap-6 p-5 bg-white',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <CartItem.CartItemImage src={imageUrl} />

      <div className="flex-1">
        <CartItem.CartItemInfo name={name} details={details} />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CartItem.CartItemCountButtons value={quantity} onClick={onClickCountButton} />
          <div className="flex items-center gap-3">
            <CartItem.CartItemPrice value={price} />
            <Trash2Icon
              onClick={onClickRemoveCartItem}
              size={16}
              className="text-gray-400 cursor-pointer hover:text-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
