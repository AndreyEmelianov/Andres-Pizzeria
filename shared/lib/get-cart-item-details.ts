import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { StateCartItem } from './get-cart-details';

export const getCartItemDetails = (
  ingredients: StateCartItem['ingredients'],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize,
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} тесто, размер: ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
};
