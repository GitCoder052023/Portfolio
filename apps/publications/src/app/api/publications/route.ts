/**
 * Publications API Route
 * GET /api/publications - List all publications with optional filtering
 */

import { NextResponse, type NextRequest } from 'next/server';
import { getPublications, getFeaturedPublications } from '@/database/interactions';
import type { CategoryId } from '@/configs/app.config';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = parseInt(searchParams.get('pageSize') || '12', 10);
        const category = searchParams.get('category') as CategoryId | null;
        const search = searchParams.get('search') || undefined;
        const featured = searchParams.get('featured');
        const sortBy = searchParams.get('sortBy') as 'published_at' | 'download_count' | 'like_count' || 'published_at';
        const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc';

        // If featured flag is true, return featured publications only
        if (featured === 'true') {
            const publications = await getFeaturedPublications(pageSize);
            return NextResponse.json({
                publications,
                total: publications.length,
                page: 1,
                pageSize,
                totalPages: 1,
            });
        }

        const result = await getPublications({
            page,
            pageSize: Math.min(pageSize, 50), // Cap at 50
            category: category || undefined,
            search,
            sortBy,
            sortOrder,
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching publications:', error);
        return NextResponse.json(
            { error: 'Failed to fetch publications' },
            { status: 500 }
        );
    }
}

