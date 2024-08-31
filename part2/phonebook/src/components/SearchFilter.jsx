const SearchFilter = ({ searchQuery, onSearchQueryChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input type="text" value={searchQuery} onChange={onSearchQueryChange} />
    </div>
  );
};

export default SearchFilter;
