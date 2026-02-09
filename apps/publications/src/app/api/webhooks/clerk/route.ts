/**
 * Clerk Webhook API Route
 * POST /api/webhooks/clerk - Handle Clerk user lifecycle events
 * Router - delegates to controller
 */

import { type NextRequest } from 'next/server';
import * as webhooksController from '@/app/api/_controllers/webhooks/webhooks.controller';

export async function POST(request: NextRequest) {
    return webhooksController.handleClerkWebhook(request);
}
