'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiLike, BiStar } from 'react-icons/bi';
import { AuthContext, ViewContext } from '@/context';
import { AuthAPI } from '@/src/service/auth';
import { Modal } from '@/assets/Modals';
import { StarRating } from '@components/MoviePage/MovieMainInfo/StarRating';

interface RateMovieProps {
  vote_count: Movie['vote_count'];
  vote_average: Movie['vote_average'];
  movieId: Movie['id'];
}

export const RateMovie = ({ vote_count, vote_average, movieId }: RateMovieProps) => {

  const router = useRouter();
  const { isGuest, isAuth, setIsGuest } = useContext(AuthContext);
  const { showModal, setShowModal } = useContext(ViewContext);


  const handleLoginLikeGuest = async () => {
    try {
      const res = await AuthAPI.createGuestSession();
      setIsGuest(res.success);
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

  return (
    <>
      <span className='flex items-center '>
        {vote_count}<BiLike />
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

