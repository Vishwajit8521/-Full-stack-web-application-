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
console.log(`Loading environment from: ${envPath}`);

if (fs.existsSync(envPath)) {
  console.log('.env file exists, loading...');
  const result = dotenv.config({ path: envPath });
  
  if (result.error) {
    console.error('Error loading .env file:', result.error);
  } else {
    console.log('.env file loaded successfully');
  }
} else {
  console.error('.env file not found!');
}

const app = express();
const port = process.env.PORT || 8000;

// Print environment variables
console.log('\nEnvironment variables after loading:');
const envVars = ['NODE_ENV', 'PORT', 'DATABASE_URL', 'CORS_ORIGIN'];
for (const varName of envVars) {
  const value = process.env[varName];
  console.log(`- ${varName}: ${value ? (varName === 'DATABASE_URL' ? '[HIDDEN]' : value) : 'not set'}`);
}

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
  },
  apis: ['./src/routes/*.ts'],
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

// Start server without waiting for database
const server = app.listen(port, () => {
  console.log(`\nServer starting on port ${port}`);
  console.log(`Server URL: http://localhost:${port}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
  console.log(`API Documentation: http://localhost:${port}/api-docs`);
});

// Try to connect to database in the background
console.log('\nAttempting to connect to database...');
testConnection()
  .then(connected => {
    if (connected) {
      console.log('✅ Database connection successful!');
      // Initialize database tables if needed
      return initializeDatabase();
    } else {
      console.warn('⚠️ Database connection failed. Some features may not work.');
      console.warn('Please check your database configuration in .env file.');
      return false;
    }
  })
  .then(initialized => {
    if (initialized) {
      console.log('✅ Database tables initialized successfully!');
    }
  })
  .catch(error => {
    console.error('❌ Error connecting to database:', error.message);
  });

export default app;