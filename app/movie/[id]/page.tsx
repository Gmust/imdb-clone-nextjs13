import { MoviesAPI } from '@/src/service/movies';
import { Movie } from '@components/MoviePage/Movie';

interface MoviePageParams {
  params: {
    id: string
  };
}

const MoviePage = async ({ params }: MoviePageParams) => {

  const movieDetailRes = await MoviesAPI.getMovieDetail(+params.id);
  const similarMoviesRes = await MoviesAPI.getSimilarMovies(+params.id);
  const movieReviewsRes = await MoviesAPI.getMovieReview(+params.id);


  const movieDetail = movieDetailRes.data;
  const similarMovies = similarMoviesRes.data;
  const movieReviews = movieReviewsRes.data

  return (
    <Movie movieDetail={movieDetail} movieReviews={movieReviews}
      // @ts-ignore
           similarMovies={similarMovies!.results} />
  );
};

export default MoviePage;