"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.getTasks = exports.createTask = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../utils/prisma"));
const integration_service_1 = require("../services/integration.service");
const taskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(['OPEN', 'IN_PROGRESS', 'DONE']).optional(),
});
const createTask = async (req, res) => {
    try {
        const { title, description, status } = taskSchema.parse(req.body);
        const userId = req.user.userId;
        const task = await prisma_1.default.task.create({
            data: {
                title,
                description,
                status: status || 'OPEN',
                userId,
            },
        });
        // Trigger mock integration (background)
        (0, integration_service_1.triggerIntegration)(task.id, 'CREATE').catch(console.error);
        res.status(201).json(task);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ errors: error.issues });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    try {
        const userId = req.user.userId;
        const tasks = await prisma_1.default.task.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTasks = getTasks;
const getTask = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const task = await prisma_1.default.task.findFirst({
            where: { id, userId },
        });
        if (!task)
            return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTask = getTask;
const updateTask = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const { title, description, status } = taskSchema.partial().parse(req.body);
        const existingTask = await prisma_1.default.task.findFirst({ where: { id, userId } });
        if (!existingTask)
            return res.status(404).json({ error: 'Task not found' });
        const task = await prisma_1.default.task.update({
            where: { id },
            data: { title, description, status },
        });
        // Trigger mock integration (background)
        (0, integration_service_1.triggerIntegration)(task.id, 'UPDATE').catch(console.error);
        res.json(task);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ errors: error.issues });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const existingTask = await prisma_1.default.task.findFirst({ where: { id, userId } });
        if (!existingTask)
            return res.status(404).json({ error: 'Task not found' });
        await prisma_1.default.task.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteTask = deleteTask;
