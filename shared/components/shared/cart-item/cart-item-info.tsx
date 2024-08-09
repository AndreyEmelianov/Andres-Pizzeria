import { cn } from '@/shared/lib/utils';

interface CartItemInfoProps {
  name: string;
  details: string;
  className?: string;
  detailsClassName?: string;
}

export const CartItemInfo: React.FC<CartItemInfoProps> = ({
  name,
  details,
  className,
  detailsClassName,
}) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="flex-1 text-lg font-bold leading-6">{name}</h2>
      </div>
      {details && <p className={cn('text-xs text-gray-400', detailsClassName)}>{details}</p>}
    </div>
  );
};
