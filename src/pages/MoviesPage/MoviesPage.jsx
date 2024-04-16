import toast, { Toaster } from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';
// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSearchMovie } from '../../apiService/movies';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [searchMovies, setSearchMovies] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.currentTarget.elements.query.value.trim() === "") {
      toast.error('Enter the name of the movie, please!')
      return;
    }
    
    const value = e.currentTarget.elements.query.value.trim();
    setQuery(value);
  }
  
  return (
  <div>
   <form onSubmit={handleSubmit}>  
    <input
      type="text"
      name="query"
      autoComplete="off"
      autoFocus
      placeholder="Search movies..."
    />
    <button type="submit"><FcSearch /></button>
    <Toaster />           
      </form>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieList movieList={searchMovies} />
</div>
  )
}

export default MoviesPage