'use client';
import React from 'react';

import { Input, Skeleton } from '../ui';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';

type Item = FilterCheckboxProps;

interface CheckboxFiltersGroupProps {
  title: string;
  items: Item[];
  defaultItems: Item[];
  name?: string;
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  defaultValue?: string[];
  loading?: boolean;
  selectedIds?: Set<string>;
  onClickCheckbox?: (id: string) => void;
}

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
  title,
  items,
  defaultItems,
  name,
  limit = 6,
  loading,
  className,
  selectedIds,
  defaultValue,
  searchInputPlaceholder = 'Поиск...',
  onClickCheckbox,
}) => {
  const [showAllCheckboxes, setShowAllCheckboxes] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const checkboxesList = showAllCheckboxes
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    : defaultItems.slice(0, limit);

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="mb-4 h-6 rounded-[8px]" />)}
        <Skeleton className="h-6 rounded-[8px] w-28" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {showAllCheckboxes && (
        <div className="mb-5">
          <Input
            value={searchValue}
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="border-none bg-gray-50"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 scrollbar overflow-auto">
        {checkboxesList.map((checkbox, index) => (
          <FilterCheckbox
            key={index}
            name={name}
            text={checkbox.text}
            value={checkbox.value}
            checked={selectedIds?.has(checkbox.value)}
            endAdornment={checkbox.endAdornment}
            onCheckedChange={() => onClickCheckbox?.(checkbox.value)}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAllCheckboxes ? 'border-t border-t-neutral-200 mt-4' : ''}>
          <button
            onClick={() => setShowAllCheckboxes(!showAllCheckboxes)}
            className="text-primary mt-3">
            {showAllCheckboxes ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
