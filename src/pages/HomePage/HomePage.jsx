import { useEffect, useState } from "react";
import { requestTrendingMovies } from "../../apiService/movies";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";

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

  }, []);

  return (
    <div>
      <MovieList movieList={trendingMovies} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
    </div>
  );
};

export default HomePage;