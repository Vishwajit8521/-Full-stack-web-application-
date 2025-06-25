/**
 * Simplified Express server with explicit dotenv loading
 * This server provides basic API functionality without database dependencies
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Explicitly load .env file
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

// Create Express app
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Mock data
const mockTasks = [
  {
    id: 1,
    title: 'Complete Project Setup',
    description: 'Finish setting up the full-stack project',
    completed: false,
    category: 'Development',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Learn TypeScript',
    description: 'Study TypeScript fundamentals and advanced concepts',
    completed: true,
    category: 'Learning',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Build API',
    description: 'Develop RESTful API endpoints for the application',
    completed: false,
    category: 'Development',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Tasks API endpoints
app.get('/api/tasks', (req, res) => {
  res.json({
    success: true,
    data: {
      tasks: mockTasks
    }
  });
});

app.get('/api/tasks/:id', (req, res) => {
  const task = mockTasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  res.json({
    success: true,
    data: {
      task
    }
  });
});

app.post('/api/tasks', (req, res) => {
  const { title, description, category } = req.body;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }
  
  const newTask = {
    id: mockTasks.length + 1,
    title,
    description: description || '',
    completed: false,
    category: category || 'General',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockTasks.push(newTask);
  
  res.status(201).json({
    success: true,
    data: {
      task: newTask
    }
  });
});

app.patch('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = mockTasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  const { title, description, completed, category } = req.body;
  const updatedTask = {
    ...mockTasks[taskIndex],
    title: title !== undefined ? title : mockTasks[taskIndex].title,
    description: description !== undefined ? description : mockTasks[taskIndex].description,
    completed: completed !== undefined ? completed : mockTasks[taskIndex].completed,
    category: category !== undefined ? category : mockTasks[taskIndex].category,
    updatedAt: new Date().toISOString()
  };
  
  mockTasks[taskIndex] = updatedTask;
  
  res.json({
    success: true,
    data: {
      task: updatedTask
    }
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = mockTasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  mockTasks.splice(taskIndex, 1);
  
  res.json({
    success: true,
    data: null
  });
});

// Start server
app.listen(port, () => {
  console.log(`\nServer running on port ${port}`);
  console.log(`Server URL: http://localhost:${port}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
  console.log(`Tasks endpoint: http://localhost:${port}/api/tasks`);
  console.log('\nThis server provides mock data for testing the application');
  console.log('CORS is enabled for:', process.env.CORS_ORIGIN || 'http://localhost:3000');
});