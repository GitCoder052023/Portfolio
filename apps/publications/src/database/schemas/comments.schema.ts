/**
 * Comments Database Schema
 * Low-level types matching Supabase table structure
 */

export interface CommentRow {
    id: string;
    publication_id: string;
    user_id: string;
    parent_id: string | null;
    content: string;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
}

export interface CommentWithUserRow extends CommentRow {
    users: {
        id: string;
        first_name: string | null;
        last_name: string | null;
        avatar_url: string | null;
    };
}
