import { useState } from 'react'

// TaskForm is used to add a new task

function TaskForm({ onAddTask }) {
  // State for input value
  const [taskText, setTaskText] = useState('')

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // Prevent empty task
    if (taskText.trim() === '') return

    // Send task text to parent (App.jsx)
    onAddTask(taskText)

    // Clear input
    setTaskText('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mb-4"
    >
      <input
        type="text"
        placeholder="Enter your task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded
                   hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>
  )
}

export default TaskForm
