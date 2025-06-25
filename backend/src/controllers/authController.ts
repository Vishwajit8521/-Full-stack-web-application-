import { Request, Response } from 'express';

export class AuthController {
  /**
   * @swagger
   * /api/auth/me:
   *   get:
   *     summary: Get current user information
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User information
   *       401:
   *         description: Unauthorized
   */
  static async getCurrentUser(req: Request, res: Response) {
    // The user ID is already available from the auth middleware
    const userId = req.auth.userId;
    
    res.status(200).json({
      status: 'success',
      data: {
        userId,
      },
    });
  }
}