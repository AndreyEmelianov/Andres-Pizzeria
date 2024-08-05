import React from 'react';
import { useSet } from 'react-use';

import { ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { getAvailablePizzaSizes } from '../lib';
import { Variant } from '../components/shared/toggle-variants';

interface ReturnProps {
  pizzaSize: PizzaSize;
  pizzaType: PizzaType;
  selectedIngredientsIds: Set<number>;
  availablePizzaSizes: Variant[];
  setPizzaSize: (pizzaSize: PizzaSize) => void;
  setPizzaType: (pizzaType: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [pizzaSize, setPizzaSize] = React.useState<PizzaSize>(20);
  const [pizzaType, setPizzaType] = React.useState<PizzaType>(1);

  const [selectedIngredientsIds, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const availablePizzaSizes = getAvailablePizzaSizes(pizzaType, items);

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (item) => Number(item.value) === pizzaSize && !item.disabled,
    );
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setPizzaSize(Number(availableSize.value) as PizzaSize);
    }
  }, [pizzaType]);

  return {
    pizzaSize,
    pizzaType,
    selectedIngredientsIds,
    availablePizzaSizes,
    setPizzaSize,
    setPizzaType,
    addIngredient,
  };
};
