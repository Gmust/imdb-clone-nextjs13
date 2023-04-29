'use client';

import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImUser } from 'react-icons/im';
import { AuthContext, useSnackbar } from '@/context';
import { CONSTANTS, ROUTES } from '@utils/constants';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useUserLogin } from '@/hooks/react';

export const Account = () => {

  const { isAuth, isGuest, token } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const callSnackbar = useSnackbar();
  const router = useRouter();
  const login = useUserLogin();


  useEffect(() => {
    if (isAuth && token) {
      (async () => {
        await login;
      })();
    }
  }, []);

  return (
    <div className='text-2xl cursor-pointer'>
      {!isAuth && !isGuest ?
        <Link href={ROUTES.LOGIN}>
          Login
        </Link>
        :
        <div>
          {isAuth &&
            <Image onClick={() => router.push(ROUTES.PERSONAL_AREA)}
                   className='rounded-lg shadow-2xl hover:scale-110 transition duration-200'
                   src={user.avatar?.tmdb?.avatar_path ? CONSTANTS.IMAGE_URL + '/' + user.avatar?.tmdb?.avatar_path : '/defaultAvatar.webp'}
                   alt={''} width={50} height={50} />
          }
          {isGuest && <ImUser onClick={() => callSnackbar({
            text: 'To access personal area you need to be logged in like user',
            variant: 'info',
            key: 'info'
          })} />}
        </div>
      }
    </div>
  );
};

