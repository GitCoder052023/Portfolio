/**
 * Comments API Route
 * GET /api/publications/[id]/comments - Get comments for a publication
 * POST /api/publications/[id]/comments - Add a comment (auth required)
 * DELETE /api/publications/[id]/comments - Delete a comment (auth required, owner only)
 */

import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getComments, createComment, deleteComment, getUserByClerkId } from '@/database/interactions';
import { ensureUserExists } from '@/services/clerk';
import { rateLimit } from '@/lib/rate-limit';
import { commentSchema, deleteCommentSchema } from '@/lib/validations';

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: publicationId } = await params;

        const comments = await getComments(publicationId);

        return NextResponse.json({
            comments,
            total: comments.length,
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: publicationId } = await params;

        // Rate Limiting
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
        const { isRateLimited } = limiter.check(10, `COMMENT_POST_${ip}`); // 10 comments per minute per IP

        if (isRateLimited) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // Check authentication
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Get or sync the user in our database
        const user = await ensureUserExists(clerkUserId);

        if (!user) {
            return NextResponse.json(
                { error: 'Failed to synchronize your user profile. Please try again or sign out and back in.' },
                { status: 500 }
            );
        }

        // Parse and Validate request body
        const body = await request.json();
        const validation = commentSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const { content, parentId } = validation.data;

        // Create the comment
        const result = await createComment({
            publicationId,
            userId: user.id,
            content,
            parentId: parentId || undefined,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || 'Failed to create comment' },
                { status: 400 }
            );
        }

        // Return the created comment with user info
        const displayName = [user.firstName, user.lastName]
            .filter(Boolean)
            .join(' ') || 'Anonymous';

        return NextResponse.json({
            comment: {
                id: result.commentId,
                publicationId,
                userId: user.id,
                parentId: parentId || null,
                content: content.trim(),
                isApproved: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                user: {
                    id: user.id,
                    displayName,
                    avatarUrl: user.avatarUrl,
                },
            },
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json(
            { error: 'Failed to create comment' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Get or sync the user
        const user = await ensureUserExists(clerkUserId);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Parse and Validate request body
        const body = await request.json();
        const validation = deleteCommentSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const { commentId } = validation.data;

        // Delete the comment (will verify ownership)
        const result = await deleteComment(commentId, user.id);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || 'Failed to delete comment' },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting comment:', error);
        return NextResponse.json(
            { error: 'Failed to delete comment' },
            { status: 500 }
        );
    }
}

