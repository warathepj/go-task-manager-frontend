import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';
import { api } from './lib/api';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await api.getTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const newTask = await api.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      setError(null);
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const updatedTask = await api.updateTask(task);
      setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
      setError(null);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Prioritized Task List</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
    </div>
  );
};

export default App;
