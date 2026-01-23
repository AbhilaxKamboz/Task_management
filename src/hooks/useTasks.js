import { useEffect, useRef, useState } from 'react'

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

  // Re-schedule reminders on page reload
  useEffect(() => {
  tasks.forEach(task => {
    if (task.reminderEnabled) {
      scheduleReminder(task)
    }
  })
}, [])

  // Schedule due date reminder
const scheduleReminder = (task) => {
  //  Reminder OFF or no due date
  if (!task.dueDate || !task.reminderEnabled) return

  const dueTime = new Date(task.dueDate).getTime()
  const now = Date.now()
  const delay = dueTime - now

  if (delay <= 0) return

  const timeoutId = setTimeout(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('⏰ Task Due Now', {
        body: task.text,
      })
    }
  }, delay)

  reminderTimers.current[task.id] = timeoutId
}

  // Add task with priority & due date
  const addTask = (text, priority, dueDate) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      dueDate,
      reminderEnabled: true,
    }

    setTasks(prev => [...prev, newTask])

    //  Instant notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Task Added ✅', {
        body: text,
      })
    }

    //  Schedule due date reminder
    scheduleReminder(newTask)
  }

  // Store reminder timers (taskId -> timeoutId)
  const reminderTimers = useRef({})

  const deleteTask = (id) => {
    // Clear reminder if exists
    if (reminderTimers.current[id]) {
      clearTimeout(reminderTimers.current[id])
      delete reminderTimers.current[id]
    }

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

  // Toggle reminder ON / OFF
const toggleReminder = (id) => {
  setTasks(prev =>
    prev.map(task => {
      if (task.id !== id) return task

      const updatedTask = {
        ...task,
        reminderEnabled: !task.reminderEnabled,
      }

      // Clear existing reminder
      if (reminderTimers.current[id]) {
        clearTimeout(reminderTimers.current[id])
        delete reminderTimers.current[id]
      }

      // Re-schedule if turned ON
      if (updatedTask.reminderEnabled) {
        scheduleReminder(updatedTask)
      }

      return updatedTask
    })
  )
}

  //  Drag & Drop reorder
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
    toggleReminder,
    setTasks,
  }
}
