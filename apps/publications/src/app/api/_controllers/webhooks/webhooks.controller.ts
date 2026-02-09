/**
 * Clerk Webhooks Controller
 * Handles HTTP layer for Clerk webhook endpoints
 */

import { NextResponse, type NextRequest } from 'next/server';
import * as webhooksService from './webhooks.service';

export async function handleClerkWebhook(request: NextRequest) {
    const signature = {
        svixId: request.headers.get('svix-id'),
        svixTimestamp: request.headers.get('svix-timestamp'),
        svixSignature: request.headers.get('svix-signature'),
    };

    const body = await request.text();
    
    const result = await webhooksService.processWebhook({
        signature,
        body,
    });

    if (!result.success) {
        return NextResponse.json(
            { error: result.error },
            { status: result.statusCode || 400 }
        );
    }

    return NextResponse.json({ received: true });
}
