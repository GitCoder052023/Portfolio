/**
 * Publication Database Schema
 * Low-level types matching Supabase table structure
 */

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
