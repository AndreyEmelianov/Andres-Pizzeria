import { cn } from '@/shared/lib/utils';

interface ErrorTextProps {
  text: string;
  className?: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ text, className }) => {
  return <p className={cn('text-sm text-red-500', className)}>{text}</p>;
};
