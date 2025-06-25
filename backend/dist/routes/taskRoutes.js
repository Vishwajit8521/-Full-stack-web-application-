"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const validationSchemas_1 = require("../utils/validationSchemas");
const router = express_1.default.Router();
exports.taskRoutes = router;
// Apply authentication middleware to all routes
router.use(authMiddleware_1.requireAuth);
router.use(authMiddleware_1.extractUserId);
// Task routes
router.post('/', (0, validationMiddleware_1.validate)(validationSchemas_1.createTaskSchema), taskController_1.TaskController.createTask);
router.get('/', taskController_1.TaskController.getTasks);
router.get('/:id', (0, validationMiddleware_1.validate)(validationSchemas_1.getTaskSchema), taskController_1.TaskController.getTask);
router.patch('/:id', (0, validationMiddleware_1.validate)(validationSchemas_1.updateTaskSchema), taskController_1.TaskController.updateTask);
router.delete('/:id', (0, validationMiddleware_1.validate)(validationSchemas_1.deleteTaskSchema), taskController_1.TaskController.deleteTask);
// Bulk create route
router.post('/bulk', taskController_1.TaskController.createMultipleTasks);
