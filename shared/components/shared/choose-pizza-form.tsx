'use client';
import React from 'react';

import { Ingredient, ProductItem } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { ToggleVariants } from './toggle-variants';
import { IngredientItem } from './ingredient-item';

interface ChoosePizzaFormProps {
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  className?: string;
  onClickAddPizzaToCart: (itemId: number, ingredientsIds: number[]) => void;
}

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
  name,
  imageUrl,
  ingredients,
  items,
  loading,
  className,
  onClickAddPizzaToCart,
}) => {
  const {
    pizzaSize,
    pizzaType,
    selectedIngredientsIds,
    availablePizzaSizes,
    currentItemId,
    setPizzaSize,
    setPizzaType,
    addIngredient,
  } = usePizzaOptions(items);

  const { totalPrice, textDescription } = getPizzaDetails(
    pizzaType,
    pizzaSize,
    items,
    ingredients,
    selectedIngredientsIds,
  );

  const handleClickAddToCart = () => {
    if (currentItemId) {
      onClickAddPizzaToCart(currentItemId, Array.from(selectedIngredientsIds));
    }
  };

  return (
    <div className={cn('flex flex-1', className)}>
      <PizzaImage imageUrl={imageUrl} size={pizzaSize} />

      <div className="w-[490px] p-7 bg-[#fcf9f5]">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDescription}</p>

        <div className="flex flex-col gap-4 mt-5">
          <ToggleVariants
            items={availablePizzaSizes}
            selectedValue={String(pizzaSize)}
            onClick={(value) => setPizzaSize(Number(value) as PizzaSize)}
          />
          <ToggleVariants
            items={pizzaTypes}
            selectedValue={String(pizzaType)}
            onClick={(value) => setPizzaType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 mt-5 rounded-md h-[420px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredientsIds.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          onClick={handleClickAddToCart}
          className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
