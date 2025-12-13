import prisma from '../utils/prisma';

export const triggerIntegration = async (taskId: string, action: string) => {
    console.log(`[Integration Mock] Triggering integration for Task ${taskId} on action: ${action}`);

    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate success/failure randomly (mostly success)
        const success = Math.random() > 0.2;

        if (success) {
            console.log(`[Integration Mock] Successfully integrated for Task ${taskId}`);
            await prisma.integrationLog.create({
                data: {
                    taskId,
                    status: 'SUCCESS',
                    message: `Successfully processed ${action} event via webhook.`
                }
            });
        } else {
            console.error(`[Integration Mock] Failed integration for Task ${taskId}`);
            await prisma.integrationLog.create({
                data: {
                    taskId,
                    status: 'FAILURE',
                    message: `Failed to process ${action} event. Service unavailable.`
                }
            });
        }
    } catch (error) {
        console.error(`[Integration Mock] Error executing integration logic`, error);
    }
};
