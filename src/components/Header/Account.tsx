'use client';

import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImUser } from 'react-icons/im';
import { AuthContext, useSnackbar } from '@/context';
import { ROUTES } from '@utils/constants';

export const Account = () => {

  const { isAuth, isGuest } = useContext(AuthContext);
  const callSnackbar = useSnackbar();

  return (
    <div className='text-2xl cursor-pointer'>
      {!isAuth && !isGuest ?
        <Link href={ROUTES.LOGIN}>
          Login
        </Link>
        :
        <div>
          {isAuth &&
            <Link href={ROUTES.PERSONAL_AREA}>
              <Image src={''} alt={''} width={20} height={20} />
            </Link>
          }
          {isGuest && <ImUser onClick={()=> callSnackbar({
            text: 'To access personal area you need to be logged in like user',
            variant: 'info',
            key: 'info'
          })} />}
        </div>
      }
    </div>
  );
};

