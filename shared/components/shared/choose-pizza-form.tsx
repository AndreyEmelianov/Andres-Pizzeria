import React from 'react';
import { useSet } from 'react-use';

import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { cn } from '@/shared/lib/utils';
import { ToggleVariants } from './toggle-variants';
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';

interface ChoosePizzaFormProps {
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  className?: string;
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
  name,
  imageUrl,
  ingredients,
  items,
  className,
  onClickAddCart,
}) => {
  const [pizzaSize, setPizzaSize] = React.useState<PizzaSize>(20);
  const [pizzaType, setPizzaType] = React.useState<PizzaType>(1);

  const [selectedIngredientsIds, { toggle: addIngredient }] = useSet(new Set<number>([]));

  return (
    <div className={cn('flex flex-1', className)}>
      <PizzaImage imageUrl={imageUrl} size={pizzaSize} />

      <div className="w-[490px] p-7 bg-[#fcf9f5]">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">30см, традиционное тесто 30</p>

        <div className="flex flex-col gap-4 mt-5">
          <ToggleVariants
            items={pizzaSizes}
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
        <Button onClick={() => {}} className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Добавить в корзину за 450 ₽
        </Button>
      </div>
    </div>
  );
};
