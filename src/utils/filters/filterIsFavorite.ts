interface FilterIsFavorite {
  favMovies: FavMovies[];
  movieId: string;
}


export const filterIsFavorite = ({ favMovies, movieId }: FilterIsFavorite) => {


  const favMovie = favMovies.filter(function(movie) {
    return (movie.id === +movieId);
  }).length > 0;

  return favMovie;
};