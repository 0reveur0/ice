import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import AmbientSoundMixer from './components/AmbientSoundMixer'; // Import the new component

interface Task {
  id: number;
  title: string;
  description: string | null;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
    <div className="flex h-screen bg-background text-text">
      {/* Sidebar - Cột 1 */}
      <aside className="w-64 p-4 border-r border-border">
        <h1 className="text-2xl font-bold text-primary">Ice</h1>
        {/* Navigation items can go here */}
      </aside>

      {/* Main Content - Cột 2 */}
      <main className="flex-1 p-8">
        <div 
          className="bg-card-background backdrop-blur-md border border-border rounded-lg p-6 shadow-sm"
          style={{ backdropFilter: 'blur(12px)' }} // Ensure blur effect
        >
          <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
          <ul>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li key={task.id} className="p-2 border-b border-border">
                  <strong className="text-primary">{task.title}</strong>
                  <p className="text-sm">{task.description}</p>
                </li>
              ))
            ) : (
              <p>No tasks yet.</p>
            )}
          </ul>
        </div>
      </main>

      {/* Details/Context - Cột 3 */}
      <aside className="w-80 p-4 border-l border-border">
        <div className="space-y-6">
           <AmbientSoundMixer />
          {/* Other context-specific details can go here */}
        </div>
      </aside>
    </div>
  );
}

export default App;
