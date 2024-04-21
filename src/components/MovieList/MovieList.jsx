import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movieList }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {Array.isArray(movieList) && location.pathname === '/' && <h1>Trending today</h1>}
      {Array.isArray(movieList) && location.pathname === '/movies' && <h1>Search movies</h1>}
      {Array.isArray(movieList) && movieList.map((movie) => {
        return (
          <li key={movie.id} >
            <Link state={location} to={`/movies/${movie.id}`} className={css.movieName}>
              <h1>{movie.title}</h1>
            </Link>
          </li>
        )
      })}
    </ul>
  );
};
           
export default MovieList;