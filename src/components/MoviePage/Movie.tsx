import { RelatedFilmsBar } from '@components/MoviePage/RelatedFilmsBar';
import { MovieDescription } from '@components/MoviePage/MovieDescription';
import { MovieMainInfo } from '@components/MoviePage/MovieMainInfo';

interface MovieProps {
  movieDetail: Movie,
  similarMovies: Movie[],
  movieReviews: Result<Review>
}

export const Movie = ({ movieDetail, similarMovies, movieReviews }: MovieProps) => {

  const formatedRelatedMovies = similarMovies.slice(0, 4);


  return (
    <div className='sm:flex min-h-full px-4 py-8 sm:justify-between'>
      <div className='sm:flex sm:space-x-10'>
        <div className='flex flex-col space-y-4'>
          <MovieMainInfo {...movieDetail} />
        </div>

        <div className='flex flex-col '>
          <MovieDescription movieDetail={movieDetail} movieReviews={movieReviews} />
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

