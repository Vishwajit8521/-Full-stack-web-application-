import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create a connection pool with timeout and retry options
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000, // 5 second timeout
  max: 20, // Maximum number of clients in the pool
});

// Test database connection with better error handling
let isConnected = false;

const testConnection = async () => {
  try {
    const client = await pool.connect();
    // Successfully connected to the database
    isConnected = true;
    client.release();
    return true;
  } catch (err) {
    // Error connecting to the database
    return false;
  }
};

// Try to connect but don't block server startup if it fails
testConnection().catch(err => {
  // Database connection test failed
});

export const db = drizzle(pool);
export { isConnected, testConnection }; // Export for use in other parts of the application