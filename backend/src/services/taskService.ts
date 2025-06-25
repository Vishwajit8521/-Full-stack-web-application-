import { eq, and } from 'drizzle-orm';
import { db } from '../config/database';
import { tasks } from '../models/schema';
import { AppError } from '../middleware/errorHandler';

interface TaskInput {
  title: string;
  description?: string;
  completed?: boolean;
  category?: string;
}

export class TaskService {
  /**
   * Create a new task for a user
   */
  static async createTask(userId: string, taskData: TaskInput) {
    try {
      const result = await db.insert(tasks).values({
        userId,
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed || false,
        category: taskData.category,
      }).returning();

      return result[0];
    } catch (error) {
      // Error creating task
      throw new AppError('Failed to create task', 500);
    }
  }

  /**
   * Get all tasks for a user
   */
  static async getTasks(userId: string) {
    try {
      return await db.select().from(tasks).where(eq(tasks.userId, userId));
    } catch (error) {
      // Error fetching tasks
      throw new AppError('Failed to fetch tasks', 500);
    }
  }

  /**
   * Get a task by ID for a user
   */
  static async getTaskById(userId: string, taskId: number) {
    try {
      const result = await db.select()
        .from(tasks)
        .where(
          and(
            eq(tasks.id, taskId),
            eq(tasks.userId, userId)
          )
        );

      if (result.length === 0) {
        throw new AppError('Task not found', 404);
      }

      return result[0];
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      // Error fetching task
      throw new AppError('Failed to fetch task', 500);
    }
  }

  /**
   * Update a task for a user
   */
  static async updateTask(userId: string, taskId: number, taskData: Partial<TaskInput>) {
    try {
      // First check if the task exists and belongs to the user
      await this.getTaskById(userId, taskId);

      const result = await db.update(tasks)
        .set({
          ...taskData,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(tasks.id, taskId),
            eq(tasks.userId, userId)
          )
        )
        .returning();

      return result[0];
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      // Error updating task
      throw new AppError('Failed to update task', 500);
    }
  }

  /**
   * Delete a task for a user
   */
  static async deleteTask(userId: string, taskId: number) {
    try {
      // First check if the task exists and belongs to the user
      await this.getTaskById(userId, taskId);

      await db.delete(tasks)
        .where(
          and(
            eq(tasks.id, taskId),
            eq(tasks.userId, userId)
          )
        );

      return { success: true };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      // Error deleting task
      throw new AppError('Failed to delete task', 500);
    }
  }

  /**
   * Create multiple tasks for a user
   */
  static async createMultipleTasks(userId: string, tasksData: TaskInput[]) {
    try {
      const tasksToInsert = tasksData.map(task => ({
        userId,
        title: task.title,
        description: task.description,
        completed: task.completed || false,
        category: task.category,
      }));

      const result = await db.insert(tasks).values(tasksToInsert).returning();
      return result;
    } catch (error) {
      // Error creating multiple tasks
      throw new AppError('Failed to create tasks', 500);
    }
  }
}