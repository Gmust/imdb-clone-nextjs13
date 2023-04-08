import { MoviesAPI } from '@/src/service/movies';
import { MovieCard } from '@components/MovieCard/MovieCard';

const SearchPage = async ({ params }: any) => {

  const searchMoviesRes = await MoviesAPI.searchMovies(params.searchTerm.toString());
  const searchMovies = searchMoviesRes.data.results;
  return (
    <section className='grid  sm:grid-cols-2 lg:grid-cols-4 gap-3 mx-4 py-4'>
      {searchMovies && searchMovies.map(result =>
        <MovieCard {...result} key={result.id} />
      )}
    </section>
  );
};

export default SearchPage;