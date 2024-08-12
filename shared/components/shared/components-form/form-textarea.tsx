import { useFormContext } from 'react-hook-form';

import { ClearButton } from '../clear-button';
import { ErrorText } from '../error-text';
import { RequiredSymbol } from '../required-symbol';
import { Textarea } from '../../ui';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    formState: { errors },
    register,
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClearField = () => {
    setValue(name, '');
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...props} />
        {value && <ClearButton onClick={onClickClearField} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
