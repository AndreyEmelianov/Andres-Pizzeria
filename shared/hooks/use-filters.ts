import React from 'react';
import { useSet } from 'react-use';
import { useSearchParams } from 'next/navigation';

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceRangeProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  selectedSizes: Set<string>;
  selectedPizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  priceRange: PriceRangeProps;
}

interface ReturnProps extends Filters {
  setPriceRange: (name: keyof PriceRangeProps, value: number) => void;
  setSizes: (value: string) => void;
  setPizzaTypes: (value: string) => void;
  setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',')),
  );

  const [selectedSizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []),
  );

  const [selectedPizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],
    ),
  );

  const [priceRange, setPriceRange] = React.useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPriceRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return React.useMemo(
    () => ({
      priceRange,
      selectedSizes,
      selectedPizzaTypes,
      selectedIngredients,
      setPriceRange: updatePrice,
      setSizes: toggleSizes,
      setPizzaTypes: togglePizzaTypes,
      setIngredients: toggleIngredients,
    }),
    [priceRange, selectedSizes, selectedPizzaTypes, selectedIngredients],
  );
};
