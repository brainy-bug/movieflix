import React from "react";

const WatchedMovieList = ({ data, openSelectedMovie, deleteWatchedMovie }) => {

  const handleClick = (e) => {
    if (e.target.className === "btn-delete")
      deleteWatchedMovie(e.target.closest("li").id);
    else openSelectedMovie(e.target.closest("li").id);
  };

  return (
    <ul className='list list-movies list-watched'>
      {data.map((movie) => (
        <li
          id={movie.imdbID}
          key={movie.imdbID}
          onClick={handleClick}
          className='single-movie'
        >
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
          <button className='btn-delete'>X</button>
        </li>
      ))}
    </ul>
  );
};

export default WatchedMovieList;
