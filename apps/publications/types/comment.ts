/**
 * Comment Types
 * Types for comment entities
 */

import type { UserProfile } from './user';

// =============================================================================
// Core Comment Types
// =============================================================================

export interface Comment {
    id: string;
    publicationId: string;
    userId: string;
    parentId: string | null;
    content: string;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
}

// =============================================================================
// Comment with User Info
// =============================================================================

export interface CommentWithUser extends Comment {
    user: UserProfile;
    replies?: CommentWithUser[];
}

// =============================================================================
// API Request/Response Types
// =============================================================================

export interface CreateCommentRequest {
    content: string;
    parentId?: string;
}

export interface CommentsResponse {
    comments: CommentWithUser[];
    total: number;
}

// =============================================================================
// Database Row Types (raw from Supabase)
// =============================================================================

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
