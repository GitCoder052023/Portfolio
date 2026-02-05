/**
 * Comments API Route
 * GET /api/publications/[id]/comments - Get comments for a publication
 * POST /api/publications/[id]/comments - Add a comment (auth required)
 * DELETE /api/publications/[id]/comments - Delete a comment (auth required, owner only)
 */

import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getComments, createComment, deleteComment, getUserByClerkId } from '@/database/interactions';

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

        // Check authentication
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Get the user from our database
        const user = await getUserByClerkId(clerkUserId);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found. Please try signing out and back in.' },
                { status: 404 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { content, parentId } = body;

        if (!content || typeof content !== 'string') {
            return NextResponse.json(
                { error: 'Comment content is required' },
                { status: 400 }
            );
        }

        // Create the comment
        const result = await createComment({
            publicationId,
            userId: user.id,
            content,
            parentId,
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

        // Get the user from our database
        const user = await getUserByClerkId(clerkUserId);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { commentId } = body;

        if (!commentId) {
            return NextResponse.json(
                { error: 'Comment ID is required' },
                { status: 400 }
            );
        }

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

