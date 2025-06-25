/**
 * Database Setup Script
 * 
 * This script helps initialize the database and test the connection.
 * Run this script before starting the server to ensure the database is properly set up.
 */

import { initializeDatabase } from '../utils/dbInit';
import { testConnection } from '../config/database';

async function setupDatabase() {
  // Starting database setup...
  
  // Step 1: Initialize database and tables
  // Step 1: Initializing database and tables...
  const initialized = await initializeDatabase();
  
  if (!initialized) {
    // Database initialization failed. Please check your PostgreSQL installation and connection settings.
    process.exit(1);
  }
  
  // Step 2: Testing database connection...
  const connected = await testConnection();
  
  if (!connected) {
    // Database connection test failed. The database exists but connection failed.
    process.exit(1);
  }
  
  // Database setup completed successfully!
  process.exit(0);
}

// Run the setup
setupDatabase().catch(error => {
  // Unexpected error during database setup
  process.exit(1);
});