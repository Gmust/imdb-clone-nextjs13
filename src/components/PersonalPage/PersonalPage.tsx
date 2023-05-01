'use client';

import { useContext, useEffect, useState } from 'react';
import { UsersAPI } from '@/src/service/users';
import { UserContext } from '@/context/UserContext';
import Image from 'next/image';
import { CONSTANTS } from '@utils/constants';
import { useUserLogin } from '@/hooks/react';
import { FavoriteMovies } from '@components/PersonalPage/FavoriteMovies';
import { AccountInfo } from '@components/PersonalPage/AccountInfo';


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
    <div className='flex flex-col justify-center sm:flex-row sm:justify-normal  mt-2 sm:mt-5 sm:space-x-10 ml-4
     sm:ml-16 '>

      <>
        <AccountInfo avatar={user.avatar?.tmdb?.avatar_path} username={user.username} name={user.name}/>
      </>


      <div className='flex flex-col'>
        <span className='text-xl sm:text-2xl font-semibold'>Favorites:</span>
        <FavoriteMovies favMovies={favMovies} />
      </div>

    </div>
  );
};

