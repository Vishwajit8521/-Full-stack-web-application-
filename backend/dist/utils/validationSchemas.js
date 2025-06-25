"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTasksSchema = exports.getTaskSchema = exports.deleteTaskSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
// Task creation schema
exports.createTaskSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required').max(255),
        description: zod_1.z.string().optional(),
        completed: zod_1.z.boolean().optional().default(false),
        category: zod_1.z.string().optional(),
    }),
});
// Task update schema
exports.updateTaskSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().or(zod_1.z.number()).transform(Number),
    }),
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required').max(255).optional(),
        description: zod_1.z.string().optional(),
        completed: zod_1.z.boolean().optional(),
        category: zod_1.z.string().optional(),
    }).refine(data => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for update',
    }),
});
// Task deletion schema
exports.deleteTaskSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().or(zod_1.z.number()).transform(Number),
    }),
});
// Task get by ID schema
exports.getTaskSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().or(zod_1.z.number()).transform(Number),
    }),
});
// Gemini task generation schema
exports.generateTasksSchema = zod_1.z.object({
    body: zod_1.z.object({
        topic: zod_1.z.string().min(1, 'Topic is required').max(255),
    }),
});
