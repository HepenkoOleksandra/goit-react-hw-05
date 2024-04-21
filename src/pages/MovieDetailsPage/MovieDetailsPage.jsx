import { Link, Routes, Route, useParams, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { getMovieDetails } from "../../services/moviesAPI";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { defaultImg } from "../../services/defaultImg";
import css from "./MovieDetailsPage.module.css"

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
    if (!movieId) return;
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
    <div className={css.movieContainer}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
      <Link to={backLinkRef.current}><FaLongArrowAltLeft />Go back</Link>
      {movieDetails !== null && (
        <div className={css.movieDetails}>
          <img src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` : defaultImg}
            alt={movieDetails.original_title} />
          <div className={css.details}>
            <h1>{movieDetails.original_title}</h1>
            <p>User Score: {movieDetails.vote_average}</p>
            <h2>Overview
              <p>{movieDetails.overview}</p>
            </h2>
            <h3>Genres
              <ul>{movieDetails.genres.map((gener) => {
                return (
                  <li key={gener.id}>{gener.name}</li>)
              })}
              </ul>
            </h3>
          </div>
        </div>
      )}
      <div>
        <p>Additional information</p>
        <div className={css.additionalInformation}>
          <Link to='cast'>Cast</Link>
          <Link to='reviews'>Reviews</Link>
        </div>
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