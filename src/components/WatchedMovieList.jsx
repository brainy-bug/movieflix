import MovieRating from "./MovieRating";

const WatchedMovieList = ({ data }) => {
  return (
    <ul className='list'>
      {data.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <MovieRating
            imdbRating={movie.imdbRating}
            userRating={movie.userRating}
            runtime={movie.runtime}
          />
        </li>
      ))}
    </ul>
  );
};


export default WatchedMovieList;
