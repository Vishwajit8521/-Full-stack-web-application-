# Troubleshooting Guide

This guide provides solutions for common issues encountered when running the full-stack application.

## Quick Start Solution

If you're having trouble getting the application to run, follow these steps for a quick solution:

1. Start the simplified backend server:
   ```bash
   cd backend
   node src/server.js
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application at: http://localhost:3000

## Identified Issues

1. **Backend Server Not Starting**
   - The TypeScript backend server may have issues connecting to the database.
   - Port 8000 might be in use by another process.

2. **Frontend-Backend Connection**
   - The frontend is configured to connect to the backend at `http://localhost:8000`.
   - If the backend is not running, API requests from the frontend will fail.

## Solutions

### 1. Use the Simplified Server

A simplified JavaScript server has been created that doesn't require a database connection:

1. Run the simplified server:
   ```bash
   cd backend
   node src/server.js
   ```

2. This server provides:
   - A `/api/health` endpoint to check server status
   - Mock task data at `/api/tasks`
   - Full CRUD operations for tasks (GET, POST, PATCH, DELETE)

### 2. Fix Database Connection Issues

#### Check PostgreSQL Service

1. Ensure PostgreSQL is installed and running:
   ```powershell
   # Check if PostgreSQL service is running
   Get-Service -Name postgresql*
   ```

2. If not running, start the PostgreSQL service:
   ```powershell
   # Start PostgreSQL service
   Start-Service -Name postgresql*
   ```

#### Verify Database Exists

1. Connect to PostgreSQL and check if the `taskmanagement` database exists:
   ```bash
   # Using psql (if available)
   psql -U postgres -c "SELECT datname FROM pg_database WHERE datname = 'taskmanagement';"
   ```

2. If the database doesn't exist, create it:
   ```bash
   # Create database
   psql -U postgres -c "CREATE DATABASE taskmanagement;"
   ```

### 3. Fix Port Conflicts

1. Check what's using port 8000:
   ```powershell
   # Check port usage
   netstat -ano | findstr :8000
   ```

2. Either stop the process using port 8000 or change the backend port in `.env`:
   ```
   PORT=8002
   ```

## Advanced Troubleshooting

### Database Connection

If you continue to have database connection issues:

1. Check the `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL=postgresql://postgres:YourPassword@localhost:5432/taskmanagement
   ```

2. Verify PostgreSQL credentials and permissions:
   ```bash
   # Test connection with explicit credentials
   psql -U postgres -h localhost -p 5432 -d taskmanagement
   ```

3. Check PostgreSQL logs for connection errors:
   ```powershell
   # Location varies by installation
   Get-Content "C:\Program Files\PostgreSQL\<version>\data\log\*.log" -Tail 50
   ```

### Server Startup Issues

If the TypeScript backend server still won't start:

1. Try running with direct Node.js execution instead of nodemon:
   ```bash
   cd backend
   npx ts-node src/index.ts
   ```

2. Check for TypeScript compilation errors:
   ```bash
   cd backend
   npx tsc --noEmit
   ```

## Need More Help?

If you're still experiencing issues:

1. Check the application logs for specific error messages
2. Verify all environment variables are correctly set
3. Ensure all dependencies are installed (`npm install` in both frontend and backend directories)