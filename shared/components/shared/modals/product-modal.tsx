'use client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { ChooseProductForm } from '../choose-product-form';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { ProductWithRelations } from '@/types/product';
import { Dialog } from '../../ui';
import { DialogContent } from '../../ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store';

interface ProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, className }) => {
  const router = useRouter();
  const [loading, addCartItem] = useCartStore((state) => [state.loading, state.addCartItem]);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onAddToCart = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success('Товар успешно добавлен в корзину');
      router.back();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            loading={loading}
            onClickAddPizzaToCart={onAddToCart}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            loading={loading}
            onClickAddProductToCart={onAddToCart}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
