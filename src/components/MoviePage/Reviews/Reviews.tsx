'use client';

import { useEffect, useState } from 'react';
import { ReviewCard } from '@components/MoviePage/Reviews/ReviewCard';

export const Reviews = (movieReviews: Result<Review>) => {

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const firstTwoReviews = movieReviews.results.slice(0, 2);
    setReviews(firstTwoReviews);
  }, []);


  return (
    <div className='space-y-4 flex flex-col justify-center'>
      {reviews && reviews.map(review =>
        <ReviewCard {...review} key={review.id} />
      )}
      {
        reviews.length < movieReviews.results.length ?
          <div className='w-10/12 flex justify-center'>
            <button className='border-2 border-solid rounded-xl bg-amber-300 dark:bg-white dark:text-amber-500 p-2
                               hover:scale-105 transition duration-300 ease-in-out'
                    onClick={() => setReviews(movieReviews.results)}>
              Load all reviews...
            </button>
          </div>
          :
          null
      }
    </div>
  );
};

