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

export default function App() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState(() =>
    JSON.parse(localStorage.getItem("watched-movies"))
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const openSelectedMovie = (id) =>
    setSelectedId(id === selectedId ? null : id);

  const closeSelectedMovie = () => setSelectedId(null);

  const addWatchedMovie = (movie) => {
    setWatchedMovies([...watchedMovies, movie]);
  };

  const deleteWatchedMovies = (id) => {
    setWatchedMovies(watchedMovies.filter((movie) => movie.imdbID !== id));
  };

  const reset = () => {
    setIsLoading(true);
    setMovies([]);
    setErrorMsg("");
    setSelectedId(null);
  };

  // Data Fetching effect
  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      reset();

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_KEY
          }&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(() => data.Search);
      } catch (error) {
        if (error.name !== "AbortError") setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setErrorMsg("");
      return;
    }

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  // local storage effect
  useEffect(() => {
    localStorage.setItem("watched-movies", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  return (
    <>
      <Navbar>
        <SearchBar
          query={query}
          handleQuery={(e) => setQuery(e.target.value)}
        />
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
