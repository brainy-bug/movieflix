import React, { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import Box from "./components/Box";
import WatchedMovieList from "./components/WatchedMovieList";
import MovieList from "./components/MovieList";
import MoviesFound from "./components/MoviesFound";
import Navbar from "./components/Navbar";
import WatchedStats from "./components/WatchedStats";
import StarRating from "./components/StarRating";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

import { tempWatchedData, tempMovieData } from "./data";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("inception");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const openSelectedMovie = (id) =>
    setSelectedId(id === selectedId ? null : id);

  const closeSelectedMovie = () => setSelectedId(null);

  const reset = () => {
    setIsLoading(true);
    setMovies([]);
    setErrorMsg("");
    setSelectedId(null);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      reset();

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_KEY
          }&s=${query}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(() => data.Search);
      } catch (error) {
        setErrorMsg(error.message);
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
  }, [query]);

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
          {!isLoading && !errorMsg && (
            <MovieList data={movies} openSelectedMovie={openSelectedMovie} />
          )}
          {errorMsg && <ErrorMessage message={errorMsg} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              id={selectedId}
              closeSelectedMovie={closeSelectedMovie}
            />
          ) : (
            <>
              <WatchedStats watchedMovies={watched} />
              <WatchedMovieList data={watched} />
            </>
          )}
        </Box>
      </div>
    </>
  );
}
