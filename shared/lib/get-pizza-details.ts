import { Ingredient, ProductItem } from '@prisma/client';
import { calcPizzaTotalPrice } from './calc-pizza-total-price';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';

export const getPizzaDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredientsIds: Set<number>,
) => {
  const totalPrice = calcPizzaTotalPrice(
    pizzaType,
    pizzaSize,
    items,
    ingredients,
    selectedIngredientsIds,
  );

  const textDescription = `${pizzaSize} см, ${mapPizzaType[
    pizzaType
  ].toLowerCase()} тесто, кол-во дополнительных ингредиентов ${selectedIngredientsIds.size}`;

  return {
    totalPrice,
    textDescription,
  };
};
