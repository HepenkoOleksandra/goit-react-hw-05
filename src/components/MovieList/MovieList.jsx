import { Link } from "react-router-dom";

const MovieList = ({movieList}) => {
  return (
      <ul>
        {Array.isArray(movieList) && movieList.map((movie) => {
          return (
              <li key={movie.id} >
              <Link to={`/movies/${movie.id}`}>
              <h1>{movie.title}</h1>
              </Link>
            </li>   
        )})}
      </ul>
  )
}
           
export default MovieList