import { useEffect, useState } from 'react';
import { getSearchMovie } from '../../services/moviesAPI';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../../components/SearchForm/SearchForm';

const MoviesPage = () => {
  // const [query, setQuery] = useState("");
  const [searchMovies, setSearchMovies] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) return;

    async function fetchSearchMovies() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await getSearchMovie(query);
        setSearchMovies(data);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearchMovies();
  }, [query]);

  const onSetSearchQuery = (searchWord) => {
    setSearchParams({ query: searchWord });
  };
  
  return (
    <div>
      <SearchForm onFormSubmit={onSetSearchQuery} />
      <MovieList movieList={searchMovies} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
    </div>
  );
};

export default MoviesPage;