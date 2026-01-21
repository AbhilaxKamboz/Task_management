// Confirmation modal for delete action

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl
                      w-80 text-center">
        <p className="mb-4 text-gray-800 dark:text-gray-200">
          {message}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-1 rounded bg-gray-300 dark:bg-gray-600"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-1 rounded bg-red-600 text-white"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
