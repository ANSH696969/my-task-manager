'use client';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingTask, setViewingTask] = useState(null); // State for viewing task
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false); // State for modal
  const [confirmDeleteTaskId, setConfirmDeleteTaskId] = useState(null); // Task ID for confirmation

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (taskData) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    fetchTasks();
    toast.success('Task added successfully!'); // Display success notification
  };

  const updateTask = async (taskData) => {
    await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...taskData, id: editingTask._id.toString() }),
    });
    setEditingTask(null);
    fetchTasks();
    toast.info('Task updated successfully!'); // Display update notification
  };

  const deleteTask = async (taskId) => {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId }),
    });
    setShowConfirmDeleteModal(false); // Close modal
    fetchTasks();
  };

  const toggleTaskCompletion = async (taskId) => {
    await fetch('/api/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId }),
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <TaskForm task={editingTask} onSubmit={editingTask ? updateTask : addTask} />

      {/* Search Bar */}
      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-xl font-bold">Task List</h2>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded p-2 text-black dark:text-white dark:bg-gray-700"
        />
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggleComplete={toggleTaskCompletion}
        onEdit={setEditingTask}
        onView={setViewingTask} // View button functionality
        setConfirmDeleteTaskId={setConfirmDeleteTaskId}
        setShowConfirmDeleteModal={setShowConfirmDeleteModal}
      />

      {/* Task View Modal */}
      {viewingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-md">
            <h2 className="text-xl font-bold mb-2">{viewingTask.title}</h2>
            <p className="mb-2">{viewingTask.description}</p>
            <p className="text-sm text-gray-500 mb-2">Due: {new Date(viewingTask.dueDate).toLocaleString()}</p>
            <p className={`text-sm ${viewingTask.completed ? 'text-green-500' : 'text-red-500'}`}>
              {viewingTask.completed ? 'Completed' : 'Incomplete'}
            </p>
            <button onClick={() => setViewingTask(null)} className="w-full mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-md">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this task?</h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  deleteTask(confirmDeleteTaskId);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmDeleteModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
