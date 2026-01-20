import { useEffect, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskStats from './components/TaskStats'
import SearchBar from './components/SearchBar'

function App() {
  // Theme state (light / dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  // Apply theme correctly for Tailwind
  useEffect(() => {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    localStorage.setItem('theme', theme)
  }, [theme])


  // Tasks state
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [filter, setFilter] = useState('all')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text) => {
    setTasks([
      ...tasks,
      { id: Date.now(), text, completed: false }
    ])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const editTask = (id, newText) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    )
  }

  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'active'
          ? !task.completed
          : task.completed

    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchText.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900
                    flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800
                      text-gray-900 dark:text-gray-100
                      p-6 rounded-xl shadow-xl
                      w-full max-w-xl transition-all">

        <Header theme={theme} setTheme={setTheme} />

        <TaskForm onAddTask={addTask} />
        <TaskStats tasks={tasks} />

        <SearchBar
          searchText={searchText}
          onSearchChange={setSearchText}
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {['all', 'active', 'completed'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded capitalize transition
                ${filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'}
              `}
            >
              {type}
            </button>
          ))}
        </div>

        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={editTask}
        />
      </div>
    </div>
  )
}

export default App
