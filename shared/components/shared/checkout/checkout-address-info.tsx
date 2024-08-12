import { Input } from '../../ui';
import { CardBlock } from '../card-block';
import { FormTextarea } from '../components-form';

interface CheckoutAddressInfoProps {
  className?: string;
}

export const CheckoutAddressInfo: React.FC<CheckoutAddressInfoProps> = ({ className }) => {
  return (
    <CardBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Input name="address" placeholder="Адрес" className="text-base" />
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
