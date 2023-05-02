'use client';

import { useContext } from 'react';
import { BiStar } from 'react-icons/bi';
import { Modal } from '@/assets/Modals';
import { AuthContext, useSnackbar, ViewContext } from '@/context';
import { StarRating } from '@components/MoviePage/MovieMainInfo/MovieIteractions/StarRating';
import { AuthAPI } from '@/src/service/auth';
import { useRouter } from 'next/navigation';

interface RateMovieInterface {
  vote_average: string | number;
  movieId: string;
}

export const RateMovie = ({ movieId, vote_average }: RateMovieInterface) => {


  const { isGuest, isAuth, setIsGuest } = useContext(AuthContext);
  const { setShowModal } = useContext(ViewContext);
  const addSnackbar = useSnackbar();
  const router = useRouter();

  const handleRateFilm = async () => {
    if (!isGuest && !isAuth) {
      setShowModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleLoginLikeGuest = async () => {
    try {
      const res = await AuthAPI.createGuestSession();
      setIsGuest(res.success);
      addSnackbar({
        key: 'success',
        text: 'Successfully logged in like guest',
        variant: 'success'
      });
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <>
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

