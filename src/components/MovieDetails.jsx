import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

import No_Image_Available from "../assets/No_Image_Available.png";
import ErrorMessage from "./ErrorMessage";

const MovieDetails = ({ id, closeSelectedMovie, addWatchedMovie }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userRating, setUserRating] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleAddWatchedMovie = () => {
    const newWatchedMovie = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    addWatchedMovie(newWatchedMovie);
    closeSelectedMovie();
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_KEY
          }&i=${id}`
        );
        const data = await res.json();

        setMovie(data);
      } catch (error) {
        console.log(error);
        setErrorMsg("Whoops! Something went wrong, try reloading.");
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  return (
    <>
      {isLoading && <Loader />}
      {errorMsg && <ErrorMessage message={errorMsg} />}
      {!isLoading && !errorMsg && (
        <div className='details'>
          <header>
            <button className='btn-back' onClick={() => closeSelectedMovie()}>
              &larr;
            </button>
            <img
              src={poster === "N/A" ? No_Image_Available : poster}
              alt={`Poster of ${title}`}
            />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating === "N/A" ? 0 : imdbRating} IMDB
                rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              <StarRating
                size={36}
                maxRating={10}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className='btn-add' onClick={handleAddWatchedMovie}>
                  + Add to list
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>
              <strong>Directed by: {director}</strong>
            </p>
          </section>
        </div>
      )}
    </>
  );
};
export default MovieDetails;
