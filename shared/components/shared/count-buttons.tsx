import { cn } from '@/shared/lib/utils';
import { CountIconButton } from './count-icon-button';

export interface CountButtonsProps {
  value?: number;
  size?: 'sm' | 'lg';
  className?: string;
  onClick: (type: 'plus' | 'minus') => void;
}

export const CountButtons: React.FC<CountButtonsProps> = ({
  value = 1,
  size = 'sm',
  className,
  onClick,
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        size={size}
        type="minus"
        disabled={value === 1}
        onClick={() => onClick?.('minus')}
      />
      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>
      <CountIconButton size={size} type="plus" onClick={() => onClick?.('plus')} />
    </div>
  );
};
