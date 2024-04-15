import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';
import { getSearchMovie } from '../apiService/movies';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

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
      <ul>
       {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {searchMovies !== null && (searchMovies.map((movie) => {
        return (
           <li key={movie.id} >
              <Link to={`/movies/${movie.id}`}>
              <h1>{movie.title}</h1>
              </Link>
            </li> 
        )
      }))}
        </ul>
</div>
  )
}

export default MoviesPage