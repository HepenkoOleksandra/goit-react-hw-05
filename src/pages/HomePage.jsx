import { useEffect, useState } from "react"
import { requestTrendingMovies } from "../apiService/movies";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    async function fetchTrendingMovies() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await requestTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendingMovies();

  }, [])

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {Array.isArray(trendingMovies) && trendingMovies.map((movie) => {
          return (
            
              <li key={movie.id} >
              <Link to={`/movies/${movie.id}`}>
              <h1>{movie.title}</h1>
              </Link>
            </li>   
        )})}
      </ul>
    </div>
  )
};

export default HomePage