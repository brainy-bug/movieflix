import React from "react";

import No_Image_Available from "../assets/No_Image_Available.png";

const MovieList = ({ data, openSelectedMovie }) => {
  return (
    <ul className='list list-movies '>
      {data?.map((movie) => (
        <li key={movie.imdbID} onClick={() => openSelectedMovie(movie.imdbID)}>
          <img
            src={movie.Poster === "N/A" ? No_Image_Available : movie.Poster}
            alt={`${movie.Title} poster`}
          />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
