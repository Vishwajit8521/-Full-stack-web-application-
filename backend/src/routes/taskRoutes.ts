import express from 'express';
import { TaskController } from '../controllers/taskController';
import { requireAuth, extractUserId } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
} from '../utils/validationSchemas';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(requireAuth);
router.use(extractUserId);

// Task routes
router.post('/', validate(createTaskSchema), TaskController.createTask);
router.get('/', TaskController.getTasks);
router.get('/:id', validate(getTaskSchema), TaskController.getTask);
router.patch('/:id', validate(updateTaskSchema), TaskController.updateTask);
router.delete('/:id', validate(deleteTaskSchema), TaskController.deleteTask);

// Bulk create route
router.post('/bulk', TaskController.createMultipleTasks);

export { router as taskRoutes };