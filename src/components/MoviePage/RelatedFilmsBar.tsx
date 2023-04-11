import Image from 'next/image';
import Link from 'next/link';
import { CONSTANTS } from '@utils/constants';

export const RelatedFilmsBar = (movie: Movie) => {


  return (
    <Link href={`/movie/${movie.id}`} className='border-2 border-solid border-red-50 p-2 rounded-lg'>
      <div className='flex flex-col '>
        <div className='object-cover relative overflow-hidden w-36 h-24'>
          <Image src={`${CONSTANTS.IMAGE_URL}${movie.poster_path || movie.backdrop_path}`} alt={movie.title!}
                 fill sizes={undefined} />
        </div>
        <p className='text-lg line-clamp-1'>{movie.title}</p>
      </div>
    </Link>
  );
};