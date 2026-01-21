// Toast notification with Undo action

function Toast({ message, onUndo, onClose }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2
                    bg-gray-800 text-white px-4 py-2 rounded
                    flex items-center gap-4 shadow-lg">
      <span>{message}</span>

      <button
        onClick={onUndo}
        className="text-blue-400 hover:underline"
      >
        Undo
      </button>

      <button onClick={onClose}>✖</button>
    </div>
  )
}

export default Toast
