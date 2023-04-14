import { BiDollar } from 'react-icons/bi';
import { GiFilmProjector } from 'react-icons/gi';
import { CompanyCard } from '@components/MoviePage/CompanyCard';
import { Reviews } from '@components/MoviePage/Reviews/Reviews';

interface MovieDescriptionProps {
  movieDetail: Movie,
  movieReviews: Result<Review>
}

export const MovieDescription = ({ movieDetail, movieReviews }: MovieDescriptionProps) => {
  return (
    <>
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

        {
          movieReviews.results.length > 0 &&
          <div className='sm:flex sm:flex-col mt-3'>
            <h3 className='text-2xl font-bold'>Reviews: </h3>
            <div>
              <Reviews {...movieReviews} />
            </div>
          </div>
        }

      </div>
    </>
  );
};

