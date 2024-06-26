import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/moviesAPI";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { defaultImg } from "../../services/defaultImg";
import css from "./MovieCast.module.css"

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  
    async function fetchMovieCast() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await getMovieCredits(movieId);
        setMovieCast(data);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
      <ul>
        {movieCast !== null && (movieCast.map((cast) => {
          return (
            <li key={cast.id}>
              <img className={css.castImg} src={cast.profile_path ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}` : defaultImg} alt={cast.original_name} />
              <h1>{cast.original_name}</h1>
              <h2>Character: {cast.character}</h2>
            </li>
          )
        }))}
      </ul>
    </div>
  );
};

export default MovieCast;