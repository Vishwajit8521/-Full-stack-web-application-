"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = require("../config/database");
const schema_1 = require("../models/schema");
const errorHandler_1 = require("../middleware/errorHandler");
class TaskService {
    /**
     * Create a new task for a user
     */
    static async createTask(userId, taskData) {
        try {
            const result = await database_1.db.insert(schema_1.tasks).values({
                userId,
                title: taskData.title,
                description: taskData.description,
                completed: taskData.completed || false,
                category: taskData.category,
            }).returning();
            return result[0];
        }
        catch (error) {
            // Error creating task
            throw new errorHandler_1.AppError('Failed to create task', 500);
        }
    }
    /**
     * Get all tasks for a user
     */
    static async getTasks(userId) {
        try {
            return await database_1.db.select().from(schema_1.tasks).where((0, drizzle_orm_1.eq)(schema_1.tasks.userId, userId));
        }
        catch (error) {
            // Error fetching tasks
            throw new errorHandler_1.AppError('Failed to fetch tasks', 500);
        }
    }
    /**
     * Get a task by ID for a user
     */
    static async getTaskById(userId, taskId) {
        try {
            const result = await database_1.db.select()
                .from(schema_1.tasks)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.id, taskId), (0, drizzle_orm_1.eq)(schema_1.tasks.userId, userId)));
            if (result.length === 0) {
                throw new errorHandler_1.AppError('Task not found', 404);
            }
            return result[0];
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                throw error;
            }
            // Error fetching task
            throw new errorHandler_1.AppError('Failed to fetch task', 500);
        }
    }
    /**
     * Update a task for a user
     */
    static async updateTask(userId, taskId, taskData) {
        try {
            // First check if the task exists and belongs to the user
            await this.getTaskById(userId, taskId);
            const result = await database_1.db.update(schema_1.tasks)
                .set({
                ...taskData,
                updatedAt: new Date(),
            })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.id, taskId), (0, drizzle_orm_1.eq)(schema_1.tasks.userId, userId)))
                .returning();
            return result[0];
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                throw error;
            }
            // Error updating task
            throw new errorHandler_1.AppError('Failed to update task', 500);
        }
    }
    /**
     * Delete a task for a user
     */
    static async deleteTask(userId, taskId) {
        try {
            // First check if the task exists and belongs to the user
            await this.getTaskById(userId, taskId);
            await database_1.db.delete(schema_1.tasks)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.id, taskId), (0, drizzle_orm_1.eq)(schema_1.tasks.userId, userId)));
            return { success: true };
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                throw error;
            }
            // Error deleting task
            throw new errorHandler_1.AppError('Failed to delete task', 500);
        }
    }
    /**
     * Create multiple tasks for a user
     */
    static async createMultipleTasks(userId, tasksData) {
        try {
            const tasksToInsert = tasksData.map(task => ({
                userId,
                title: task.title,
                description: task.description,
                completed: task.completed || false,
                category: task.category,
            }));
            const result = await database_1.db.insert(schema_1.tasks).values(tasksToInsert).returning();
            return result;
        }
        catch (error) {
            // Error creating multiple tasks
            throw new errorHandler_1.AppError('Failed to create tasks', 500);
        }
    }
}
exports.TaskService = TaskService;
