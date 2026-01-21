import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('')
  const [priority, setPriority] = useState('low')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (taskText.trim() === '') {
      setError('Task cannot be empty')
      return
    }

    onAddTask(taskText, priority, dueDate)

    setTaskText('')
    setPriority('low')
    setDueDate('')
    setError('')
    setSuccess('Task added successfully')

    setTimeout(() => setSuccess(''), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="Enter task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
    </form>
  )
}

export default TaskForm
