/**
 * Comments Service
 * Business logic for comments
 */

import { auth } from '@clerk/nextjs/server';
import { getComments as getCommentsFromDb, createComment as createCommentInDb, deleteComment as deleteCommentInDb, getUserByClerkId } from '@/database/interactions';
import { ensureUserExists } from '@/services/clerk';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
});

interface CreateCommentParams {
    publicationId: string;
    userId: string;
    content: string;
    parentId?: string;
}

interface DeleteCommentParams {
    commentId: string;
    userId: string;
}

export async function checkRateLimit(ip: string) {
    return limiter.check(10, `COMMENT_POST_${ip}`);
}

export async function authenticateUser() {
    const { userId: clerkUserId } = await auth();
    
    if (!clerkUserId) {
        return {
            success: false,
            error: 'Authentication required',
            statusCode: 401,
        };
    }

    const user = await ensureUserExists(clerkUserId);
    
    if (!user) {
        return {
            success: false,
            error: 'Failed to synchronize your user profile. Please try again or sign out and back in.',
            statusCode: 500,
        };
    }

    return {
        success: true,
        userId: user.id,
        user,
    };
}

export async function getComments(publicationId: string) {
    const comments = await getCommentsFromDb(publicationId);
    return {
        comments,
        total: comments.length,
    };
}

export async function createComment(params: CreateCommentParams) {
    const { publicationId, userId, content, parentId } = params;
    
    const user = await getUserByClerkId(userId);
    if (!user) {
        return {
            success: false,
            error: 'User not found',
        };
    }

    const result = await createCommentInDb({
        publicationId,
        userId,
        content,
        parentId,
    });

    if (!result.success) {
        return result;
    }

    const displayName = [user.firstName, user.lastName]
        .filter(Boolean)
        .join(' ') || 'Anonymous';

    return {
        success: true,
        data: {
            id: result.commentId,
            publicationId,
            userId,
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
    };
}

export async function deleteComment(params: DeleteCommentParams) {
    return deleteCommentInDb(params.commentId, params.userId);
}
