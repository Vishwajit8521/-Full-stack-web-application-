import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Extract database name from connection string
const getDatabaseName = (connectionString: string): string => {
  const matches = connectionString.match(/\/([^\/?]+)(\?|$)/);
  return matches ? matches[1] : '';
};

// Create a function to initialize the database
async function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const connectionString = process.env.DATABASE_URL;
  const dbName = getDatabaseName(connectionString);
  
  if (!dbName) {
    console.error('Could not extract database name from connection string');
    process.exit(1);
  }

  // Create a connection to PostgreSQL server (without specific database)
  const pgConnectionString = connectionString.replace(`/${dbName}`, '/postgres');
  const serverPool = new Pool({
    connectionString: pgConnectionString,
    connectionTimeoutMillis: 5000,
  });

  try {
    // Check if database exists
    const dbCheckResult = await serverPool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    // Create database if it doesn't exist
    if (dbCheckResult.rows.length === 0) {
      console.log(`Database '${dbName}' does not exist. Creating...`);
      await serverPool.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database '${dbName}' created successfully`);
    } else {
      console.log(`Database '${dbName}' already exists`);
    }

    // Close the server connection
    await serverPool.end();

    // Connect to the specific database to create tables
    const dbPool = new Pool({
      connectionString,
      connectionTimeoutMillis: 5000,
    });

    // Check if tables exist
    const tableCheckResult = await dbPool.query(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = 'public' AND table_name IN ('users', 'tasks')`
    );

    const existingTables = tableCheckResult.rows.map(row => row.table_name);
    
    if (existingTables.length < 2) {
      console.log('Some tables are missing. Creating tables...');
      
      // Create tables using schema from models
      const createTablesQuery = `
        -- Create users table if not exists
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR PRIMARY KEY,
          email VARCHAR NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        -- Create tasks table if not exists
        CREATE TABLE IF NOT EXISTS tasks (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR NOT NULL REFERENCES users(id),
          title VARCHAR(255) NOT NULL,
          description TEXT,
          completed BOOLEAN DEFAULT FALSE NOT NULL,
          category VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
      `;

      await dbPool.query(createTablesQuery);
      console.log('Tables created successfully');
    } else {
      console.log('All required tables already exist');
    }

    // Close the database connection
    await dbPool.end();
    
    console.log('Database initialization completed successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}

// Export the function for use in other files
export { initializeDatabase };

// If this script is run directly, execute the initialization
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}