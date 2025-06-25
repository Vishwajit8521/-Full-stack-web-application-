// src/controllers/geminiController.ts

import { Request, Response } from 'express';
import { GeminiService } from '../services/geminiService';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export class GeminiController {
  /**
   * @swagger
   * /api/gemini/generate-tasks:
   *   post:
   *     summary: Generate tasks based on a topic using Google Gemini API
   *     tags: [Gemini]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - topic
   *             properties:
   *               topic:
   *                 type: string
   *                 description: The topic to generate tasks for
   *     responses:
   *       200:
   *         description: Successfully generated tasks
   *       400:
   *         description: Invalid request data
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Server error
   */
  static async generateTasks(req: Request, res: Response) {
    try {
      const { topic } = req.body;

      if (!topic || typeof topic !== 'string') {
        return res.status(400).json({
          status: 'error',
          message: 'Topic must be a non-empty string.',
        });
      }

      const tasks = await GeminiService.generateTasks(topic);

      return res.status(200).json({
        status: 'success',
        data: { tasks },
      });
    } catch (error: any) {
      console.error('Error generating tasks:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to generate tasks.',
      });
    }
  }
}
