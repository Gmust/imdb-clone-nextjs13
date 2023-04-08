import { MoviesAPI } from '@/src/service/movies';
import Image from 'next/image';
import { CONSTANTS } from '@utils/constants';
import { Movie } from '@components/MoviePage/Movie';

interface MoviePageParams {
  params: {
    id: string
  };
}

const MoviePage = async ({ params }: MoviePageParams) => {

  const movieDetailRes = await MoviesAPI.getMovieDetail(+params.id);
  const similarMoviesRes = await MoviesAPI.getSimilarMovies(+params.id);

  const movieDetail = movieDetailRes.data;
  const similarMovies = similarMoviesRes.data;


  return (
    <Movie movieDetail={movieDetail}
      // @ts-ignore
           similarMovies={similarMovies!.results} />
  );
};

export default MoviePage;