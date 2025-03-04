import React, { useState } from 'react';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [timeRequired, setTimeRequired] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [urgency, setUrgency] = useState<number>(3);
  const [dependencies, setDependencies] = useState('');
  const [resources, setResources] = useState('');
  const [subtasks, setSubtasks] = useState('');
  const [group, setGroup] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: uuidv4(),
      description,
      deadline,
      timeRequired,
      priority,
      urgency,
      dependencies: dependencies.split(',').map(s => s.trim()).filter(Boolean),
      resources: resources.split(',').map(s => s.trim()).filter(Boolean),
      subtasks: subtasks.split(',').map(s => s.trim()).filter(Boolean),
      group: group.trim() ? group.trim() : undefined,
    };
    onAddTask(newTask);

    // Reset form
    setDescription('');
    setDeadline('');
    setTimeRequired('');
    setPriority('Medium');
    setUrgency(3);
    setDependencies('');
    setResources('');
    setSubtasks('');
    setGroup('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Task Description
        </label>
        <input
          type="text"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Group (optional)</label>
        <input
          type="text"
          placeholder="e.g., Work, Personal"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Time Required</label>
          <input
            type="text"
            placeholder="e.g., 2h, 30m"
            value={timeRequired}
            onChange={(e) => setTimeRequired(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Urgency (1-5)</label>
          <input
            type="number"
            value={urgency}
            min={1}
            max={5}
            onChange={(e) => setUrgency(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Dependencies (comma separated)</label>
        <input
          type="text"
          placeholder="e.g., Task A, Task B"
          value={dependencies}
          onChange={(e) => setDependencies(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Resources (comma separated)</label>
        <input
          type="text"
          placeholder="e.g., Laptop, Software"
          value={resources}
          onChange={(e) => setResources(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Subtasks (comma separated)</label>
        <input
          type="text"
          placeholder="e.g., Subtask 1, Subtask 2"
          value={subtasks}
          onChange={(e) => setSubtasks(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
