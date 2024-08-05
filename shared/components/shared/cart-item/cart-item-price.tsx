import { cn } from '@/shared/lib/utils';

interface CartItemPriceProps {
  value: number;
  className?: string;
}

export const CartItemPrice: React.FC<CartItemPriceProps> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};
