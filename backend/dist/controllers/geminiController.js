"use strict";
// src/controllers/geminiController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiController = void 0;
const geminiService_1 = require("../services/geminiService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
class GeminiController {
    /**
     * @swagger
     * /api/gemini/generate-tasks:
     *   post:
     *     summary: Generate tasks based on a topic using Google Gemini API
     *     tags: [Gemini]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [topic]
     *             properties:
     *               topic:
     *                 type: string
     *                 description: The topic to generate tasks for
     *     responses:
     *       200:
     *         description: Successfully generated tasks
     *       400:
     *         description: Invalid request data
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Server error
     */
    static async generateTasks(req, res) {
        try {
            const { topic } = req.body;
            if (!topic || typeof topic !== 'string') {
                return res.status(400).json({
                    status: 'error',
                    message: 'Topic must be a non-empty string.',
                });
            }
            const tasks = await geminiService_1.GeminiService.generateTasks(topic);
            return res.status(200).json({
                status: 'success',
                data: { tasks },
            });
        }
        catch (error) {
            // Error generating tasks
            return res.status(500).json({
                status: 'error',
                message: 'Failed to generate tasks.',
            });
        }
    }
}
exports.GeminiController = GeminiController;
