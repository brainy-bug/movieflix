import { useState } from "react";

import SearchBar from "./components/SearchBar";
import Box from "./components/Box";
import WatchedMovieList from "./components/WatchedMovieList";
import MovieList from "./components/MovieList";
import MovieRating from "./components/MovieRating";
import MoviesFound from "./components/MoviesFound";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import WatchedStats from "./components/WatchedStats";

import { tempWatchedData, tempMovieData } from "./data";
import StarRating from "./components/StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <Navbar>
        <SearchBar
          query={query}
          handleQuery={(e) => setQuery(e.target.value)}
        />
        <MoviesFound value={movies.length} />
      </Navbar>

      <Main>
        <Box>
          <MovieList data={movies} />
        </Box>

        <Box>
          <WatchedStats>
            <MovieRating
              imdbRating={avgImdbRating}
              userRating={avgUserRating}
              runtime={avgRuntime}
            >
              <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
              </p>
            </MovieRating>
          </WatchedStats>
          <WatchedMovieList data={watched} />
        </Box>
      </Main>
      <StarRating
        maxRating={5}
        messages={["terrible", "bad", "good", "better", "amazing"]}
      />
    </>
  );
}


// 'Space travel is the ultimate adventure! Imagine soaring past the '.