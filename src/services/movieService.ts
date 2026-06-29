import axios from 'axios';
import type { Movie } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

export interface MovieHTTPResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieHTTPResponse> => {
  const response = await axios.get<MovieHTTPResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query: query,
        page,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  return response.data;
};
