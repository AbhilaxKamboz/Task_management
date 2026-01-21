import { useEffect, useState } from 'react'

// Custom hook to manage tasks
export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  // Persist tasks
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Add task with priority & due date
  const addTask = (text, priority, dueDate) => {
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false,
        priority,
        dueDate,
      },
    ])
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const editTask = (id, newText) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    )
  }

  // ✅ Drag & Drop reorder
  const reorderTasks = (newTasks) => {
    setTasks(newTasks)
  }

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    reorderTasks,
    setTasks,
  }
}
