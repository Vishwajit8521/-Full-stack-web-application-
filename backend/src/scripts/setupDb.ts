/**
 * Database Setup Script
 * 
 * This script helps initialize the database and test the connection.
 * Run this script before starting the server to ensure the database is properly set up.
 */

import { initializeDatabase } from '../utils/dbInit';
import { testConnection } from '../config/database';

async function setupDatabase() {
  console.log('Starting database setup...');
  
  // Step 1: Initialize database and tables
  console.log('\nStep 1: Initializing database and tables...');
  const initialized = await initializeDatabase();
  
  if (!initialized) {
    console.error('\nDatabase initialization failed. Please check your PostgreSQL installation and connection settings.');
    console.log('\nTroubleshooting tips:');
    console.log('1. Ensure PostgreSQL is running');
    console.log('2. Check your DATABASE_URL in .env file');
    console.log('3. Verify that the database user has permission to create databases');
    process.exit(1);
  }
  
  console.log('\nStep 2: Testing database connection...');
  const connected = await testConnection();
  
  if (!connected) {
    console.error('\nDatabase connection test failed. The database exists but connection failed.');
    console.log('\nTroubleshooting tips:');
    console.log('1. Check your DATABASE_URL in .env file');
    console.log('2. Verify that the database user has correct permissions');
    process.exit(1);
  }
  
  console.log('\n✅ Database setup completed successfully!');
  console.log('You can now start the server with: npm run dev');
  process.exit(0);
}

// Run the setup
setupDatabase().catch(error => {
  console.error('Unexpected error during database setup:', error);
  process.exit(1);
});