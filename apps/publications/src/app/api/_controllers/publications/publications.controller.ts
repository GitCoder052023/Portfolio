/**
 * Publications Controller
 * Handles HTTP layer for publications endpoints
 */

import { NextResponse, type NextRequest } from 'next/server';
import * as publicationsService from './publications.service';
import type { CategoryId } from '@/configs/app.config';

export async function getPublications(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = parseInt(searchParams.get('pageSize') || '12', 10);
        const category = searchParams.get('category') as CategoryId | null;
        const search = searchParams.get('search') || undefined;
        const featured = searchParams.get('featured');
        const sortBy = searchParams.get('sortBy') as 'published_at' | 'download_count' | 'like_count' || 'published_at';
        const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc';

        if (featured === 'true') {
            const result = await publicationsService.getFeaturedPublications(pageSize);
            return NextResponse.json(result);
        }

        const result = await publicationsService.getPublications({
            page,
            pageSize: Math.min(pageSize, 50),
            category: category || undefined,
            search,
            sortBy,
            sortOrder,
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in publications controller:', error);
        return NextResponse.json(
            { error: 'Failed to fetch publications' },
            { status: 500 }
        );
    }
}

export async function getPublication(id: string) {
    try {
        const result = await publicationsService.getPublicationById(id);
        
        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: result.statusCode || 404 }
            );
        }

        return NextResponse.json({ publication: result.data });
    } catch (error) {
        console.error('Error in publication controller:', error);
        return NextResponse.json(
            { error: 'Failed to fetch publication' },
            { status: 500 }
        );
    }
}
