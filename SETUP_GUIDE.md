# Full Stack Project Setup Guide

This guide will help you set up and run the full stack project on your local machine, specifically addressing issues with localhost connections.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Database Setup

1. Ensure PostgreSQL is installed and running on your machine
2. Create a database named `taskmanagement` (or use the one specified in your .env file)

```sql
CREATE DATABASE taskmanagement;
```

3. Make sure the PostgreSQL user has appropriate permissions

## Environment Configuration

### Backend Configuration

1. Navigate to the backend directory

```bash
cd "Full Stack Project/backend"
```

2. Check your `.env` file to ensure it has the correct database connection string:

```
DATABASE_URL=postgresql://postgres:YourPassword@localhost:5432/taskmanagement
```

Replace `YourPassword` with your actual PostgreSQL password.

3. Install dependencies

```bash
npm install
```

4. Initialize the database

```bash
npm run setup-db
```

This script will:
- Check if the database exists and create it if needed
- Create necessary tables
- Test the database connection

### Frontend Configuration

1. Navigate to the frontend directory

```bash
cd "Full Stack Project/frontend"
```

2. Check your `.env.local` file to ensure it points to the correct API URL:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Install dependencies

```bash
npm install
```

## Running the Application

### Start the Backend Server

1. Navigate to the backend directory

```bash
cd "Full Stack Project/backend"
```

2. Start the development server

```bash
npm run dev
```

The server should start on http://localhost:8000

3. Verify the server is running by accessing the health check endpoint:

```
http://localhost:8000/health
```

### Start the Frontend Server

1. Navigate to the frontend directory

```bash
cd "Full Stack Project/frontend"
```

2. Start the development server

```bash
npm run dev
```

The frontend should start on http://localhost:3000 (or http://localhost:3001 if port 3000 is already in use)

## Troubleshooting

### Backend Won't Start

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check your DATABASE_URL in the .env file
   - Run `npm run setup-db` to initialize the database

2. **Port Already in Use**
   - Check if another process is using port 8000
   - Change the PORT in your .env file if needed

### Frontend Won't Connect to Backend

1. **API URL Configuration**
   - Ensure NEXT_PUBLIC_API_URL in .env.local points to the correct backend URL

2. **CORS Issues**
   - Check that the backend CORS configuration includes your frontend URL

### Database Connection Errors

1. **Authentication Failed**
   - Verify your PostgreSQL username and password in the DATABASE_URL

2. **Database Doesn't Exist**
   - Run `npm run setup-db` from the backend directory to create it

## Additional Resources

- Check the backend logs for detailed error messages
- Use the `/health` endpoint to verify the backend status and database connection
- For more detailed setup instructions, refer to the project documentation