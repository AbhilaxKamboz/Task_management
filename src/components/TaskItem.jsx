import { useState } from 'react'
import { Trash2, Edit2, CheckCircle, GripVertical } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Single draggable task item
function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  // Drag & drop hook
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date()

  const handleSave = () => {
    if (editText.trim() === '') return
    onEdit(task.id, editText)
    setIsEditing(false)
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 rounded-xl border
        bg-white dark:bg-gray-700
        shadow-sm hover:shadow-md transition`}
    >
      <div className="flex items-center gap-2">

        {/* 🔹 DRAG HANDLE ONLY */}
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400"
          title="Drag"
        >
          <GripVertical size={18} />
        </span>

        {/* 🔹 TASK TEXT / EDIT MODE */}
        <div className="flex-1">
          {isEditing ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave()
                if (e.key === 'Escape') setIsEditing(false)
              }}
              className="w-full border rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <p
              onClick={() => onToggle(task.id)}
              className={`cursor-pointer break-words
                ${task.completed && 'line-through text-gray-400'}`}
            >
              {task.text}
            </p>
          )}

          {/* 🔹 META INFO */}
          <div className="flex gap-2 mt-1 items-center">
            <span className={`text-xs px-2 rounded
              ${task.priority === 'high' && 'bg-red-500 text-white'}
              ${task.priority === 'medium' && 'bg-yellow-400'}
              ${task.priority === 'low' && 'bg-green-500 text-white'}
            `}>
              {task.priority}
            </span>

            <span className={`text-xs
              ${isOverdue ? 'text-red-500' : 'text-gray-500'}
            `}>
              {task.dueDate || 'No date'}
            </span>
          </div>
        </div>

        {/* 🔹 ACTION BUTTONS */}
        <div className="flex gap-2">
          {isEditing ? (
            <button onClick={handleSave} title="Save">
              <CheckCircle size={18} className="text-green-600" />
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} title="Edit">
              <Edit2 size={18} />
            </button>
          )}

          <button onClick={() => onDelete(task)} title="Delete">
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskItem
