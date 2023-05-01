'use client';

import { useContext, useEffect, useState } from 'react';
import { UsersAPI } from '@/src/service/users';
import { UserContext } from '@/context/UserContext';
import Image from 'next/image';
import { CONSTANTS } from '@utils/constants';
import { useUserLogin } from '@/hooks/react';


export const PersonalPage = () => {


  const { user, setFavMovies, favMovies } = useContext(UserContext);
  const login = useUserLogin();

  useEffect(() => {
    login();
  }, []);
  useEffect(() => {
    const fetchFavMovies = async () => {
      const session_id = localStorage.getItem('session_id');
      const res = await UsersAPI.getFavoriteMovies(user.id, session_id!);
      // @ts-ignore
      setFavMovies(res.results);
    };
    fetchFavMovies();
  }, [user]);

  return (
    <div className='flex flex-col sm:flex-row  mt-2 sm:mt-5 space-x-4 sm: ml-16'>
      <div>
        <Image
          src={user.avatar?.tmdb?.avatar_path ? CONSTANTS.IMAGE_URL + '/' + user.avatar?.tmdb?.avatar_path : '/defaultAvatar.webp'}
          alt={''} width={200} height={200}
          className='rounded-lg shadow-2xl shadow-amber-500/40' />
      </div>

      <div>
        <ul>
          <li className='flex items-center'>
            <span className='text-xl mr-2'>Username:</span>
            <h2 className='text-xl dark:text-amber-500'>{user.username}</h2>
          </li>
          <li className='flex items-center'>
            <span className='text-xl mr-2'>Name:</span>
            <h2 className='text-xl dark:text-amber-500'>{user.name}</h2>
          </li>
        </ul>
      </div>


      <div>
        {favMovies.map(movie => <div>{movie.title}</div>)}
      </div>

    </div>
  );
};

