import { useEffect, useRef, useState } from 'react'

// Custom hook to manage tasks
export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  // Store reminder timers (taskId -> timeoutId)
  const reminderTimers = useRef({})

  // Persist tasks
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Schedule due date reminder
  const scheduleReminder = (task) => {
  if (!task.dueDate || !task.reminderEnabled) return

  // 🔥 CLEAR OLD TIMER FIRST
  if (reminderTimers.current[task.id]) {
    clearTimeout(reminderTimers.current[task.id])
  }

  const dueTime = new Date(task.dueDate).getTime()
  const delay = dueTime - Date.now()
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

  // Re-schedule reminders on page reload
  useEffect(() => {
    tasks.forEach(task => {
      if (task.reminderEnabled) {
        scheduleReminder(task)
      }
    })
  }, [tasks])

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
