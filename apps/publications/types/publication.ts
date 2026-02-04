/**
 * Publication Types
 * Core types for publication entities
 */

import type { CategoryId } from '@/lib/config';

// =============================================================================
// Core Publication Types
// =============================================================================

export interface Publication {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    abstract: string | null;
    category: CategoryId;
    tags: string[];
    pdfPath: string;
    pdfSizeBytes: number | null;
    pageCount: number | null;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    isFeatured: boolean;
    isPublished: boolean;
}

// =============================================================================
// Publication with Stats
// =============================================================================

export interface PublicationStats {
    downloadCount: number;
    likeCount: number;
    commentCount: number;
}

export interface PublicationWithStats extends Publication {
    stats: PublicationStats;
}

// =============================================================================
// API Response Types
// =============================================================================

export interface PublicationsListResponse {
    publications: PublicationWithStats[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface PublicationResponse {
    publication: PublicationWithStats;
    signedUrl: string; // Signed URL for PDF download
}

// =============================================================================
// Query Parameters
// =============================================================================

export interface PublicationsQueryParams {
    page?: number;
    pageSize?: number;
    category?: CategoryId;
    search?: string;
    sortBy?: 'published_at' | 'download_count' | 'like_count';
    sortOrder?: 'asc' | 'desc';
    featured?: boolean;
}

// =============================================================================
// Database Row Types (raw from Supabase)
// =============================================================================

export interface PublicationRow {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    abstract: string | null;
    category: string;
    tags: string[] | null;
    pdf_path: string;
    pdf_size_bytes: number | null;
    page_count: number | null;
    published_at: string;
    created_at: string;
    updated_at: string;
    is_featured: boolean;
    is_published: boolean;
}

export interface PublicationStatsRow {
    id: string;
    slug: string;
    title: string;
    download_count: number;
    like_count: number;
    comment_count: number;
}
