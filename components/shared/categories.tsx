import { cn } from '@/lib/utils';

interface CategoriesProps {
  className?: string;
}

const categories = [
  'Пиццы',
  'Комбо',
  'Закуски',
  'Коктейли',
  'Кофе',
  'Напитки',
  'Десерты',
  'Новинки',
];
const activeIndex = 0;

export const Categories: React.FC<CategoriesProps> = ({ className }) => {
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {categories.map((category, index) => (
        <a
          key={index}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeIndex === index && 'bg-white shadow-md shadow-gray-300 text-primary',
          )}>
          <button>{category}</button>
        </a>
      ))}
    </div>
  );
};