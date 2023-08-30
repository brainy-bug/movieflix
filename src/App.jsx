import React, { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import Box from "./components/Box";
import WatchedMovieList from "./components/WatchedMovieList";
import MovieList from "./components/MovieList";
import MoviesFound from "./components/MoviesFound";
import Navbar from "./components/Navbar";
import WatchedStats from "./components/WatchedStats";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watchedMovies, setWatchedMovies] = useLocalStorageState(
    "watched-movies",
    []
  );

  const openSelectedMovie = (id) =>
    setSelectedId(id === selectedId ? null : id);

  const closeSelectedMovie = () => setSelectedId(null);

  const addWatchedMovie = (movie) => {
    setWatchedMovies([...watchedMovies, movie]);
  };

  const deleteWatchedMovies = (id) => {
    setWatchedMovies(watchedMovies.filter((movie) => movie.imdbID !== id));
  };

  const { movies, isLoading, errorMsg } = useMovies(query, closeSelectedMovie);

  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        <MoviesFound value={movies.length || 0} />
      </Navbar>

      <div className='main'>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !errorMsg && query.length < 3 && (
            <p className='msg'>
              Enter any 3 keywords to start searching for your favorite movie 🎬
            </p>
          )}
          {!isLoading && !errorMsg && (
            <MovieList data={movies} openSelectedMovie={openSelectedMovie} />
          )}
          {errorMsg && <ErrorMessage message={errorMsg} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              closeSelectedMovie={closeSelectedMovie}
              addWatchedMovie={addWatchedMovie}
              watchedMovies={watchedMovies}
              deleteWatchedMovies={deleteWatchedMovies}
            />
          ) : (
            <>
              <WatchedStats watchedMovies={watchedMovies} />
              <WatchedMovieList
                data={watchedMovies}
                openSelectedMovie={openSelectedMovie}
                deleteWatchedMovie={deleteWatchedMovies}
              />
            </>
          )}
        </Box>
      </div>
    </>
  );
}
