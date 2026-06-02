import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

// Define the Task type to match the Rust struct
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

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await invoke<Task[]>('get_all_tasks');
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Ice!</h1>

      <h2>My Tasks</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
            </li>
          ))
        ) : (
          <p>No tasks yet. Add one below!</p>
        )}
      </ul>
    </div>
  );
}

export default App;
