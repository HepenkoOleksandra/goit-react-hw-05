import { Link, Routes, Route, useParams, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { getMovieDetails } from "../../apiService/movies";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../../components/MovieReviews/MovieReviews"));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
      <Link to={backLinkRef.current}><FaLongArrowAltLeft />Go back</Link>
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
              <p>{movieDetails.genres.map((gener) => { return gener.name })}</p>
            </h3>
          </div>
        </div>
      )}
      <div>
        <p>Additional information</p>
        <Link to='cast'>Cast</Link>
        <Link to='reviews'>Reviews</Link>
        <Suspense fallback={<Loader />}>
          <Routes >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;