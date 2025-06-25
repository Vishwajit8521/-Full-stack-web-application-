import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';

import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { taskRoutes } from './routes/taskRoutes';
import { authRoutes } from './routes/authRoutes';
import { geminiRoutes } from './routes/geminiRoutes';
import { isConnected, testConnection } from './config/database';
import { initializeDatabase } from './utils/dbInit';

// Explicitly load .env file from the correct location
const envPath = path.resolve(__dirname, '../.env');

if (fs.existsSync(envPath)) {
  const result = dotenv.config({ path: envPath });
  
  if (result.error) {
    // Error loading .env file
  }
} else {
  // .env file not found
}

const app = express();
const port = process.env.PORT || 8000;

// Environment variables
const envVars = ['NODE_ENV', 'PORT', 'DATABASE_URL', 'CORS_ORIGIN'];

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API for Task Management Application with Google Gemini API',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Simple health check endpoint that doesn't require database
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    dbStatus: isConnected ? 'connected' : 'disconnected'
  });
});

// Routes - only register if database is needed
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/gemini', geminiRoutes);

// Enhanced health check endpoint with database status
app.get('/health', async (req, res) => {
  // Test database connection on demand
  const dbStatus = await testConnection();
  
  res.status(200).json({
    status: 'ok',
    server: 'running',
    database: {
      connected: dbStatus,
      status: dbStatus ? 'connected' : 'disconnected'
    },
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Replace the server startup code (around line 113)
const startServer = async (retryPort = 0) => {
  const serverPort = retryPort > 0 ? Number(port) + retryPort : Number(port);

  const server = app.listen(serverPort, async () => {
    console.log(`Server starting on port ${serverPort}`);
    console.log(`Server URL: http://localhost:${serverPort}`);
    console.log(`Health check: http://localhost:${serverPort}/api/health`);
    console.log(`API Documentation: http://localhost:${serverPort}/api-docs`);

    try {
      await initializeDatabase();
      console.log('✅ Database tables initialized successfully!');
    } catch (error) {
      console.error('❌ Failed to initialize database tables:', error);
    }
  });

  server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE' && retryPort < 10) {
      console.log(`Port ${serverPort} is in use, trying port ${Number(port) + retryPort + 1}`);
      startServer(retryPort + 1);
    } else {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  });
};

startServer();
export default app;