/**
 * Comments Controller
 * Handles HTTP layer for comments endpoints
 */

import { NextResponse, type NextRequest } from 'next/server';
import * as commentsService from './comments.service';
import { commentSchema, deleteCommentSchema } from '@/lib/validations';

export async function getComments(publicationId: string) {
    try {
        const result = await commentsService.getComments(publicationId);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in comments controller:', error);
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
        );
    }
}

export async function createComment(request: NextRequest, publicationId: string) {
    try {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
        
        const rateLimitResult = await commentsService.checkRateLimit(ip);
        if (rateLimitResult.isRateLimited) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const authResult = await commentsService.authenticateUser();
        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.statusCode || 401 }
            );
        }

        const body = await request.json();
        const validation = commentSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const { content, parentId } = validation.data;
        
        const result = await commentsService.createComment({
            publicationId,
            userId: authResult.userId!,
            content,
            parentId: parentId || undefined,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            );
        }

        return NextResponse.json({ comment: result.data });
    } catch (error) {
        console.error('Error in create comment controller:', error);
        return NextResponse.json(
            { error: 'Failed to create comment' },
            { status: 500 }
        );
    }
}

export async function deleteComment(request: NextRequest) {
    try {
        const authResult = await commentsService.authenticateUser();
        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.statusCode || 401 }
            );
        }

        const body = await request.json();
        const validation = deleteCommentSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const result = await commentsService.deleteComment({
            commentId: validation.data.commentId,
            userId: authResult.userId!,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in delete comment controller:', error);
        return NextResponse.json(
            { error: 'Failed to delete comment' },
            { status: 500 }
        );
    }
}
