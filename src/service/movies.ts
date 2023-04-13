import { instance } from './index';

interface TopRatedReq {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
}

interface RateMovieParams {
  movie_id: string;
  value: number;
  guest_session_id?: string;
  session_id?: string;
}

export const MoviesAPI = {

  async getCategories(category: Category, page: number = 1) {
    return await instance.get<TopRatedReq>(`/movie/${category}?page=${page}`);
  },
  async getMovieDetail(id: number) {
    return await instance.get<Movie>(`/movie/${id}`);
  },
  async getSimilarMovies(id: number) {
    return await instance.get<Result<Movie>>(`/movie/${id}/similar`);
  },
  async searchMovies(searchTerm: string) {
    return await instance.get<Result<Movie>>(`/search/movie?query=${searchTerm}`);
  },
  async getMovieReview(id: number) {
    return await instance.get<Result<Review>>(`/movie/${id}/reviews`);
  },
  async rateMovie({ movie_id, guest_session_id, session_id, value }: RateMovieParams) {
    guest_session_id ? await instance.post(`/movie/${movie_id}/rating?session_id=${session_id}`,
        { value })
      : await instance.post(`/movie/${movie_id}/rating?guest_session_id=${guest_session_id}`,
        { value });
  }
};