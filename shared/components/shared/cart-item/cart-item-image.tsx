import { cn } from '@/shared/lib/utils';

interface CartItemImageProps {
  src: string;
  className?: string;
}

export const CartItemImage: React.FC<CartItemImageProps> = ({ src, className }) => {
  return <img src={src} className={cn('w-[60px] h-[60px]', className)} />;
};
