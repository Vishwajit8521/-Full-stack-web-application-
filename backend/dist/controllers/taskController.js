"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const taskService_1 = require("../services/taskService");
const errorHandler_1 = require("../middleware/errorHandler");
class TaskController {
    /**
     * @swagger
     * /api/tasks:
     *   post:
     *     summary: Create a new task
     *     tags: [Tasks]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [title]
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               completed:
     *                 type: boolean
     *               category:
     *                 type: string
     *     responses:
     *       201:
     *         description: Task created successfully
     *       400:
     *         description: Invalid request data
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Server error
     */
    static async createTask(req, res) {
        const userId = req.auth.userId;
        const task = await taskService_1.TaskService.createTask(userId, req.body);
        res.status(201).json({
            status: 'success',
            data: { task },
        });
    }
    /**
     * @swagger
     * /api/tasks:
     *   get:
     *     summary: Get all tasks for the authenticated user
     *     tags: [Tasks]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of tasks
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Server error
     */
    static async getTasks(req, res) {
        const userId = req.auth.userId;
        const tasks = await taskService_1.TaskService.getTasks(userId);
        res.status(200).json({
            status: 'success',
            data: { tasks },
        });
    }
    /**
     * @swagger
     * /api/tasks/{id}:
     *   get:
     *     summary: Get a task by ID
     *     tags: [Tasks]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Task details
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Task not found
     *       500:
     *         description: Server error
     */
    static async getTask(req, res) {
        const userId = req.auth.userId;
        const taskId = parseInt(req.params.id, 10);
        if (isNaN(taskId)) {
            throw new errorHandler_1.AppError('Invalid task ID', 400);
        }
        const task = await taskService_1.TaskService.getTaskById(userId, taskId);
        res.status(200).json({
            status: 'success',
            data: { task },
        });
    }
    /**
     * @swagger
     * /api/tasks/{id}:
     *   patch:
     *     summary: Update a task
     *     tags: [Tasks]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               completed:
     *                 type: boolean
     *               category:
     *                 type: string
     *     responses:
     *       200:
     *         description: Task updated successfully
     *       400:
     *         description: Invalid request data
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Task not found
     *       500:
     *         description: Server error
     */
    static async updateTask(req, res) {
        const userId = req.auth.userId;
        const taskId = parseInt(req.params.id, 10);
        if (isNaN(taskId)) {
            throw new errorHandler_1.AppError('Invalid task ID', 400);
        }
        const task = await taskService_1.TaskService.updateTask(userId, taskId, req.body);
        res.status(200).json({
            status: 'success',
            data: { task },
        });
    }
    /**
     * @swagger
     * /api/tasks/{id}:
     *   delete:
     *     summary: Delete a task
     *     tags: [Tasks]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Task deleted successfully
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Task not found
     *       500:
     *         description: Server error
     */
    static async deleteTask(req, res) {
        const userId = req.auth.userId;
        const taskId = parseInt(req.params.id, 10);
        if (isNaN(taskId)) {
            throw new errorHandler_1.AppError('Invalid task ID', 400);
        }
        await taskService_1.TaskService.deleteTask(userId, taskId);
        res.status(200).json({
            status: 'success',
            data: null,
        });
    }
    /**
     * @swagger
     * /api/tasks/bulk:
     *   post:
     *     summary: Create multiple tasks at once
     *     tags: [Tasks]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [tasks]
     *             properties:
     *               tasks:
     *                 type: array
     *                 items:
     *                   type: object
     *                   required: [title]
     *                   properties:
     *                     title:
     *                       type: string
     *                     description:
     *                       type: string
     *                     completed:
     *                       type: boolean
     *                     category:
     *                       type: string
     *     responses:
     *       201:
     *         description: Tasks created successfully
     *       400:
     *         description: Invalid request data
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Server error
     */
    static async createMultipleTasks(req, res) {
        const userId = req.auth.userId;
        const { tasks: tasksData } = req.body;
        if (!Array.isArray(tasksData) || tasksData.length === 0) {
            throw new errorHandler_1.AppError('Invalid tasks data', 400);
        }
        const tasks = await taskService_1.TaskService.createMultipleTasks(userId, tasksData);
        res.status(201).json({
            status: 'success',
            data: { tasks },
        });
    }
}
exports.TaskController = TaskController;
