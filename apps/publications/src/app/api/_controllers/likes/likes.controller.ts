/**
 * Likes Controller
 * Handles HTTP layer for likes endpoints
 */

import { NextResponse, type NextRequest } from 'next/server';
import * as likesService from './likes.service';

export async function toggleLike(request: NextRequest, publicationId: string) {
    try {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
        
        const rateLimitResult = await likesService.checkRateLimit(ip);
        if (rateLimitResult.isRateLimited) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const authResult = await likesService.authenticateUser();
        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.statusCode || 401 }
            );
        }

        const result = await likesService.toggleLike(publicationId, authResult.userId!);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            );
        }

        const likeCount = await likesService.getLikeCount(publicationId);

        return NextResponse.json({
            liked: result.liked,
            likeCount,
        });
    } catch (error) {
        console.error('Error in toggle like controller:', error);
        return NextResponse.json(
            { error: 'Failed to process like' },
            { status: 500 }
        );
    }
}

export async function getLikeStatus(request: NextRequest, publicationId: string) {
    try {
        const authResult = await likesService.authenticateUser();
        
        if (!authResult.success) {
            const likeCount = await likesService.getLikeCount(publicationId);
            return NextResponse.json({
                liked: false,
                likeCount,
            });
        }

        const [liked, likeCount] = await Promise.all([
            likesService.hasUserLiked(publicationId, authResult.userId!),
            likesService.getLikeCount(publicationId),
        ]);

        return NextResponse.json({ liked, likeCount });
    } catch (error) {
        console.error('Error in get like status controller:', error);
        return NextResponse.json(
            { error: 'Failed to check like status' },
            { status: 500 }
        );
    }
}
