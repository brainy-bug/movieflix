import React, { useRef, useEffect } from "react";

const SearchBar = ({ query, handleQuery }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") inputEl.current.focus();
    };

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, []);

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={handleQuery}
      ref={inputEl}
    />
  );
};
export default SearchBar;
