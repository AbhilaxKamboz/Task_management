import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import TaskItem from './TaskItem'

// Task list with drag & drop
function TaskList({ tasks, onDelete, onToggle, onEdit, onReorder, onToggleReminder }) {

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = tasks.findIndex(t => t.id === active.id)
    const newIndex = tasks.findIndex(t => t.id === over.id)

    onReorder(arrayMove(tasks, oldIndex, newIndex))
  }

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks found</p>
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
              onToggleReminder={onToggleReminder}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default TaskList
