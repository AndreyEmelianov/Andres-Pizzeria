'use client';
import React from 'react';

import { useIngredientsFilter } from '@/hooks/useIngredientsFilter';
import { Input } from '../ui';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { FilterCheckbox } from './filter-checkbox';
import { RangeSlider } from './range-slider';
import { Title } from './title';

interface FiltersProps {
  className?: string;
}

interface PriceRangeProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const [priceRange, setPriceRange] = React.useState<PriceRangeProps>({
    priceFrom: 0,
    priceTo: 3000,
  });

  const { ingredients, loading, selectedIds, onAddId } = useIngredientsFilter();

  const defaultIngredients = ingredients.map((ingredients) => ({
    value: String(ingredients.id),
    text: ingredients.name,
  }));

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPriceRange({
      ...priceRange,
      [name]: value,
    });
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox name="can" text="Можно собирать" value="1" />
        <FilterCheckbox name="new" text="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-200 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={3000}
            value={String(priceRange.priceFrom)}
            onChange={(event) => updatePrice('priceFrom', Number(event.target.value))}
          />
          <Input
            type="number"
            placeholder="3000"
            min={100}
            max={3000}
            value={String(priceRange.priceTo)}
            onChange={(event) => updatePrice('priceTo', Number(event.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={3000}
          step={10}
          value={[priceRange.priceFrom, priceRange.priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPriceRange({ priceFrom, priceTo })}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="Ingredients"
        limit={6}
        defaultItems={defaultIngredients.slice(0, 6)}
        items={defaultIngredients}
        loading={loading}
        selectedIds={selectedIds}
        className="mt-5"
        onClickCheckbox={onAddId}
      />
    </div>
  );
};
