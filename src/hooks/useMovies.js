import { useState, useEffect } from "react";

export const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Data Fetching effect
  useEffect(() => {
    callback?.();
    const controller = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true);
      setMovies([]);
      setErrorMsg("");

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

  return { movies, isLoading, errorMsg };
};
