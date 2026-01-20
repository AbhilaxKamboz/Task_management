// TaskStats shows summary of tasks (total, completed, pending)

function TaskStats({ tasks }) {
    // Derived values from tasks state
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.completed).length
    const pendingTasks = totalTasks - completedTasks

    return (
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
                <p className="text-lg font-bold">{totalTasks}</p>
            </div>

            <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
                <p className="text-lg font-bold">{completedTasks}</p>
            </div>

            <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-300">Pending</p>
                <p className="text-lg font-bold">{pendingTasks}</p>
            </div>
        </div>

    )
}

export default TaskStats
