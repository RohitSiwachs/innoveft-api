"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerIntegration = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const triggerIntegration = async (taskId, action) => {
    console.log(`[Integration Mock] Triggering integration for Task ${taskId} on action: ${action}`);
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Simulate success/failure randomly (mostly success)
        const success = Math.random() > 0.2;
        if (success) {
            console.log(`[Integration Mock] Successfully integrated for Task ${taskId}`);
            await prisma_1.default.integrationLog.create({
                data: {
                    taskId,
                    status: 'SUCCESS',
                    message: `Successfully processed ${action} event via webhook.`
                }
            });
        }
        else {
            console.error(`[Integration Mock] Failed integration for Task ${taskId}`);
            await prisma_1.default.integrationLog.create({
                data: {
                    taskId,
                    status: 'FAILURE',
                    message: `Failed to process ${action} event. Service unavailable.`
                }
            });
        }
    }
    catch (error) {
        console.error(`[Integration Mock] Error executing integration logic`, error);
    }
};
exports.triggerIntegration = triggerIntegration;
