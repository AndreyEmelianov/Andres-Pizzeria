import { Checkbox } from '../ui';

export interface FilterCheckboxProps {
  text: string;
  name?: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  text,
  name,
  value,
  checked,
  endAdornment,
  onCheckedChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`checkbox-${String(name)}-${String(value)}`}
        value={value}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="rounded-[8px] w-6 h-6"
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(value)}`}
        className="leading-none cursor-pointer flex-1  ">
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
