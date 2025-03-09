import React, { useState } from 'react';
import { Task } from '../types';
import { Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  const priorityMap: Record<string, number> = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setEditedTask({ ...task });
  };

  const handleSave = () => {
    if (editedTask) {
      onUpdateTask(editedTask);
      setEditingTask(null);
      setEditedTask(null);
    }
  };

  const handleInputChange = (field: keyof Task, value: any) => {
    if (editedTask) {
      if (field === 'dependencies' || field === 'resources' || field === 'subtasks') {
        setEditedTask({
          ...editedTask,
          [field]: value.split(',').map((s: string) => s.trim()).filter(Boolean),
        });
      } else {
        setEditedTask({
          ...editedTask,
          [field]: value,
        });
      }
    }
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
                <li key={task.id} className="bg-gray-100 p-4 rounded shadow relative">
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button 
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      onClick={() => handleEditClick(task)}
                    >
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      onClick={() => onDeleteTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
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

      <Dialog open={editingTask !== null} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editedTask && (
            <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={editedTask.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Deadline</label>
                  <Input
                    type="date"
                    value={editedTask.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Time Required</label>
                  <Input
                    value={editedTask.timeRequired}
                    onChange={(e) => handleInputChange('timeRequired', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select
                    value={editedTask.priority}
                    onValueChange={(value) => handleInputChange('priority', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Urgency (1-5)</label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={editedTask.urgency}
                    onChange={(e) => handleInputChange('urgency', parseInt(e.target.value))}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Dependencies (comma-separated)</label>
                  <Input
                    value={editedTask.dependencies.join(', ')}
                    onChange={(e) => handleInputChange('dependencies', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Resources (comma-separated)</label>
                  <Input
                    value={editedTask.resources.join(', ')}
                    onChange={(e) => handleInputChange('resources', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Subtasks (comma-separated)</label>
                  <Input
                    value={editedTask.subtasks.join(', ')}
                    onChange={(e) => handleInputChange('subtasks', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Group</label>
                  <Input
                    value={editedTask.group || ''}
                    onChange={(e) => handleInputChange('group', e.target.value)}
                  />
                </div>

                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;
