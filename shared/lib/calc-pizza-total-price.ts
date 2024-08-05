import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';

export const calcPizzaTotalPrice = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredientsIds: Set<number>,
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === pizzaType && item.size === pizzaSize)?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  return totalPrice;
};
