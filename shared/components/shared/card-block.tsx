import { cn } from '@/shared/lib/utils';
import { Title } from './title';

interface CardBlockProps {
  title?: string;
  className?: string;
  contentClassName?: string;
  endAdornment?: React.ReactNode;
}

export const CardBlock: React.FC<React.PropsWithChildren<CardBlockProps>> = ({
  title,
  children,
  className,
  contentClassName,
  endAdornment,
}) => {
  return (
    <div className={cn('bg-white rounded-3xl', className)}>
      {title && (
        <div className="flex items-center justify-between px-7 p-5 border-b border-gray-100">
          <Title size="sm" text={title} className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn('px-5 py-4', contentClassName)}>{children}</div>
    </div>
  );
};
