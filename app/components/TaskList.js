import { FaEye, FaEdit, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

export default function TaskList({
  tasks,
  onDelete,
  onToggleComplete,
  onEdit,
  onView,
  setConfirmDeleteTaskId, // Add this
  setShowConfirmDeleteModal, // Add this
}) {
  return (
    <div className="w-full">
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`p-4 rounded-lg shadow-md ${
              task.completed
                ? 'border-l-4 border-green-500 dark:border-green-400'
                : 'border-l-4 border-red-500 dark:border-red-400'
            } bg-white dark:bg-gray-800`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-black dark:text-white">{task.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Due: {new Date(task.dueDate).toLocaleString()}
                </p>
                <p
                  className={`text-sm ${
                    task.completed ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                  }`}
                >
                  {task.completed ? 'Completed' : 'Incomplete'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onView(task)}
                  className="px-3 py-1 text-sm text-purple-500 dark:text-purple-400 border border-purple-500 dark:border-purple-400 rounded hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors flex items-center gap-2"
                >
                  <FaEye /> View
                </button>
                <button
                  onClick={() => onEdit(task)}
                  className="px-3 py-1 text-sm text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors flex items-center gap-2"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => onToggleComplete(task._id)}
                  className="px-3 py-1 text-sm text-yellow-500 dark:text-yellow-400 border border-yellow-500 dark:border-yellow-400 rounded hover:bg-yellow-50 dark:hover:bg-yellow-900 transition-colors flex items-center gap-2"
                >
                  {task.completed ? <FaTimes /> : <FaCheck />}
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => {
                    setConfirmDeleteTaskId(task._id);
                    setShowConfirmDeleteModal(true);
                  }}
                  className="px-3 py-1 text-sm text-red-500 dark:text-red-400 border border-red-500 dark:border-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900 transition-colors flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
