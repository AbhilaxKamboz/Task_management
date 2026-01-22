import { useCallback, useMemo, useState, useEffect } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskStats from './components/TaskStats'
import SearchBar from './components/SearchBar'
import Toast from './components/Tos'
import ConfirmModal from './components/ConfirmModal'
import { useTasks } from './hooks/useTasks'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, setTheme } = useTheme()
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    reorderTasks,
    setTasks,
  } = useTasks()

  const [filter, setFilter] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [deletedTask, setDeletedTask] = useState(null)
  const [confirmTask, setConfirmTask] = useState(null)

  // Request delete (confirmation modal)
  const requestDelete = (task) => {
    setConfirmTask(task)
  }

  // Confirm delete
  const confirmDelete = () => {
    setDeletedTask(confirmTask)
    deleteTask(confirmTask.id)
    setConfirmTask(null)
  }

  // Undo delete
  const undoDelete = () => {
    setTasks(prev => [...prev, deletedTask])
    setDeletedTask(null)
  }

  // Filter + search
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
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
  }, [tasks, filter, searchText])

  // Ask browser notification permission on app load
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600
  dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center p-4">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-xl">
        <Header theme={theme} setTheme={setTheme} />

        <TaskForm onAddTask={addTask} />
        <TaskStats tasks={tasks} />

        <SearchBar
          searchText={searchText}
          onSearchChange={setSearchText}
        />

        <div className="flex gap-2 justify-center mb-4">
          {['all', 'active', 'completed'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded transition
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
          onDelete={requestDelete}
          onToggle={toggleTask}
          onEdit={editTask}
          onReorder={reorderTasks}
        />

        {confirmTask && (
          <ConfirmModal
            message="Are you sure you want to delete this task?"
            onConfirm={confirmDelete}
            onCancel={() => setConfirmTask(null)}
          />
        )}

        {deletedTask && (
          <Toast
            message="Task deleted"
            onUndo={undoDelete}
            onClose={() => setDeletedTask(null)}
          />
        )}
      </div>
    </div>
  )
}

export default App
