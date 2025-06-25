"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("../middleware/errorHandler");
dotenv_1.default.config();
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
}
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
class GeminiService {
    /**
     * Generate tasks based on a topic using Google Gemini API
     * @param topic The topic to generate tasks for
     * @returns Array of generated tasks
     */
    static async generateTasks(topic) {
        try {
            const prompt = `Generate a list of 5 concise, actionable tasks to learn about ${topic}. Return only the tasks, no numbering or formatting.`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            // Split the text by newlines and filter out empty lines
            const tasks = text
                .split('\n')
                .map(task => task.trim())
                .filter(task => task.length > 0)
                .map(title => ({ title }));
            // Ensure we have exactly 5 tasks
            if (tasks.length < 5) {
                throw new errorHandler_1.AppError('Failed to generate enough tasks', 500);
            }
            return tasks.slice(0, 5);
        }
        catch (error) {
            // Error generating tasks
            throw new errorHandler_1.AppError('Failed to generate tasks', 500);
        }
    }
}
exports.GeminiService = GeminiService;
