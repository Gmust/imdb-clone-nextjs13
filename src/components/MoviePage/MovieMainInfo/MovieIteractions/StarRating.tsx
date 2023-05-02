'use client';

import React, { useContext, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import { FaHandPointRight } from 'react-icons/fa';
import { MoviesAPI } from '@/src/service/movies';
import { AuthContext, useSnackbar, ViewContext } from '@/context';

interface StarRatingParams {
  movieId: string;
}

export const StarRating = ({ movieId }: StarRatingParams) => {

  const { token } = useContext(AuthContext);
  const { setShowModal } = useContext(ViewContext);
  const addSnackbar = useSnackbar();
  const [rating, setRating] = useState<number>(1);
  const [hover, setHover] = useState<number>(1);

  const handleSendRating = async () => {
    try {
      console.log(token.id);
      const res = await MoviesAPI.rateMovie({
        movie_id: +movieId,
        value: rating,
        session_id: token.id,
        type: token.type!
      });
      setShowModal(false);
      console.log(res.data);
      addSnackbar({
        key: 'success',
        text: res.data.status_message,
        variant: 'success'
      });
    } catch (e: any) {
      addSnackbar({
        key: 'error',
        text: e.response.data.status_message,
        variant: 'error'
      });
    }
  };

  return (
    <div className='flex flex-col justify-between space-y-2 text-xl sm:text-3xl text-black'>
      <span className='text-center '>Select Rating</span>
      <div>
        {[...Array(10)].map((star, index) => {
            index += 1;
            return (
              <button type='button' key={index}
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
              >
                {
                  index <= (hover || rating) ?
                    <AiFillStar className='text-yellow-400  ' />
                    :
                    <AiOutlineStar className='text-yellow-400 ' />
                }
              </button>
            );
          }
        )}
      </div>
      {rating &&
        <div className='flex items-center space-x-4'>
          <span>Confirm your rating</span>
          <FaHandPointRight className='text-sky-950' />
          <button>
            <GiConfirmed className='text-green-500 hover:scale-110 transition duration-200 ease-in-out'
                         onClick={() => handleSendRating()} />
          </button>
        </div>
      }
    </div>
  );
};

