/**
 * Database Types
 * Generated types for Supabase database tables
 * 
 * TODO: Replace with auto-generated types using:
 * npx supabase gen types typescript --project-id your-project-id > lib/supabase/database.types.ts
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            publications: {
                Row: {
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
                };
                Insert: {
                    id?: string;
                    slug: string;
                    title: string;
                    description?: string | null;
                    abstract?: string | null;
                    category: string;
                    tags?: string[] | null;
                    pdf_path: string;
                    pdf_size_bytes?: number | null;
                    page_count?: number | null;
                    published_at?: string;
                    created_at?: string;
                    updated_at?: string;
                    is_featured?: boolean;
                    is_published?: boolean;
                };
                Update: {
                    id?: string;
                    slug?: string;
                    title?: string;
                    description?: string | null;
                    abstract?: string | null;
                    category?: string;
                    tags?: string[] | null;
                    pdf_path?: string;
                    pdf_size_bytes?: number | null;
                    page_count?: number | null;
                    published_at?: string;
                    created_at?: string;
                    updated_at?: string;
                    is_featured?: boolean;
                    is_published?: boolean;
                };
            };
            users: {
                Row: {
                    id: string;
                    clerk_id: string;
                    email: string | null;
                    first_name: string | null;
                    last_name: string | null;
                    avatar_url: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    clerk_id: string;
                    email?: string | null;
                    first_name?: string | null;
                    last_name?: string | null;
                    avatar_url?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    clerk_id?: string;
                    email?: string | null;
                    first_name?: string | null;
                    last_name?: string | null;
                    avatar_url?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            downloads: {
                Row: {
                    id: string;
                    publication_id: string;
                    downloaded_at: string;
                    user_agent: string | null;
                    ip_hash: string | null;
                    country: string | null;
                    referrer: string | null;
                };
                Insert: {
                    id?: string;
                    publication_id: string;
                    downloaded_at?: string;
                    user_agent?: string | null;
                    ip_hash?: string | null;
                    country?: string | null;
                    referrer?: string | null;
                };
                Update: {
                    id?: string;
                    publication_id?: string;
                    downloaded_at?: string;
                    user_agent?: string | null;
                    ip_hash?: string | null;
                    country?: string | null;
                    referrer?: string | null;
                };
            };
            likes: {
                Row: {
                    id: string;
                    publication_id: string;
                    user_id: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    publication_id: string;
                    user_id: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    publication_id?: string;
                    user_id?: string;
                    created_at?: string;
                };
            };
            comments: {
                Row: {
                    id: string;
                    publication_id: string;
                    user_id: string;
                    parent_id: string | null;
                    content: string;
                    is_approved: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    publication_id: string;
                    user_id: string;
                    parent_id?: string | null;
                    content: string;
                    is_approved?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    publication_id?: string;
                    user_id?: string;
                    parent_id?: string | null;
                    content?: string;
                    is_approved?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
        };
        Views: {
            publication_stats: {
                Row: {
                    id: string;
                    slug: string;
                    title: string;
                    download_count: number;
                    like_count: number;
                    comment_count: number;
                };
            };
        };
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
}

