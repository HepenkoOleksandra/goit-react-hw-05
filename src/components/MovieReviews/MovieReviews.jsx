import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../apiService/movies";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await getMovieReviews(movieId);
        setMovieReviews(data);
        console.log(data);
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
      <ul>
        {(Array.isArray(movieReviews) && movieReviews.length > 0) ? (movieReviews.map((review) => {
          return (
            <li key={review.id}>
              <h1>Author: {review.author}</h1>
              <p>{review.content}</p>
            </li>
          )
        })) : (<p>We don`t have any reviews for this movie.</p>)}
      </ul>
    </div>
  );
};

export default MovieReviews;