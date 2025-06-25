"use strict";
/**
 * Database Setup Script
 *
 * This script helps initialize the database and test the connection.
 * Run this script before starting the server to ensure the database is properly set up.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const dbInit_1 = require("../utils/dbInit");
const database_1 = require("../config/database");
async function setupDatabase() {
    // Starting database setup...
    // Step 1: Initialize database and tables
    // Step 1: Initializing database and tables...
    const initialized = await (0, dbInit_1.initializeDatabase)();
    if (!initialized) {
        // Database initialization failed. Please check your PostgreSQL installation and connection settings.
        process.exit(1);
    }
    // Step 2: Testing database connection...
    const connected = await (0, database_1.testConnection)();
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
