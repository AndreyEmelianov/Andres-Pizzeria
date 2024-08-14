import React from 'react';
import { signIn } from 'next-auth/react';

import { Button } from '@/shared/components/ui';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface AuthModalProps {
  open: boolean;
  onModalClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onModalClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');

  const onSwitchFormType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleModalClose = () => {
    onModalClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="w-[450px] p-10 bg-white">
        {type === 'login' ? (
          <LoginForm onClose={handleModalClose} />
        ) : (
          <RegisterForm onClose={handleModalClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            className="flex-1 gap-2 p-2 h-12">
            <img src="/github.svg" alt="github icon" className="w-6 h-6" />
            GitHub
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            className="flex-1 gap-2 p-2 h-12">
            <img src="/google.svg" alt="github icon" className="w-6 h-6" />
            Google
          </Button>
        </div>
        <Button variant="outline" type="button" onClick={onSwitchFormType} className="h-12">
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
