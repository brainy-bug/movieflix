import React from "react";

const WatchedMovieList = ({ data, setSelectedId }) => {
  return (
    <ul className='list list-movies list-watched'>
      {data.map((movie) => (
        <li key={movie.imdbID} onClick={() => setSelectedId(movie.imdbID)}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WatchedMovieList;
