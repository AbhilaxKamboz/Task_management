function Header({ theme, setTheme }) {
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold">
        Task Management App
      </h1>

      <button
        onClick={() =>
          setTheme(theme === 'light' ? 'dark' : 'light')
        }
        className="px-3 py-1 rounded text-sm
                   bg-gray-200 dark:bg-gray-700 transition"
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  )
}

export default Header
