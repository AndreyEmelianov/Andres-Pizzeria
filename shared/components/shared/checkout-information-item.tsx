import { cn } from '@/shared/lib/utils';

interface CheckoutInformationItemProps {
  title?: React.ReactNode;
  value?: string;
  className?: string;
}

export const CheckoutInformationItem: React.FC<CheckoutInformationItemProps> = ({
  title,
  value,
  className,
}) => {
  return (
    <div className={cn('flex my-4', className)}>
      <span className="flex flex-1 text-lg text-neutral-500">
        {title}
        <div className="flex-1 relative -top-1 mx-2 border-b border-dashed border-b-neutral-200" />
      </span>
      <span className="text-lg font-bold">{value} ₽</span>
    </div>
  );
};
