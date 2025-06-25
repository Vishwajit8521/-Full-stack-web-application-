import express from 'express';
import { GeminiController } from '../controllers/geminiController';
import { requireAuth, extractUserId } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { generateTasksSchema } from '../utils/validationSchemas';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(requireAuth);
router.use(extractUserId);

// Gemini routes
router.post(
  '/generate-tasks',
  validate(generateTasksSchema),
  GeminiController.generateTasks
);

export { router as geminiRoutes };