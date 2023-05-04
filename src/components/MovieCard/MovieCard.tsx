import Image from 'next/image';
import Link from 'next/link';
import { BiLike, BiStar } from 'react-icons/bi';


export const MovieCard = ({ title, vote_average, poster_path, release_date, vote_count, id, overview }: Movie) => {
  return (
    <div className='border-solid border-2 border-slate-400 rounded-lg p-4 sm:hover:shadow-slate-400
                    shadow-md transition-shadow duration-200 '>
      <Link href={`/movie/${id}`} className='flex flex-col '>
        <h2 className='line-clamp-1 text-xl font-semibold'>{title}</h2>
        <div className='object-cover relative rounded-lg bg-cover bg-gradient-to-r from-cyan-500 to-blue-500
                        w-52  h-48'>
          <Image src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={`${title} poster`}
                 fill priority loading='eager' sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw' />
        </div>
        <div className='p-2'>
          <p className='line-clamp-2 text-lg'>{overview}</p>
          <div className='flex justify-between mt-0.5'>
            {release_date}
            <div className='flex items-center'>
              {vote_count} <BiLike className='mr-2 ml-0.5' />
              {vote_average} <BiStar className='ml-0.5' />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

