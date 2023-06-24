
const SearchBar = ({ query, handleQuery }) => {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={handleQuery}
    />
  );
};
export default SearchBar;
