import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CircleUser, User } from 'lucide-react';

import { Button } from '../ui';

interface ProfileButtonProps {
  onClickSignIn: () => void;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ onClickSignIn }) => {
  const { data: session, status } = useSession();

  return (
    <div>
      {!session && (
        <Button
          loading={status === 'loading'}
          variant="outline"
          onClick={onClickSignIn}
          className="flex items-center gap-1">
          <User size={16} />
          Войти
        </Button>
      )}
      {session && (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
