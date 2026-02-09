/**
 * Clerk Webhooks Service
 * Business logic for Clerk webhooks
 */

import { Webhook } from 'svix';
import { syncClerkUser, deleteClerkUser } from '@/services/clerk';
import type { ClerkUserWebhookData } from '@/types';

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

interface WebhookSignature {
    svixId: string | null;
    svixTimestamp: string | null;
    svixSignature: string | null;
}

interface ProcessWebhookParams {
    signature: WebhookSignature;
    body: string;
}

interface WebhookEvent {
    type: string;
    data: ClerkUserWebhookData;
}

export async function processWebhook(params: ProcessWebhookParams) {
    const { signature, body } = params;
    const { svixId, svixTimestamp, svixSignature } = signature;

    if (!CLERK_WEBHOOK_SECRET) {
        console.error('CLERK_WEBHOOK_SECRET is not configured');
        return {
            success: false,
            error: 'Webhook not configured',
            statusCode: 500,
        };
    }

    if (!svixId || !svixTimestamp || !svixSignature) {
        return {
            success: false,
            error: 'Missing Svix headers',
            statusCode: 400,
        };
    }

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);

    let event: WebhookEvent;
    try {
        event = wh.verify(body, {
            'svix-id': svixId,
            'svix-timestamp': svixTimestamp,
            'svix-signature': svixSignature,
        }) as WebhookEvent;
    } catch (verifyError) {
        console.error('Webhook verification failed:', verifyError);
        return {
            success: false,
            error: 'Webhook verification failed',
            statusCode: 400,
        };
    }

    const { type, data } = event;

    switch (type) {
        case 'user.created':
        case 'user.updated': {
            const result = await syncClerkUser(data);

            if (!result.success) {
                console.error(`Failed to sync user ${data.id}:`, result.error);
                return {
                    success: false,
                    error: result.error,
                    statusCode: 500,
                };
            }

            console.log(`User ${data.id} synced successfully (${type})`);
            break;
        }

        case 'user.deleted': {
            const result = await deleteClerkUser(data.id);

            if (!result.success) {
                console.error(`Failed to delete user ${data.id}:`, result.error);
            } else {
                console.log(`User ${data.id} deleted successfully`);
            }
            break;
        }

        default:
            console.log(`Unhandled webhook event type: ${type}`);
    }

    return {
        success: true,
    };
}
