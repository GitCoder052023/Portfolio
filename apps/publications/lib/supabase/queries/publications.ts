/**
 * Publications Queries
 * Database queries for publications (read-only on server)
 */

import { getSupabaseServerClient } from '../server';
import type {
    Publication,
    PublicationWithStats,
    PublicationsQueryParams,
    PublicationRow,
    PublicationStatsRow
} from '@/types';
import type { CategoryId } from '@/lib/config';
import { appConfig } from '@/lib/config';

// =============================================================================
// Row to Entity Transformers
// =============================================================================

function transformPublicationRow(row: PublicationRow): Publication {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        description: row.description,
        abstract: row.abstract,
        category: row.category as CategoryId,
        tags: row.tags || [],
        pdfPath: row.pdf_path,
        pdfSizeBytes: row.pdf_size_bytes,
        pageCount: row.page_count,
        publishedAt: row.published_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        isFeatured: row.is_featured,
        isPublished: row.is_published,
    };
}

function mergeWithStats(
    publication: Publication,
    stats: PublicationStatsRow | null
): PublicationWithStats {
    return {
        ...publication,
        stats: {
            downloadCount: stats?.download_count ?? 0,
            likeCount: stats?.like_count ?? 0,
            commentCount: stats?.comment_count ?? 0,
        },
    };
}

// =============================================================================
// Queries
// =============================================================================

/**
 * Get all published publications with optional filtering
 */
export async function getPublications(params: PublicationsQueryParams = {}) {
    const {
        page = 1,
        pageSize = appConfig.pagination.defaultPageSize,
        category,
        search,
        sortBy = 'published_at',
        sortOrder = 'desc',
        featured,
    } = params;

    const supabase = getSupabaseServerClient();
    const offset = (page - 1) * pageSize;

    // Build base query
    let query = supabase
        .from('publications')
        .select('*', { count: 'exact' })
        .eq('is_published', true);

    // Apply filters
    if (category) {
        query = query.eq('category', category);
    }

    if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (featured !== undefined) {
        query = query.eq('is_featured', featured);
    }

    // Apply sorting
    const orderColumn = sortBy === 'published_at' ? 'published_at' : 'published_at';
    query = query.order(orderColumn, { ascending: sortOrder === 'asc' });

    // Apply pagination
    query = query.range(offset, offset + pageSize - 1);

    const { data: rows, error, count } = await query;

    if (error) {
        console.error('Error fetching publications:', error);
        throw new Error('Failed to fetch publications');
    }

    // Get stats for all publications
    const ids = rows?.map(r => r.id) || [];
    const statsMap = await getPublicationStatsMap(ids);

    // Transform to entities
    const publications: PublicationWithStats[] = (rows || []).map(row => {
        const publication = transformPublicationRow(row as PublicationRow);
        return mergeWithStats(publication, statsMap.get(publication.id) || null);
    });

    return {
        publications,
        total: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
    };
}

/**
 * Get featured publications
 */
export async function getFeaturedPublications(limit: number = 3) {
    const result = await getPublications({
        featured: true,
        pageSize: limit,
    });
    return result.publications;
}

/**
 * Get a single publication by slug
 */
export async function getPublicationBySlug(slug: string): Promise<PublicationWithStats | null> {
    const supabase = getSupabaseServerClient();

    const { data: row, error } = await supabase
        .from('publications')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (error || !row) {
        if (error?.code !== 'PGRST116') { // Not "no rows found"
            console.error('Error fetching publication:', error);
        }
        return null;
    }

    const publication = transformPublicationRow(row as PublicationRow);

    // Get stats
    const statsMap = await getPublicationStatsMap([publication.id]);
    return mergeWithStats(publication, statsMap.get(publication.id) || null);
}

/**
 * Get a single publication by ID
 */
export async function getPublicationById(id: string): Promise<PublicationWithStats | null> {
    const supabase = getSupabaseServerClient();

    const { data: row, error } = await supabase
        .from('publications')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();

    if (error || !row) {
        if (error?.code !== 'PGRST116') {
            console.error('Error fetching publication:', error);
        }
        return null;
    }

    const publication = transformPublicationRow(row as PublicationRow);

    const statsMap = await getPublicationStatsMap([publication.id]);
    return mergeWithStats(publication, statsMap.get(publication.id) || null);
}

/**
 * Get publication stats from the view
 */
async function getPublicationStatsMap(ids: string[]): Promise<Map<string, PublicationStatsRow>> {
    if (ids.length === 0) return new Map();

    const supabase = getSupabaseServerClient();

    const { data: stats, error } = await supabase
        .from('publication_stats')
        .select('*')
        .in('id', ids);

    if (error) {
        console.error('Error fetching publication stats:', error);
        return new Map();
    }

    const map = new Map<string, PublicationStatsRow>();
    (stats || []).forEach(s => map.set(s.id, s as PublicationStatsRow));
    return map;
}

/**
 * Get publications by category
 */
export async function getPublicationsByCategory(
    category: CategoryId,
    params: Omit<PublicationsQueryParams, 'category'> = {}
) {
    return getPublications({ ...params, category });
}

/**
 * Get related publications (same category, excluding current)
 */
export async function getRelatedPublications(
    publicationId: string,
    category: CategoryId,
    limit: number = 3
): Promise<PublicationWithStats[]> {
    const supabase = getSupabaseServerClient();

    const { data: rows, error } = await supabase
        .from('publications')
        .select('*')
        .eq('category', category)
        .eq('is_published', true)
        .neq('id', publicationId)
        .order('published_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching related publications:', error);
        return [];
    }

    const ids = rows?.map(r => r.id) || [];
    const statsMap = await getPublicationStatsMap(ids);

    return (rows || []).map(row => {
        const publication = transformPublicationRow(row as PublicationRow);
        return mergeWithStats(publication, statsMap.get(publication.id) || null);
    });
}

/**
 * Get total publication count
 */
export async function getPublicationCount(): Promise<number> {
    const supabase = getSupabaseServerClient();

    const { count, error } = await supabase
        .from('publications')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true);

    if (error) {
        console.error('Error fetching publication count:', error);
        return 0;
    }

    return count || 0;
}
