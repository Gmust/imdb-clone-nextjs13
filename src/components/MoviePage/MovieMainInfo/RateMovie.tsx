'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BiLike, BiStar } from 'react-icons/bi';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { AuthContext, useSnackbar, ViewContext } from '@/context';
import { AuthAPI } from '@/src/service/auth';
import { Modal } from '@/assets/Modals';
import { StarRating } from '@components/MoviePage/MovieMainInfo/StarRating';
import { UsersAPI } from '@/src/service/users';
import { UserContext } from '@/context/UserContext';
import { filterIsFavorite } from '@utils/filters/filterIsFavorite';

interface RateMovieProps {
  vote_count: Movie['vote_count'];
  vote_average: Movie['vote_average'];
  movieId: Movie['id'];
}

export const RateMovie = ({ vote_count, vote_average, movieId }: RateMovieProps) => {

  const router = useRouter();
  const { isGuest, isAuth, setIsGuest } = useContext(AuthContext);
  const { setShowModal } = useContext(ViewContext);
  const { user, favMovies, setFavMovies } = useContext(UserContext);
  const addSnackBar = useSnackbar();


  useEffect(() => {
    const fetchFavMovies = async () => {
      const session_id = localStorage.getItem('session_id');
      const res = await UsersAPI.getFavoriteMovies(user.id, session_id!);
      // @ts-ignore
      setFavMovies(res.results);
    };
    fetchFavMovies();
  }, []);

  const handleLoginLikeGuest = async () => {
    try {
      const res = await AuthAPI.createGuestSession();
      setIsGuest(res.success);
      addSnackBar({
        key: 'success',
        text: 'Successfully logged in like guest',
        variant: 'success'
      });
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleRateFilm = async () => {
    if (!isGuest && !isAuth) {
      setShowModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleMakeAsFavorite = async () => {
    if (!isAuth) {
      addSnackBar({
        key: 'info',
        text: 'To mark filv as favorite you need to be logged in!',
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
        addSnackBar({
          key: 'success',
          text: 'Success',
          variant: 'success'
        });
        router.refresh();
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
    <>
      <span className='flex items-center '>
        {vote_count}<BiLike />
      </span>
      <span
        className='border-2 border-solid border-amber-500 rounded-full items-center p-1 cursor-pointer hover:scale-110'>
        {filterIsFavorite({ favMovies, movieId }) ?
          <HiHeart className='text-fuchsia-600' onClick={handleMakeAsFavorite} /> :
          <HiOutlineHeart onClick={handleMakeAsFavorite} />}
      </span>
      <span className='flex items-center cursor-pointer' onClick={() => handleRateFilm()}>
        {vote_average}<BiStar />
      </span>

      <Modal>
        {!isGuest && !isAuth ?
          <div className='text-xl text-black text-center'>
            <span>You need to be logged in to rate the film</span>
            <div className='flex justify-between mt-2'>
              <button className='bg-green-700 p-2 rounded-lg hover:scale-110 transition duration-200'
                      onClick={() => {
                        setShowModal(false);
                        router.push('/login');
                      }}>
                Log in like user
              </button>

              <button className='bg-fuchsia-500 p-2 rounded-lg hover:scale-110 transition duration-200'
                      onClick={() => {
                        setShowModal(false);
                        handleLoginLikeGuest();
                      }}>
                Log in like guest
              </button>
            </div>
          </div>
          :
          <div>
            <StarRating movieId={movieId} />
          </div>
        }
      </Modal>
    </>
  );
};

