/**
 * Clerk Webhook API Route
 * POST /api/webhooks/clerk - Handle Clerk user lifecycle events
 * 
 * This endpoint syncs user data from Clerk to our Supabase database.
 */

import { NextResponse, type NextRequest } from 'next/server';
import { Webhook } from 'svix';
import { syncClerkUser, deleteClerkUser } from '@/lib/clerk';
import type { ClerkUserWebhookData } from '@/types';

// Clerk webhook verification
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

interface WebhookEvent {
    type: string;
    data: ClerkUserWebhookData;
}

export async function POST(request: NextRequest) {
    if (!CLERK_WEBHOOK_SECRET) {
        console.error('CLERK_WEBHOOK_SECRET is not configured');
        return NextResponse.json(
            { error: 'Webhook not configured' },
            { status: 500 }
        );
    }

    try {
        // Get the Svix headers for verification
        const svix_id = request.headers.get('svix-id');
        const svix_timestamp = request.headers.get('svix-timestamp');
        const svix_signature = request.headers.get('svix-signature');

        if (!svix_id || !svix_timestamp || !svix_signature) {
            return NextResponse.json(
                { error: 'Missing Svix headers' },
                { status: 400 }
            );
        }

        // Get the raw body
        const body = await request.text();

        // Verify the webhook
        const wh = new Webhook(CLERK_WEBHOOK_SECRET);

        let event: WebhookEvent;
        try {
            event = wh.verify(body, {
                'svix-id': svix_id,
                'svix-timestamp': svix_timestamp,
                'svix-signature': svix_signature,
            }) as WebhookEvent;
        } catch (verifyError) {
            console.error('Webhook verification failed:', verifyError);
            return NextResponse.json(
                { error: 'Webhook verification failed' },
                { status: 400 }
            );
        }

        // Handle the event
        const { type, data } = event;

        switch (type) {
            case 'user.created':
            case 'user.updated': {
                const result = await syncClerkUser(data);

                if (!result.success) {
                    console.error(`Failed to sync user ${data.id}:`, result.error);
                    return NextResponse.json(
                        { error: result.error },
                        { status: 500 }
                    );
                }

                console.log(`User ${data.id} synced successfully (${type})`);
                break;
            }

            case 'user.deleted': {
                const result = await deleteClerkUser(data.id);

                if (!result.success) {
                    console.error(`Failed to delete user ${data.id}:`, result.error);
                    // Don't return error - user might not exist in our DB
                } else {
                    console.log(`User ${data.id} deleted successfully`);
                }
                break;
            }

            default:
                console.log(`Unhandled webhook event type: ${type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}
