'use client';

import { useContext, useEffect } from 'react';
import { UsersAPI } from '@/src/service/users';
import { UserContext } from '@/context/UserContext';
import Image from 'next/image';
import { CONSTANTS } from '@utils/constants';


export const PersonalPage = () => {

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchAccount = async () => {
      const session_id = localStorage.getItem('session_id');
      const res = await UsersAPI.getAccountDetails(session_id!);
      setUser(res);
    };

    fetchAccount();
  }, []);

  console.log(user);

  return (
    <div className='flex flex-col sm:flex-row  mt-2 sm:mt-5 space-x-4 sm: ml-16'>
      <div>
        <Image src={CONSTANTS.IMAGE_URL + '/' + user.avatar?.tmdb.avatar_path} alt={''} width={200} height={200}
               className='rounded-lg shadow-2xl shadow-amber-500/40' />
      </div>

      <div>
        <ul>
          <li className='flex items-center'>
            <span  className='text-xl mr-2'>Username:</span>
            <h2 className='text-xl dark:text-amber-500'>{user.username}</h2>
          </li>
          <li className='flex items-center'>
            <span  className='text-xl mr-2'>Name:</span>
            <h2 className='text-xl dark:text-amber-500'>{user.name}</h2>
          </li>
        </ul>
      </div>
    </div>
  );
};

