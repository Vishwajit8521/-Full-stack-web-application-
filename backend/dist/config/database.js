"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.isConnected = exports.db = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
}
// Create a connection pool with timeout and retry options
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000, // 5 second timeout
    max: 20, // Maximum number of clients in the pool
});
// Test database connection with better error handling
let isConnected = false;
exports.isConnected = isConnected;
const testConnection = async () => {
    try {
        const client = await pool.connect();
        // Successfully connected to the database
        exports.isConnected = isConnected = true;
        client.release();
        return true;
    }
    catch (err) {
        // Error connecting to the database
        return false;
    }
};
exports.testConnection = testConnection;
// Try to connect but don't block server startup if it fails
testConnection().catch(err => {
    // Database connection test failed
});
exports.db = (0, node_postgres_1.drizzle)(pool);
