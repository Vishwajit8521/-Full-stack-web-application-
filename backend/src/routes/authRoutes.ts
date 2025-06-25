import express from 'express';
import { AuthController } from '../controllers/authController';
import { requireAuth, extractUserId } from '../middleware/authMiddleware';

const router = express.Router();

// Auth routes
router.get('/me', requireAuth, extractUserId, AuthController.getCurrentUser);

export { router as authRoutes };