'use client';

import { cn } from '@/shared/lib/utils';

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface ToggleVariantsProps {
  items: readonly Variant[];
  selectedValue?: Variant['value'];
  className?: string;
  onClick?: (value: Variant['value']) => void;
}

export const ToggleVariants: React.FC<ToggleVariantsProps> = ({
  items,
  selectedValue,
  className,
  onClick,
}) => {
  return (
    <div className={cn('flex justify-between bg-[#f3f3f7] rounded-3xl p-1 select-none', className)}>
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            'flex items-center justify-center flex-1 cursor-pointer h-[30px] px-5 rounded-3xl transition-all duration-400 text-sm',
            {
              'bg-white shadow': item.value === selectedValue,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            },
          )}>
          {item.name}
        </button>
      ))}
    </div>
  );
};
