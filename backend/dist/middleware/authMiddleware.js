"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUserId = exports.requireAuth = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const errorHandler_1 = require("./errorHandler");
// Middleware to require authentication using Clerk
exports.requireAuth = (0, clerk_sdk_node_1.ClerkExpressRequireAuth)();
// Middleware to extract user ID from Clerk auth
const extractUserId = (req, res, next) => {
    if (!req.auth || !req.auth.userId) {
        return next(new errorHandler_1.AppError('Unauthorized - User ID not found', 401));
    }
    next();
};
exports.extractUserId = extractUserId;
