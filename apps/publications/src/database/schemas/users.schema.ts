/**
 * Users Database Schema
 * Low-level types matching Supabase table structure
 */

export interface UserRow {
    id: string;
    clerk_id: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}
