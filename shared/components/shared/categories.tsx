'use client';

import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { Category } from '@prisma/client';

interface CategoriesProps {
  categories: Category[];
  className?: string;
}

export const Categories: React.FC<CategoriesProps> = ({ categories, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeCategoryId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {categories.map(({ id, name }) => (
        <a
          key={id}
          href={`/#${name}`}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id && 'bg-white shadow-md shadow-gray-300 text-primary',
          )}>
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
