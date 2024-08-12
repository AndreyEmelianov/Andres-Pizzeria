import { X } from 'lucide-react';

interface ClearButtonProps {
  onClick: VoidFunction;
}

export const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-4 -translate-y-1/2 opacity-40 hover:opacity-100 hover:text-red-600 cursor-pointer">
      <X className="h-5 w-5" />
    </button>
  );
};
