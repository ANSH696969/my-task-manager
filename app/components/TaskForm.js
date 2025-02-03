import { useState, useEffect } from 'react';

export default function TaskForm({ task, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, completed });
    setTitle('');
    setDescription('');
    setDueDate('');
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-lg mx-auto w-full">
      <h2 className="text-xl font-bold mb-4 text-center">{task ? 'Edit Task' : 'Add Task'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full p-2 mb-2 border border-gray-300 rounded text-black dark:text-white dark:bg-gray-700"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="w-full p-2 mb-2 border border-gray-300 rounded text-black dark:text-white dark:bg-gray-700"
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded text-black dark:text-white dark:bg-gray-700"
      />
      <label className="inline-flex items-center mb-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
          className="mr-2"
        />
        Completed
      </label>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
