/**
 * Like API Route
 * POST /api/publications/[id]/like - Toggle like on a publication (auth required)
 * GET /api/publications/[id]/like - Check like status
 * Router - delegates to controller
 */

import { type NextRequest } from 'next/server';
import * as likesController from '@/app/api/_controllers/likes/likes.controller';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: publicationId } = await params;
    return likesController.toggleLike(request, publicationId);
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: publicationId } = await params;
    return likesController.getLikeStatus(request, publicationId);
}
