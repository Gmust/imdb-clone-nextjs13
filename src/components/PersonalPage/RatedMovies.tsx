import Link from 'next/link';
import Image from 'next/image';
import { BiStar } from 'react-icons/bi';
import { CONSTANTS, ROUTES } from '@utils/constants';

interface RatedMoviesProps {
  ratedMovies: RatedMovies[] | null;
}

export const RatedMovies = ({ ratedMovies }: RatedMoviesProps) => {
  return (
    <div
      className='flex lg:max-w-screen-lg sm:max-w-sm min-w-0 overflow-x-auto overflow-y-hidden snap-x space-x-4 select-none '>
      {ratedMovies?.map(ratedMovie =>
        <div key={ratedMovie.id} className='items-center flex flex-col align-middle  snap-center border-2 border-solid
                    border-slate-500 dark:border-white rounded-lg p-2 space-y-1 cursor-pointer'>
          <Link href={ROUTES.MOVIE_CARD + '/' + ratedMovie.id}>
            <div className='object-cover relative rounded-lg bg-cover bg-gradient-to-r from-cyan-500 to-blue-500
                        w-32 h-32'>
              <Image src={CONSTANTS.IMAGE_URL + ratedMovie.poster_path} alt={ratedMovie.title!} fill priority
                     loading='eager'
                     sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw' />
            </div>
            <span className='line-clamp-1 text-xl overflow-hidden '>{ratedMovie.title}</span>
            <span className='text-xl text-amber-500 flex items-center font-bold '>
              <>{ratedMovie.rating} / 10</>
              <BiStar className='ml-1' />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

