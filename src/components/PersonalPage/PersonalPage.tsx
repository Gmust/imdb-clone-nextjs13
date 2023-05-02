'use client';

import React, { SetStateAction, useContext, useEffect, useState } from 'react';
import { UsersAPI } from '@/src/service/users';
import { UserContext } from '@/context/UserContext';
import { useUserLogin } from '@/hooks/react';
import { FavoriteMovies } from '@components/PersonalPage/FavoriteMovies';
import { AccountInfo } from '@components/PersonalPage/AccountInfo';
import { RatedMovies } from '@components/PersonalPage/RatedMovies';


export const PersonalPage = () => {


  const { user, setFavMovies, favMovies } = useContext(UserContext);
  const [ratedMovies, setRatedMovies] = useState<RatedMovies[] | null>(null);
  const login = useUserLogin();

  useEffect(() => {
    login();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const session_id = localStorage.getItem('session_id');
      const favMoviesRes = await UsersAPI.getFavoriteMovies(user.id, session_id!);
      const ratedMoviesRes = await UsersAPI.getRatedMovies(user.id, session_id!);
      // @ts-ignore
      setFavMovies(favMoviesRes.results);
      // @ts-ignore
      setRatedMovies(ratedMoviesRes.results);
    };
    fetchData();
  }, [user]);

  return (
    <div className='flex flex-col justify-center sm:flex-row sm:justify-normal  mt-2 sm:mt-5 sm:space-x-10 ml-4
     sm:ml-16 '>

      <>
        <AccountInfo avatar={user.avatar?.tmdb?.avatar_path} username={user.username} name={user.name} />
      </>


      <div className='flex flex-col space-y-4 '>
        <>
          {
            favMovies.length > 0 ?
              <div>
                <span className='text-xl sm:text-2xl font-semibold'>Favorites:</span>
                <FavoriteMovies favMovies={favMovies} />
              </div>
              : null
          }
        </>
        <>
          {
            favMovies.length >= 1 ?
              <div>
                <span className='text-xl sm:text-2xl font-semibold'>Rated movies:</span>
                <RatedMovies ratedMovies={ratedMovies} />
              </div>
              : null
          }


        </>
      </div>

    </div>
  );
};

