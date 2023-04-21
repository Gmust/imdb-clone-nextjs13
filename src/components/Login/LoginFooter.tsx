'use client';

import { useGuestLogin } from '@/hooks/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const LoginFooter = () => {

  const loginLikeGuest = useGuestLogin();
  const router = useRouter();

  return (
    <div className='flex items-center justify-between'>
      <div onClick={() => {
        loginLikeGuest();
        router.push('/');
        router.refresh();
      }} className='cursor-pointer hover:underline text-blue-400 p-2 text-base'>
        Login like guest
      </div>

      <div>
        <Link href='https://www.themoviedb.org/signup' className='cursor-pointer hover:underline text-blue-400 p-2 text-base'>
          Create account at TMDb
        </Link>
      </div>
    </div>
  );
};

