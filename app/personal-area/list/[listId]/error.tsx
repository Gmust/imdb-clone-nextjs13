'use client'; // Error components must be Client components

import { useEffect } from 'react';

export default function Error({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
      <div className='text-center mt-10 text-4xl' >
        <h1>Something went wrong!</h1>
        <button onClick={() => reset()} className='transition ease-in-out delay-100 bg-amber-500 p-2 mt-3 rounded-2xl hover:scale-110'>
          Try again
        </button>
      </div>
  );
}