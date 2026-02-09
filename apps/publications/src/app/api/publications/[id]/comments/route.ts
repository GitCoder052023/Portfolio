/**
 * Comments API Route
 * GET /api/publications/[id]/comments - Get comments for a publication
 * POST /api/publications/[id]/comments - Add a comment (auth required)
 * DELETE /api/publications/[id]/comments - Delete a comment (auth required, owner only)
 * Router - delegates to controller
 */

import { type NextRequest } from 'next/server';
import * as commentsController from '@/app/api/_controllers/comments/comments.controller';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: publicationId } = await params;
    return commentsController.getComments(publicationId);
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: publicationId } = await params;
    return commentsController.createComment(request, publicationId);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return commentsController.deleteComment(request);
}
