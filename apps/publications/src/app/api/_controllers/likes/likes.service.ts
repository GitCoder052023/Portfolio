/**
 * Likes Service
 * Business logic for likes
 */

import { auth } from '@clerk/nextjs/server';
import { toggleLike as toggleLikeInDb, getLikeCount as getLikeCountFromDb, hasUserLiked as hasUserLikedInDb } from '@/database/interactions';
import { ensureUserExists } from '@/services/clerk';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
});

export async function checkRateLimit(ip: string) {
    return limiter.check(10, `LIKE_POST_${ip}`);
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

export async function toggleLike(publicationId: string, userId: string) {
    return toggleLikeInDb(publicationId, userId);
}

export async function getLikeCount(publicationId: string) {
    return getLikeCountFromDb(publicationId);
}

export async function hasUserLiked(publicationId: string, userId: string) {
    return hasUserLikedInDb(publicationId, userId);
}
