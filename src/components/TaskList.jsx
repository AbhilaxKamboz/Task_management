import TaskItem from './TaskItem'

// TaskList displays all tasks

function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No tasks found
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}  
        />
      ))}
    </div>
  )
}

export default TaskList
