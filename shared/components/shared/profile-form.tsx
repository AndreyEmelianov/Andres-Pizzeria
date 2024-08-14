'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

import { formRegisterSchema, FormRegisterValues } from '@/shared/constants';
import { User } from '@prisma/client';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from './components-form';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';

interface ProfileFormProps {
  data: User;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ data }) => {
  const profileForm = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (error) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className="my-10 flex items-center justify-between">
      <div>
        <Title text="Личные данные" size="md" className="font-bold" />

        <FormProvider {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-96 mt-10">
            <FormInput name="email" label="E-mail" required />
            <FormInput name="fullName" label="Имя и фамилия" required />
            <FormInput name="password" label="Новый пароль" type="password" required />
            <FormInput name="confirmPassword" label="Повторите пароль" type="password" required />

            <Button
              type="submit"
              disabled={profileForm.formState.isSubmitting}
              className="text-base mt-10">
              Сохранить
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={profileForm.formState.isSubmitting}
              onClick={onClickSignOut}
              className="text-base">
              Выйти
            </Button>
          </form>
        </FormProvider>
      </div>
      <Image src="/images/pizza.png" alt="pizza" width={500} height={500} />
    </Container>
  );
};
