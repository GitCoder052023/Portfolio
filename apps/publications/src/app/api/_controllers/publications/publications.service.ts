/**
 * Publications Service
 * Business logic for publications
 */

import { getPublications as getPublicationsFromDb, getFeaturedPublications as getFeaturedFromDb, getPublicationById as getByIdFromDb } from '@/database/interactions';
import type { CategoryId } from '@/configs/app.config';

interface GetPublicationsParams {
    page: number;
    pageSize: number;
    category?: CategoryId;
    search?: string;
    sortBy: 'published_at' | 'download_count' | 'like_count';
    sortOrder: 'asc' | 'desc';
}

export async function getPublications(params: GetPublicationsParams) {
    return getPublicationsFromDb(params);
}

export async function getFeaturedPublications(pageSize: number) {
    const publications = await getFeaturedFromDb(pageSize);
    return {
        publications,
        total: publications.length,
        page: 1,
        pageSize,
        totalPages: 1,
    };
}

export async function getPublicationById(id: string) {
    const publication = await getByIdFromDb(id);
    
    if (!publication) {
        return {
            success: false,
            error: 'Publication not found',
            statusCode: 404,
        };
    }
    
    return {
        success: true,
        data: publication,
    };
}
