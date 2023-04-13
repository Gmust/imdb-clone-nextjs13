'use client';
import { BiLike, BiStar } from 'react-icons/bi';
import { useContext, useEffect } from 'react';
import { AuthContext, ViewContext } from '@/context';
import { Modal } from '@/assets/Modals';
import { useRouter } from 'next/navigation';
import { AuthAPI } from '@/src/service/auth';

interface RateMovieProps {
  vote_count: Movie['vote_count'];
  vote_average: Movie['vote_average'];
}


export const RateMovie = ({ vote_count, vote_average }: RateMovieProps) => {

  const router = useRouter();
  const { isGuest, isAuth, setIsGuest } = useContext(AuthContext);
  const { showModal, setShowModal } = useContext(ViewContext);

  useEffect(() => {

  }, [isGuest, isAuth]);

  const handleRateMovie = async () => {
    console.log(isGuest);
    if (!isAuth || !isGuest) {
      setShowModal(true);
    } else if (isGuest || isAuth) {
      alert('rated');
    }
  };

  const handleLoginLikeGuest = async () => {
    try {
      const res = await AuthAPI.createGuestSession();
      setIsGuest(true);
      return res;
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <>
      <span className='flex items-center cursor-pointer'>
        {vote_count}<BiLike onClick={() => handleRateMovie()} />
      </span>
      <span className='flex items-center'>{vote_average}<BiStar /></span>

      <Modal>
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
      </Modal>
    </>
  );
};

