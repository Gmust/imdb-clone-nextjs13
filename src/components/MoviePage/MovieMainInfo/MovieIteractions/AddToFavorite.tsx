'use client';

import { filterIsFavorite } from '@utils/filters/filterIsFavorite';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import React, { useContext, useEffect, useState, useTransition } from 'react';
import { UsersAPI } from '@/src/service/users';
import { AuthContext, useSnackbar } from '@/context';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';


interface AddToFavoriteProps {
  movieId: string;
}

export const AddToFavorite = ({ movieId }: AddToFavoriteProps) => {

  const { isAuth } = useContext(AuthContext);
  const { user, favMovies } = useContext(UserContext);
  const [isFavorite, setIFavorite] = useState<boolean>(false);
  const addSnackBar = useSnackbar();

  useEffect(() => {
    setIFavorite(filterIsFavorite({ favMovies, movieId }));
  }, []);

  const handleMakeAsFavorite = async () => {
    if (!isAuth) {
      addSnackBar({
        key: 'info',
        text: 'To mark movie as favorite you need to be logged in!',
        variant: 'info'
      });
      return;
    } else {
      try {
        const session_id = localStorage.getItem('session_id');
        const res = UsersAPI.markAsFavorite({
          media_type: 'movie',
          media_id: movieId,
          favorite: !filterIsFavorite({ favMovies, movieId }),
          session_id: session_id!,
          accountId: user.id
        });
        setIFavorite(!isFavorite);
        addSnackBar({
          key: 'success',
          text: 'Success',
          variant: 'success'
        });
      } catch (e: any) {
        addSnackBar({
          key: 'error',
          text: e.message,
          variant: 'error'
        });
      }
    }
  };


  return (
    <span
      className='border-2 border-solid border-amber-500 rounded-full items-center p-1 cursor-pointer hover:scale-110'>
      {isAuth ? isFavorite ?
          <HiHeart className='text-fuchsia-600' onClick={handleMakeAsFavorite} /> :
          <HiOutlineHeart onClick={handleMakeAsFavorite} />
        :
        <HiOutlineHeart onClick={handleMakeAsFavorite} />
      }
    </span>
  );
};

