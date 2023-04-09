import { Navbar } from '@components/Navbar/Navbar';
import { MovieCard } from '@components/MovieCard/MovieCard';
import { MoviesAPI } from '@/src/service/movies';
import { Paginator } from '@components/Paginator/Paginator';

export const revalidate = 1000;

const Home = async ({ searchParams }: any) => {

  const { genre, page } = searchParams;
  const moviesResponse = await MoviesAPI.getCategories(genre ? genre : 'now_playing', page);
  const result = moviesResponse.data.results;

  return (
    <main>
      <Navbar />
      <section className='grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mx-4 py-4'>
        {result && result.map(result =>
          <MovieCard {...result} key={result.id} />
        )}
      </section>
      <Paginator searchTerm={genre ? genre : 'now_playing'}
                 page={page} totalPages={moviesResponse.data.total_pages} />
    </main>
  );
};


export default Home;
