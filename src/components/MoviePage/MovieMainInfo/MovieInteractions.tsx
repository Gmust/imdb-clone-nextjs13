'use client';
import React, { useContext, useEffect } from 'react';
import { BiLike} from 'react-icons/bi';
import { AuthContext, useSnackbar, ViewContext } from '@/context';
import { UsersAPI } from '@/src/service/users';
import { UserContext } from '@/context/UserContext';
import { RateMovie } from '@components/MoviePage/MovieMainInfo/MovieIteractions/RateMovie';
import { AddToFavorite } from '@components/MoviePage/MovieMainInfo/MovieIteractions/AddToFavorite';
import { InteractWithList } from '@components/MoviePage/MovieMainInfo/MovieIteractions/InteractWithList/InteractWithList';

interface RateMovieProps {
  vote_count: Movie['vote_count'];
  vote_average: Movie['vote_average'];
  movieId: Movie['id'];
}

export const MovieInteractions = ({ vote_count, vote_average, movieId }: RateMovieProps) => {

  const { isAuth } = useContext(AuthContext);
  const { user, setFavMovies } = useContext(UserContext);
  const addSnackBar = useSnackbar();


  useEffect(() => {
    if(isAuth) {
      const fetchFavMovies = async () => {
        const session_id = localStorage.getItem('session_id');
        const res = await UsersAPI.getFavoriteMovies(user.id, session_id!);
        // @ts-ignore
        setFavMovies(res.results);
      };
      fetchFavMovies();
    }
  }, []);


  const interactWithList = async () => {
    if (!isAuth) {
      addSnackBar({
        key: 'info',
        text: 'To create movie list you need to be logged in!!',
        variant: 'info'
      });
      return;
    } else {
    }
  };

  return (
    <>
      <span className='flex items-center '>
        {vote_count}<BiLike />
      </span>
      <AddToFavorite movieId={movieId} />
      <InteractWithList movieId={movieId} />
      <RateMovie vote_average={vote_average || 0} movieId={movieId} />
    </>
  );
};

