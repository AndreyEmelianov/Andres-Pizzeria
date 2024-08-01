import { cn } from '@/shared/lib/utils';
import { CircleCheck } from 'lucide-react';

interface IngredientItemProps {
  name: string;
  imageUrl: string;
  price: number;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export const IngredientItem: React.FC<IngredientItemProps> = ({
  name,
  imageUrl,
  price,
  active,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-md p-1 w-32 text-center relative cursor-pointer shadow-md bg-white',
        { 'border border-primary': active },
        className,
      )}
      onClick={onClick}>
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <img src={imageUrl} width={110} height={110} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
};
