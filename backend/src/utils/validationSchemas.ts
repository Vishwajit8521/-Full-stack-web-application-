import { z } from 'zod';

// Task creation schema
export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().optional(),
    completed: z.boolean().optional().default(false),
    category: z.string().optional(),
  }),
});

// Task update schema
export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().or(z.number()).transform(Number),
  }),
  body: z.object({
    title: z.string().min(1, 'Title is required').max(255).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    category: z.string().optional(),
  }).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  }),
});

// Task deletion schema
export const deleteTaskSchema = z.object({
  params: z.object({
    id: z.string().or(z.number()).transform(Number),
  }),
});

// Task get by ID schema
export const getTaskSchema = z.object({
  params: z.object({
    id: z.string().or(z.number()).transform(Number),
  }),
});

// Gemini task generation schema
export const generateTasksSchema = z.object({
  body: z.object({
    topic: z.string().min(1, 'Topic is required').max(255),
  }),
});