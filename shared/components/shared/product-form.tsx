'use client';
import toast from 'react-hot-toast';

import { useCartStore } from '@/shared/store';
import { ProductWithRelations } from '@/types/product';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface ProductFormProps {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
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
      onSubmit?.();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        loading={loading}
        onClickAddPizzaToCart={onAddToCart}
      />
    );
  } else {
    return (
      <ChooseProductForm
        imageUrl={product.imageUrl}
        name={product.name}
        price={firstItem.price}
        loading={loading}
        onClickAddProductToCart={onAddToCart}
      />
    );
  }
};
