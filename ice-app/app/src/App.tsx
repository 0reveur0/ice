import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

// TypeScript interface for a Task
interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  priority: number | null;
  created_at: string;
  updated_at: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  // Function to refresh the list of tasks
  const refreshTasks = () => {
    invoke<Task[]>('get_all_tasks')
      .then(setTasks)
      .catch(console.error);
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    refreshTasks();
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return; // Don't add empty tasks

    invoke('add_task', { 
        title: title,
        description: null, // Or some default value
        dueDate: null, 
        priority: null
     })
      .then(() => {
        setTitle(''); // Clear the input
        refreshTasks(); // Refresh the list
      })
      .catch(console.error);
  };

  return (
    <div className="container">
      <h1>ICE - Your Cool Task Manager</h1>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add Task</button>
      </form>

      <h2>My Tasks</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))
        ) : (
          <li>No tasks yet. Add one!</li>
        )}
      </ul>
    </div>
  );
}

export default App;
