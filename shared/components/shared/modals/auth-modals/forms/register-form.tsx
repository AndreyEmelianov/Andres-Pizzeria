import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

import { formRegisterSchema, FormRegisterValues } from '@/shared/constants';
import { Title } from '../../../title';
import { FormInput } from '../../../components-form';
import { Button } from '@/shared/components/ui';
import { registerUser } from '@/app/actions';

interface RegisterFormProps {
  onClose: VoidFunction;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onClose }) => {
  const registerForm = useForm<FormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Регистрация прошла успешно! Подтвердите свою почту', {
        icon: '✅',
      });

      onClose();
    } catch (error) {
      console.error('[Register] error', error);
      toast.error('Не удалось зарегистрировать аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...registerForm}>
      <form className="flex flex-col gap-5" onSubmit={registerForm.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="mr-2">
            <Title text="Регистрация" size="md" className="font-bold" />
            <div className="flex gap-2 items-center justify-between">
              <p className="text-gray-400">Введите свои данные, чтобы зарегистрироваться</p>
              <img src="/logo.png" alt="logo" width={40} height={40} />
            </div>
          </div>
        </div>

        <FormInput name="fullName" label="Имя и фамилия" required />
        <FormInput name="email" label="E-mail" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

        <Button
          type="submit"
          loading={registerForm.formState.isSubmitting}
          className="h-12 text-base">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
