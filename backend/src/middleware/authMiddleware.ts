import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { AppError } from './errorHandler';

// Extend Express Request type to include user information
declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
        sessionId: string;
      };
    }
  }
}

// Middleware to require authentication using Clerk
export const requireAuth = ClerkExpressRequireAuth();

// Middleware to extract user ID from Clerk auth
export const extractUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.auth || !req.auth.userId) {
    return next(new AppError('Unauthorized - User ID not found', 401));
  }
  next();
};