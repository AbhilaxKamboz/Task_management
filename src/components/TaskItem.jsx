import { useState } from 'react'

// TaskItem shows a single task

function TaskItem({ task, onDelete, onToggle, onEdit }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.text)

    const handleEditSave = () => {
        if (editText.trim() === '') return
        onEdit(task.id, editText)
        setIsEditing(false)
    }

    return (
        <div
            className={`flex flex-col sm:flex-row gap-2 p-3 border rounded
  transition-all duration-200
  ${task.completed
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-white dark:bg-gray-700'}
`}
        >
            {isEditing ? (
                <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                />
            ) : (
                <span
                    onClick={() => onToggle(task.id)}
                    className={`flex-1 cursor-pointer break-words
            ${task.completed ? 'line-through text-gray-500' : ''}
          `}
                >
                    {task.text}
                </span>
            )}

            <div className="flex gap-2 justify-end">
                {isEditing ? (
                    <button onClick={handleEditSave} className="text-green-600">
                        Save
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="text-blue-600">
                        Edit
                    </button>
                )}

                <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-500"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskItem
