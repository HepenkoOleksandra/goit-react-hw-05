

const Movies = ({movie}) => {
  return (
      <>
          <h1>Title: {movie.title}</h1>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.original_title} />
              <p>Description: {movie.overview}</p>
    </>
  )
}

export default Movies