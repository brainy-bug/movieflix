import React from 'react'

// import MovieRating from "./MovieRating";

const WatchedMovieList = ({ data }) => {
  return (
    <ul className='list'>
      {data.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
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
            <span>{movie.runtime } min</span>
          </p>
          {/* <MovieRating
            imdbRating={movie.imdbRating}
            userRating={movie.userRating}
            runtime={movie.runtime}
          /> */}
        </li>
      ))}
    </ul>
  );
};


export default WatchedMovieList;
