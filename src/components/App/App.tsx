import { useEffect, useState } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import SearchBar from '../SearchBar/SearchBar';
import {
  fetchMovies,
  type MovieHTTPResponse,
} from '../../services/movieService';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';
import Pagination from '../Pagination/Pagination';
import { useQuery } from '@tanstack/react-query';

function App() {
  const [query, setQuery] = useState('');

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean>(false);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  //   const openModal = () => {
  //     setIsModalOpen(true);
  //     selectedMovie();
  //   };
  //   const closeModal = () => {
  //     setIsModalOpen(false);
  //   };
  // const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery<MovieHTTPResponse>({
    queryKey: ['movies', query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query.length > 0,
    keepPreviousData: true,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (isSuccess && movies.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [isSuccess, movies.length]);

  const handleSearch = async (nextQuery: string): Promise<void> => {
    setQuery(nextQuery);
    setCurrentPage(1);
  };

  // const handleSearch = async (query: string) => {
  //   try {
  //     setMovies([]);
  //     setIsError(false);
  //     setIsLoading(true);
  //     const { results } = await fetchMovies(query);
  //     if (results.length === 0) {
  //       toast.error('No movies found for your request.');
  //     }
  //     setMovies(results);
  //   } catch (error) {
  //     console.log(error);

  //     setIsError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleSearch = async (query: string) => {
  //   try {
  //     setCurrentPage(1);
  //     setMovies([]);
  //     // setIsError(false);
  //     // setIsLoading(true);
  //     const { results } = await fetchMovies(query);
  //     if (results.length === 0) {
  //       toast.error('No movies found for your request.');
  //     }
  //     setMovies(results);
  //   } catch (error) {
  //     console.log(error);

  //     // setIsError(true);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };

  // return (
  //   <>
  //     <div>
  //       <Toaster />
  //     </div>
  //     <SearchBar onSubmit={handleSearch} />
  //     {isLoading && <Loader />}
  //     {isError && <ErrorMessage />}
  //     {movies.length > 0 && (
  //       <MovieGrid movies={movies} onSelect={setSelectedMovie} />
  //     )}
  //     {selectedMovie && (
  //       <MovieModal
  //         movie={selectedMovie}
  //         onClose={() => {
  //           setSelectedMovie(null);
  //         }}
  //       />
  //     )}
  //   </>
  // );

  return (
    <>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSearch} />

      {isSuccess && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => {
            setSelectedMovie(null);
          }}
        />
      )}
    </>
  );
}

export default App;
