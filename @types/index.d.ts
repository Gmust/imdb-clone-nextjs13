interface Movie {
  adult?: boolean;
  backdrop_path?: string | null;
  belongs_to_collection?: null | object;
  budget?: number;
  genres?: Genres[];
  homepage?: string | null;
  id?: number;
  imdb_id?: string | null;
  original_language?: string;
  original_title?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: Company[];
  production_countries?: Countries[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: Languages[];
  status?: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}


interface Company {
  name: string;
  id: number;
  logo_path?: string | null;
  origin_country: string;
}

interface Countries {
  iso_3166_1: string;
  name: string;
}

interface Languages {
  iso_639_1: string;
  name: string;
}

interface Genres {
  id: number,
  name: string
}

type Category = {
  category: 'popular' | 'top_rated' | 'latest' | 'now_playing' | 'upcoming'
}

interface Result<Data> {
  results: Array<Data>;
  page?: number;
  totalPages?: number;
}