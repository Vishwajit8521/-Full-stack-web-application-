import axios from 'axios';
import { auth } from '@clerk/nextjs/server'; // ✅ Correct import for server-side token

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  try {
    const { getToken } = auth(); // ✅ Use `auth()` to get token on server side
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    // Error getting auth token
  }
  return config;
});

// Task types
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  completed?: boolean;
  category?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
  category?: string;
}

// Task API
export const TaskAPI = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/api/tasks');
    return response.data.data.tasks;
  },

  // Get single task
  getTask: async (id: number): Promise<Task> => {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data.data.task;
  },

  // Create a new task
  createTask: async (task: CreateTaskInput): Promise<Task> => {
    const response = await api.post('/api/tasks', task);
    return response.data.data.task;
  },

  // Update task
  updateTask: async (id: number, task: UpdateTaskInput): Promise<Task> => {
    const response = await api.patch(`/api/tasks/${id}`, task);
    return response.data.data.task;
  },

  // Delete task
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/api/tasks/${id}`);
  },

  // Create multiple tasks
  createMultipleTasks: async (tasks: CreateTaskInput[]): Promise<Task[]> => {
    const response = await api.post('/api/tasks/bulk', { tasks });
    return response.data.data.tasks;
  },
};

// Gemini Task Generator
export interface GeneratedTask {
  title: string;
}

export const GeminiAPI = {
  generateTasks: async (topic: string): Promise<GeneratedTask[]> => {
    const response = await api.post('/api/gemini/generate-tasks', { topic });
    return response.data.data.tasks;
  },
};

export default api;
