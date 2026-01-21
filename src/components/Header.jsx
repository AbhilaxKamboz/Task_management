import { Sun, Moon } from 'lucide-react'

function Header({ theme, setTheme }) {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold tracking-wide">
        Task Manager
      </h1>

      <button
        onClick={() =>
          setTheme(theme === 'light' ? 'dark' : 'light')
        }
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700
                   hover:scale-105 transition"
        title="Toggle theme"
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </header>
  )
}

export default Header
