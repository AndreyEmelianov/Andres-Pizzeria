import { Controller, useFormContext } from 'react-hook-form';

import { AddressInput } from '../address-input';
import { CardBlock } from '../card-block';
import { FormTextarea } from '../components-form';
import { ErrorText } from '../error-text';

interface CheckoutAddressInfoProps {
  className?: string;
}

export const CheckoutAddressInfo: React.FC<CheckoutAddressInfoProps> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <CardBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />
        <FormTextarea
          name="comment"
          rows={5}
          placeholder="Комментарий к заказу"
          className="text-base"
        />
      </div>
    </CardBlock>
  );
};
