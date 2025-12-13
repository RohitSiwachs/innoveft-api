import { Response } from 'express';
import { z } from 'zod';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';
import { triggerIntegration } from '../services/integration.service';

const taskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'DONE']).optional(),
});

export const createTask = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, status } = taskSchema.parse(req.body);
        const userId = req.user!.userId;

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status: status || 'OPEN',
                userId,
            },
        });

        // Trigger mock integration (background)
        triggerIntegration(task.id, 'CREATE').catch(console.error);

        res.status(201).json(task);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.issues });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId;
        const tasks = await prisma.task.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTask = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;

        const task = await prisma.task.findFirst({
            where: { id, userId },
        });

        if (!task) return res.status(404).json({ error: 'Task not found' });

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;
        const { title, description, status } = taskSchema.partial().parse(req.body);

        const existingTask = await prisma.task.findFirst({ where: { id, userId } });
        if (!existingTask) return res.status(404).json({ error: 'Task not found' });

        const task = await prisma.task.update({
            where: { id },
            data: { title, description, status },
        });

        // Trigger mock integration (background)
        triggerIntegration(task.id, 'UPDATE').catch(console.error);

        res.json(task);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.issues });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;

        const existingTask = await prisma.task.findFirst({ where: { id, userId } });
        if (!existingTask) return res.status(404).json({ error: 'Task not found' });

        // First delete related IntegrationLogs to avoid foreign key constraint error
        await prisma.integrationLog.deleteMany({ where: { taskId: id } });
        
        // Then delete the task
        await prisma.task.delete({ where: { id } });

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
