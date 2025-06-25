"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiRoutes = void 0;
const express_1 = __importDefault(require("express"));
const geminiController_1 = require("../controllers/geminiController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const validationSchemas_1 = require("../utils/validationSchemas");
const router = express_1.default.Router();
exports.geminiRoutes = router;
// Apply authentication middleware to all routes
router.use(authMiddleware_1.requireAuth);
router.use(authMiddleware_1.extractUserId);
// Gemini routes
router.post('/generate-tasks', (0, validationMiddleware_1.validate)(validationSchemas_1.generateTasksSchema), geminiController_1.GeminiController.generateTasks);
