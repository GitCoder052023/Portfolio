/**
 * Single Publication API Route
 * GET /api/publications/[id] - Get a single publication by ID
 * Router - delegates to controller
 */

import { type NextRequest } from 'next/server';
import * as publicationsController from '@/app/api/_controllers/publications/publications.controller';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    return publicationsController.getPublication(id);
}
