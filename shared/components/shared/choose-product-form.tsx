import { Title } from './title';
import { Button } from '../ui';
import { cn } from '@/shared/lib/utils';

interface ChooseProductFormProps {
  name: string;
  imageUrl: string;
  price: number;
  loading?: boolean;
  className?: string;
  onClickAddProductToCart: VoidFunction;
}

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
  name,
  imageUrl,
  price,
  loading,
  className,
  onClickAddProductToCart,
}) => {
  return (
    <div className={cn('flex flex-1', className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 z-10 transition-all duration-300 w-[370px] h-[370px]"
        />
      </div>
      <div className="w-[490px] p-7 bg-[#fcf9f5]">
        <Title text={name} size="md" className="font-extrabold mb-7" />
        <Button
          loading={loading}
          onClick={() => onClickAddProductToCart()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
