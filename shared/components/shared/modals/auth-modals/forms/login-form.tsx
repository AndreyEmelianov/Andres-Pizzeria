import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

import { formLoginSchema, FormLoginValues } from '@/shared/constants';
import { Title } from '../../../title';
import { FormInput } from '../../../components-form';
import { Button } from '@/shared/components/ui';

interface LoginFormProps {
  onClose: VoidFunction;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const loginForm = useForm<FormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormLoginValues) => {
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!response?.ok) {
        throw Error();
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });

      onClose();
    } catch (error) {
      console.error('[Login] error', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...loginForm}>
      <form className="flex flex-col gap-5" onSubmit={loginForm.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Введите свои данные, чтобы войти в аккаунт</p>
          </div>
        </div>

        <FormInput name="email" label="E-mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button type="submit" loading={loginForm.formState.isSubmitting} className="h-12 text-base">
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
