'use client';

import { FormEvent } from 'react';
import { AuthAPI } from '@/src/service/auth';
import { useSnackbar } from '@/context';
import { useRouter } from 'next/navigation';


export const LoginForm = () => {

  const callSnackbar = useSnackbar();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await AuthAPI.getTemporaryToken();
      const res = await AuthAPI.loginUser({
        username: (e.target as HTMLFormElement).username.value,
        password: (e.target as HTMLFormElement).password.value,
        temporaryToken: token!
      });
      callSnackbar({
        text: 'Successfully logged in!',
        variant: 'success',
        key: res?.status
      });
      router.push('/personal-area');
      router.refresh();
    } catch (e: any) {
      callSnackbar({
        text: e.response.data.status_message,
        variant: 'error',
        key: 'error'
      });
    }
  };

  return (
    <form className='flex flex-col space-y-4 items-center text-xl' onSubmit={handleSubmit}>

      <div className='flex'>
        <label htmlFor='username'
               className='inline-flex items-center px-3 text-xl  bg-amber-200 border border-r-0
                       border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-amber-500 dark:border-gray-600'>
          Username
        </label>
        <input type='text' id='username'
               className='rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500
                      focus:border-blue-500 block flex-1 min-w-0 w-full text-base  border-gray-300 p-2.5
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                         dark:focus:ring-blue-500 dark:focus:border-blue-500'
               placeholder='Enter your username...' />
      </div>

      <div className='flex'>
        <label htmlFor='password'
               className='inline-flex items-center px-3 text-xl  bg-amber-200 border border-r-0
                       border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-amber-500 dark:border-gray-600'>
          Password
        </label>
        <input type='password' id='password'
               className='rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500
                      focus:border-blue-500 block flex-1 min-w-0 w-full text-base  border-gray-300 p-2.5
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                         dark:focus:ring-blue-500 dark:focus:border-blue-500'
               placeholder='Enter your username...' />
      </div>

      <button type='submit' className='border-solid border-2 border-amber-400 dark:border-slate-500 text-xl
             bg-amber-200 dark:bg-slate-500  p-2 rounded-lg w-2/4 hover:scale-110 transition duration-200 '
      >
        Login
      </button>

    </form>
  );
};

