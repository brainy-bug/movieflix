const MovieRating = ({ imdbRating, userRating, runtime, children }) => {
  return (
    <div>
      {children}
      <p>
        <span>⭐️</span>
        <span>{imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{runtime} min</span>
      </p>
    </div>
  );
};

export default MovieRating;
