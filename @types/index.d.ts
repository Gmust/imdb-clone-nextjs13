interface Movie {
  adult?: boolean;
  backdrop_path?: string | null;
  belongs_to_collection?: null | object;
  budget?: number;
  genres?: Genres[];
  homepage?: string | null;
  id: string;
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

interface Review {
  author?: string,
  author_details?: AuthorDetails,
  content?: string,
  created_at: Date,
  id?: string,
  updated_at?: Date,
  url?: URL
}

interface AuthorDetails {
  name: string,
  username: string,
  avatar_path: string,
  rating: number
}

interface Result<Data> {
  results: Array<Data>;
  page?: number;
  totalPages?: number;
}

interface GuestSession {
  success: boolean,
  guest_session_id: string,
  expires_at: string
}

interface LoginUserSession {
  success: boolean,
  expires_at: string,
  request_token: string
}

interface LoginForm {
  username: string,
  password: string,
  temporaryToken: string
}

interface User {
  avatar?: {
    gravatar: {
      hash: string
    },
    tmdb?: {
      avatar_path: string
    }
  },
  id: string,
  iso_639_1?: string,
  iso_3166_1?: string,
  name: string,
  include_adult: boolean,
  username: string
}

interface MarkAsFavParams {
  accountId: string,
  media_type: 'movie' | 'tv',
  media_id: string,
  favorite: boolean
  session_id: string
}

interface MarkAsFavRes {
  status_code: string,
  status_message: string
}

interface FavMovies {
  adult: boolean;
  backdrop_path: any;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: any;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface RatedMovies {
  adult: boolean;
  backdrop_path: any;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: any;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  rating: number;
}

interface CreateListParams {
  session_id: string,
  name: string,
  description?: string | null,
  language?: string | null
}

interface ListLanguages {
  iso_639_1: string,
  english_name: string
  name: string
}

interface List {
  description: string;
  favorite_count: number;
  id: string;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: any;
}


interface ListDetails {
  created_by: string;
  description: string;
  favorite_count: number;
  id: string;
  items: ListItem[];
  item_count: number;
  iso_639_1: string;
  name: string;
  poster_path: string;
}

interface ListItem {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  original_title: string;
  genre_ids: number[];
  id: string;
  media_type: string;
  original_language: string;
  title: string;
  backdrop_path: any;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}
