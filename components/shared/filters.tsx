'use client';

import { useIngredientsFilter } from '@/hooks/useIngredientsFilter';
import { Input } from '../ui';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { FilterCheckbox } from './filter-checkbox';
import { RangeSlider } from './range-slider';
import { Title } from './title';

interface FiltersProps {
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const { ingredients, loading, selectedIds, onAddId } = useIngredientsFilter();

  const defaultIngredients = ingredients.map((ingredients) => ({
    value: String(ingredients.id),
    text: ingredients.name,
  }));

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
          <Input type="number" placeholder="0" min={0} max={3000} defaultValue={0} />
          <Input type="number" placeholder="3000" min={100} max={3000} />
        </div>
        <RangeSlider min={0} max={3000} step={10} value={[0, 3000]} />
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
