import Image from 'next/image';
import { CONSTANTS } from '@utils/constants';
import { selectClassname } from '@utils/className/statusClassName';
import { MovieInteractions } from '@components/MoviePage/MovieMainInfo/MovieInteractions';

export const MovieMainInfo = (movieDetail: Movie) => {

  const classname = selectClassname(movieDetail.status);

  return (
    <>
      <div className={'relative h-[28rem] w-[18rem] sm:h-[33rem] sm:w-[20rem]  overflow-hidden object-cover'}>
        <Image src={`${CONSTANTS.IMAGE_URL}${movieDetail.poster_path || movieDetail.backdrop_path}`}
               alt={movieDetail.title!} className='rounded-lg w-auto h-auto'
               fill={true} sizes={undefined} />
      </div>
      <div className='flex justify-between  text-xl '>
        <MovieInteractions movieId={movieDetail.id} vote_count={movieDetail.vote_count}
                           vote_average={movieDetail.vote_average} />
      </div>
      <div className='flex justify-around space-x-1 flex-wrap'>
        {movieDetail.genres?.map(genre =>
          <div key={genre.id} className='border-solid border-2 border-slate-400 rounded-lg p-2 mt-3'>
            {genre.name}
          </div>
        )}
      </div>
      <div className='flex justify-center'>
        <div className={`${classname} border-solid border-2 text-2xl text-center p-2 w-40 rounded-lg`}>
          {movieDetail.status}
        </div>
      </div>
    </>
  );
};

