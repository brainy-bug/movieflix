import React from 'react'

const MoviesFound = ({ value }) => {
  return (
    <p className='num-results'>
      Found <strong>{value}</strong> results
    </p>
  );
};

export default MoviesFound;
