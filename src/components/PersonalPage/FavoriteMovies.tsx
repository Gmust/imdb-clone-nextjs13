import Image from 'next/image';
import { CONSTANTS, ROUTES } from '@utils/constants';
import Link from 'next/link';

interface FavoriteMovies {
  favMovies: FavMovies[];
}

export const FavoriteMovies = ({ favMovies }: FavoriteMovies) => {
  return (
    <div className='flex lg:max-w-screen-lg sm:max-w-sm min-w-0 overflow-x-auto overflow-y-hidden snap-x space-x-4 select-none '>
      {favMovies.map(favMovie =>
        <div key={favMovie.id} className='items-center flex flex-col align-middle snap-center border-2 border-solid border-slate-500
                    dark:border-white rounded-lg p-2 space-y-1 cursor-pointer'>
          <Link href={ROUTES.MOVIE_CARD + '/' + favMovie.id}>
            <div className='object-cover relative rounded-lg bg-cover bg-gradient-to-r from-cyan-500 to-blue-500
                        w-32 h-32'>
              <Image src={CONSTANTS.IMAGE_URL + favMovie.poster_path} alt={favMovie.title} fill priority loading='eager'
                     sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw' />
            </div>
            <span className='line-clamp-1  text-xl overflow-hidden '>{favMovie.title}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

