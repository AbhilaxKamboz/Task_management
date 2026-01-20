// SearchBar allows user to search tasks by text

function SearchBar({ searchText, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full mb-3 px-3 py-2 border rounded
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}

export default SearchBar
