/**
 * Like API Route
 * POST /api/publications/[id]/like - Toggle like on a publication (auth required)
 */

import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { toggleLike, getLikeCount, hasUserLiked } from '@/database/interactions';
import { getUserByClerkId } from '@/database/interactions';

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

        // Toggle the like
        const result = await toggleLike(publicationId, user.id);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || 'Failed to update like' },
                { status: 400 }
            );
        }

        // Get updated like count
        const likeCount = await getLikeCount(publicationId);

        return NextResponse.json({
            liked: result.liked,
            likeCount,
        });
    } catch (error) {
        console.error('Error handling like:', error);
        return NextResponse.json(
            { error: 'Failed to process like' },
            { status: 500 }
        );
    }
}

// GET to check if user has liked
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: publicationId } = await params;

        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            // Not authenticated - return default state
            return NextResponse.json({
                liked: false,
                likeCount: await getLikeCount(publicationId),
            });
        }

        const user = await getUserByClerkId(clerkUserId);

        if (!user) {
            return NextResponse.json({
                liked: false,
                likeCount: await getLikeCount(publicationId),
            });
        }

        const [liked, likeCount] = await Promise.all([
            hasUserLiked(publicationId, user.id),
            getLikeCount(publicationId),
        ]);

        return NextResponse.json({ liked, likeCount });
    } catch (error) {
        console.error('Error checking like status:', error);
        return NextResponse.json(
            { error: 'Failed to check like status' },
            { status: 500 }
        );
    }
}

