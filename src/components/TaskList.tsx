import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const priorityMap: Record<string, number> = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  // Sort tasks by priority and urgency
  const sortedTasks = [...tasks].sort((a, b) => {
    if (priorityMap[b.priority] !== priorityMap[a.priority]) {
      return priorityMap[b.priority] - priorityMap[a.priority];
    }
    return b.urgency - a.urgency;
  });

  // Group tasks by group name (or “Ungrouped”)
  const groups = sortedTasks.reduce((acc: { [key: string]: Task[] }, task) => {
    const groupName = task.group || 'Ungrouped';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(task);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Task List</h2>
      {Object.keys(groups).length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        Object.entries(groups).map(([groupName, groupTasks]) => (
          <div key={groupName} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{groupName}</h3>
            <ul className="space-y-4">
              {groupTasks.map(task => (
                <li key={task.id} className="bg-gray-100 p-4 rounded shadow">
                  <h4 className="text-md font-semibold">{task.description}</h4>
                  <p>Deadline: {task.deadline}</p>
                  <p>Time Required: {task.timeRequired}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Urgency: {task.urgency}</p>
                  {task.dependencies.length > 0 && <p>Dependencies: {task.dependencies.join(', ')}</p>}
                  {task.resources.length > 0 && <p>Resources: {task.resources.join(', ')}</p>}
                  {task.subtasks.length > 0 && <p>Subtasks: {task.subtasks.join(', ')}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
