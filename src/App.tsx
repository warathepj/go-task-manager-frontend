import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Prioritized Task List</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;
