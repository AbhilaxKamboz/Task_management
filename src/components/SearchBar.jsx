import { Search } from 'lucide-react'

function SearchBar({ searchText, onSearchChange }) {
  return (
    <div className="relative mb-4">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-3 py-2 rounded-lg border
                   focus:ring-2 focus:ring-blue-500 outline-none
                   dark:bg-gray-700"
      />
    </div>
  )
}

export default SearchBar
