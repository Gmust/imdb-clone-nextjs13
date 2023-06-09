import { MoviesAPI } from '@/src/service/movies';
import { MovieCard } from '@components/MovieCard/MovieCard';
import { TbError404 } from 'react-icons/tb';

const SearchPage = async ({ params }: any) => {

  const searchMoviesRes = await MoviesAPI.searchMovies(params.searchTerm.toString());
  const searchMovies = searchMoviesRes.data.results;


  console.log(searchMovies)
  return (
    <>
      {
        searchMovies.length >= 1 ?
          <section className='grid  sm:grid-cols-2 lg:grid-cols-4 gap-3 mx-4 py-4'>
            {searchMovies && searchMovies.map(result =>
              <MovieCard {...result} key={result.id} />
            )}
          </section>
          :
          <h2 className='text-4xl text-amber-500 flex justify-center items-center mt-5 '>
            Nothing found for your request <TbError404 className='text-5xl'/>
          </h2>
      }


    </>

  );
};

export default SearchPage;