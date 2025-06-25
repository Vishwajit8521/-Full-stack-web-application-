import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { AppError } from '../middleware/errorHandler';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface GeneratedTask {
  title: string;
}

export class GeminiService {
  /**
   * Generate tasks based on a topic using Google Gemini API
   * @param topic The topic to generate tasks for
   * @returns Array of generated tasks
   */
  static async generateTasks(topic: string): Promise<GeneratedTask[]> {
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
        throw new AppError('Failed to generate enough tasks', 500);
      }
      
      return tasks.slice(0, 5);
    } catch (error) {
      // Error generating tasks
      throw new AppError('Failed to generate tasks', 500);
    }
  }
}