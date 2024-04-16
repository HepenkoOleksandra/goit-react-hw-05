import { Link, Routes, Route, useParams } from "react-router-dom"
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../apiService/movies";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { FaLongArrowAltLeft } from "react-icons/fa";


const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

async function fetchMovieDetails() {
  setIsError(false);
      setIsLoading(true);
  try {
    const data = await getMovieDetails(movieId);
    setMovieDetails(data);
    console.log(data);
  } catch (error) {
    setIsError(error.message);
  } finally {
    setIsLoading(false);
  }
}
    fetchMovieDetails();
  }, [movieId])

  return (
    <div>
      {isLoading && <Loader/>}
      {isError && <ErrorMessage/>}
      <Link to="/movies"><FaLongArrowAltLeft />Go back</Link>
      {movieDetails !== null && (
        <div>
          <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.original_title} />
          <div>
            <h1>{movieDetails.original_title}</h1>
            <p>User Score: {movieDetails.vote_average}</p>
            <h2>Overview
              <p>{movieDetails.overview}</p>
            </h2>
            <h3>Genres
              <p>{movieDetails.genres.map((gener) => {return gener.name})}</p>
            </h3>
          </div>
        </div>
      )}
      <div>
        <p>Additional information</p>
 <Link to='cast'>Cast</Link>
      <Link to='reviews'>Reviews</Link>
      <Routes >
        <Route path="cast" element={<MovieCast/>} />
        <Route path="reviews" element={<MovieReviews/>} />
      </Routes>
      </div>
     
    </div>
  )
}

export default MovieDetailsPage