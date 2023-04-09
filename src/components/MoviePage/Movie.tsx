import Image from 'next/image';
import { BiDollar } from 'react-icons/bi';
import { BiLike, BiStar } from 'react-icons/bi';
import { GiFilmProjector } from 'react-icons/gi';
import { RelatedFilmsBar } from '@components/MoviePage/RelatedFilmsBar';
import { selectClassname } from '@utils/className/statusClassName';
import { CONSTANTS } from '@utils/constants';
import { CompanyCard } from '@components/MoviePage/CompanyCard';

interface MovieProps {
  movieDetail: Movie,
  similarMovies: Movie[]
}

export const Movie = ({ movieDetail, similarMovies }: MovieProps) => {

  const classname = selectClassname(movieDetail.status);
  const formatedRelatedMovies = similarMovies.slice(0, 4);

  return (
    <div className='sm:flex min-h-full px-4 py-8 sm:justify-between'>
      <div className='sm:flex sm:space-x-10'>
        <div className='flex flex-col space-y-4'>
          <div className={'relative h-[28rem] w-[18rem] sm:h-[33rem] sm:w-[20rem]  overflow-hidden object-cover'}>
            <Image src={`${CONSTANTS.IMAGE_URL}${movieDetail.poster_path || movieDetail.backdrop_path}`}
                   alt={movieDetail.title!} className='rounded-lg w-auto h-auto'
                   fill={true} />
          </div>
          <div className='flex justify-between  text-xl '>
            <span className='flex items-center'>{movieDetail.vote_count}<BiLike /></span>
            <span className='flex items-center'>{movieDetail.vote_average}<BiStar /></span>
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
        </div>

        <div className='flex flex-col '>
          <div>
            <h1 className='text-5xl font-semibold'>{movieDetail.original_title || movieDetail.title}</h1>
          </div>
          {movieDetail.tagline && <p className='ml-3 opacity-80 dark:opacity-50'>- {movieDetail.tagline}</p>}
          <p className='text-lg mt-3 w-full sm:w-10/12'>{movieDetail.overview}</p>
          <span className='flex items-center text-xl'>
            <h2 className='font-bold mr-2'>Budget:</h2>{movieDetail.budget}<BiDollar />
          </span>
          <span className='flex items-center text-xl'>
            <h2 className='font-bold mr-2'>Revenue:</h2>{movieDetail.revenue}<BiDollar />
          </span>
          <span className='flex items-center text-xl'>
            <h2 className='font-bold mr-2'>Original Language:</h2>{movieDetail.original_language?.toUpperCase()}
          </span>
          <div>
            <h2 className='flex  items-center font-bold mr-2 text-xl'>Production companies
              <GiFilmProjector className='ml-1' />:</h2>
            <div className='flex overflow-x-auto  space-x-3 sm:flex-wrap  sm:overflow-auto'>
              {movieDetail.production_companies?.map(company =>
                <CompanyCard key={company.id} {...company} />
              )}
            </div>
          </div>

        </div>
      </div>

      <div className='flex flex-col  sm:w-40'>
        <h3 className='text-lg'>Related films:</h3>
        <div className='flex space-x-2 sm:flex-col sm:space-y-4 sm:space-x-0 overflow-x-auto'>
          {formatedRelatedMovies.map(movies => <RelatedFilmsBar key={movies.id} {...movies} />)}
        </div>
      </div>
    </div>
  );
};

