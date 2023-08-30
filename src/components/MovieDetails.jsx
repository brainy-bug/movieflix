import React, { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

import No_Image_Available from "../assets/No_Image_Available.png";
import ErrorMessage from "./ErrorMessage";
import useKey from "../hooks/useKey";

const MovieDetails = ({
  id,
  closeSelectedMovie,
  addWatchedMovie,
  watchedMovies,
  deleteWatchedMovies,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userRating, setUserRating] = useState(0);

  const counterRef = useRef(0);

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

  // Add movie to watched list
  const handleAddWatchedMovie = () => {
    const newWatchedMovie = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countingRateDecisions: counterRef.current,
    };

    addWatchedMovie(newWatchedMovie);
    closeSelectedMovie();
  };

  // Delete movie from watched list
  const delWatchedMovie = () => {
    deleteWatchedMovies(id);
    closeSelectedMovie();
  };

  // Check if movie is already in watched list
  const isWatched = watchedMovies.map((movie) => movie.imdbID).includes(id);

  // Get user rating for watched movie
  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === id
  )?.userRating;

  // Close movie details on Escape key press
  useKey("Escape", closeSelectedMovie);

  // Data Fetching effect
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
        setErrorMsg("Whoops! check your internet connection.");
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  // Page title effect
  useEffect(() => {
    if (!title) return;
    document.title = `${title} - MovieFlix`;

    return () => (document.title = "Home - MovieFlix");
  }, [title]);

  // User rating effect
  useEffect(() => {
    if (userRating) counterRef.current++;
  }, [userRating]);

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
                defaultRating={watchedUserRating}
              />
              {userRating > 0 && !isWatched && (
                <button className='btn-add' onClick={handleAddWatchedMovie}>
                  + Add to list
                </button>
              )}

              {isWatched && (
                <button className='btn-del' onClick={delWatchedMovie}>
                  Remove from list
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
