"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const errorHandler_1 = require("./middleware/errorHandler");
const notFoundHandler_1 = require("./middleware/notFoundHandler");
const taskRoutes_1 = require("./routes/taskRoutes");
const authRoutes_1 = require("./routes/authRoutes");
const geminiRoutes_1 = require("./routes/geminiRoutes");
const database_1 = require("./config/database");
const dbInit_1 = require("./utils/dbInit");
// Explicitly load .env file from the correct location
const envPath = path_1.default.resolve(__dirname, '../.env');
if (fs_1.default.existsSync(envPath)) {
    const result = dotenv_1.default.config({ path: envPath });
    if (result.error) {
        // Error loading .env file
    }
}
else {
    // .env file not found
}
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Environment variables
const envVars = ['NODE_ENV', 'PORT', 'DATABASE_URL', 'CORS_ORIGIN'];
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json());
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
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Simple health check endpoint that doesn't require database
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        dbStatus: database_1.isConnected ? 'connected' : 'disconnected'
    });
});
// Routes - only register if database is needed
app.use('/api/tasks', taskRoutes_1.taskRoutes);
app.use('/api/auth', authRoutes_1.authRoutes);
app.use('/api/gemini', geminiRoutes_1.geminiRoutes);
// Enhanced health check endpoint with database status
app.get('/health', async (req, res) => {
    // Test database connection on demand
    const dbStatus = await (0, database_1.testConnection)();
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
app.use(notFoundHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
// Start server without waiting for database
const server = app.listen(port, () => {
    // Server started successfully
});
// Try to connect to database in the background
(0, database_1.testConnection)()
    .then(connected => {
    if (connected) {
        // Database connection successful
        // Initialize database tables if needed
        return (0, dbInit_1.initializeDatabase)();
    }
    else {
        // Database connection failed
        return false;
    }
})
    .then(initialized => {
    // Database tables initialized if needed
})
    .catch(error => {
    // Error connecting to database
});
exports.default = app;
