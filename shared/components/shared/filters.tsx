'use client';
import React from 'react';

import { Input } from '../ui';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { RangeSlider } from './range-slider';
import { Title } from './title';
import { useIngredients, useFilters, useAddQueryParamsFilters } from '@/shared/hooks';

interface FiltersProps {
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const { ingredients, loading } = useIngredients();

  const filters = useFilters();

  useAddQueryParamsFilters(filters);

  const defaultIngredients = ingredients.map((ingredients) => ({
    value: String(ingredients.id),
    text: ingredients.name,
  }));

  const setPriceRangeSlider = (priceRange: number[]) => {
    filters.setPriceRange('priceFrom', priceRange[0]);
    filters.setPriceRange('priceTo', priceRange[1]);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        name="pizzaTypes"
        title="Тип теста"
        items={[
          {
            text: 'Тонкое',
            value: '1',
          },
          {
            text: 'Традиционное',
            value: '2',
          },
        ]}
        selectedValues={filters.selectedPizzaTypes}
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
      />

      <CheckboxFiltersGroup
        name="sizes"
        title="Размеры"
        items={[
          {
            text: '20см',
            value: '20',
          },
          {
            text: '30см',
            value: '30',
          },
          {
            text: '40см',
            value: '40',
          },
        ]}
        selectedValues={filters.selectedSizes}
        className="mb-5"
        onClickCheckbox={filters.setSizes}
      />

      <div className="mt-5 border-y border-y-neutral-200 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={3000}
            value={String(filters.priceRange.priceFrom)}
            onChange={(event) => filters.setPriceRange('priceFrom', Number(event.target.value))}
          />
          <Input
            type="number"
            placeholder="3000"
            min={100}
            max={3000}
            value={String(filters.priceRange.priceTo)}
            onChange={(event) => filters.setPriceRange('priceTo', Number(event.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={3000}
          step={10}
          value={[filters.priceRange.priceFrom || 0, filters.priceRange.priceTo || 3000]}
          onValueChange={setPriceRangeSlider}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="Ingredients"
        limit={6}
        defaultItems={defaultIngredients.slice(0, 6)}
        items={defaultIngredients}
        loading={loading}
        selectedValues={filters.selectedIngredients}
        className="mt-5"
        onClickCheckbox={filters.setIngredients}
      />
    </div>
  );
};
