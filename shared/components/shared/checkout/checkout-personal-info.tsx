import { CardBlock } from '../card-block';
import { FormInput } from '../components-form';

interface CheckoutPersonalInfoProps {
  className?: string;
}

export const CheckoutPersonalInfo: React.FC<CheckoutPersonalInfoProps> = ({ className }) => {
  return (
    <CardBlock title="2. Персональная информация" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" placeholder="Имя" className="text-base" />
        <FormInput name="lastName" placeholder="Фамилия" className="text-base" />
        <FormInput name="email" placeholder="E-mail" className="text-base" />
        <FormInput name="phone" placeholder="Телефон" className="text-base" />
      </div>
    </CardBlock>
  );
};
