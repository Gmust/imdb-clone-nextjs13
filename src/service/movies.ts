import { instance } from './index';

interface TopRatedReq {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
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
  }

};