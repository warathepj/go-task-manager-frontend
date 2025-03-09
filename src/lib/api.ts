import { Task } from '@/types';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  async updateTask(task: Task): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  }
};