/**
 * Comments Queries
 * Database operations for comments
 */

import { getSupabaseServerClient, getSupabaseAdminClient } from '../server';
import type { CommentWithUser, CommentWithUserRow } from '@/types';

// =============================================================================
// Row to Entity Transformers
// =============================================================================

function transformCommentRow(row: CommentWithUserRow): CommentWithUser {
    const displayName = [row.users.first_name, row.users.last_name]
        .filter(Boolean)
        .join(' ') || 'Anonymous';

    return {
        id: row.id,
        publicationId: row.publication_id,
        userId: row.user_id,
        parentId: row.parent_id,
        content: row.content,
        isApproved: row.is_approved,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        user: {
            id: row.users.id,
            displayName,
            avatarUrl: row.users.avatar_url,
        },
    };
}

function nestComments(comments: CommentWithUser[]): CommentWithUser[] {
    const map = new Map<string, CommentWithUser>();
    const roots: CommentWithUser[] = [];

    // First pass: create map
    comments.forEach(comment => {
        map.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: build tree
    comments.forEach(comment => {
        const current = map.get(comment.id)!;
        if (comment.parentId) {
            const parent = map.get(comment.parentId);
            if (parent) {
                parent.replies = parent.replies || [];
                parent.replies.push(current);
            } else {
                roots.push(current);
            }
        } else {
            roots.push(current);
        }
    });

    return roots;
}

// =============================================================================
// Read Operations (using anon key)
// =============================================================================

/**
 * Get comments for a publication (nested structure)
 */
export async function getComments(publicationId: string): Promise<CommentWithUser[]> {
    const supabase = getSupabaseServerClient();

    const { data: rows, error } = await supabase
        .from('comments')
        .select(`
      *,
      users (
        id,
        first_name,
        last_name,
        avatar_url
      )
    `)
        .eq('publication_id', publicationId)
        .eq('is_approved', true)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching comments:', error);
        return [];
    }

    const flat = (rows || []).map(row => transformCommentRow(row as CommentWithUserRow));
    return nestComments(flat);
}

/**
 * Get comment count for a publication
 */
export async function getCommentCount(publicationId: string): Promise<number> {
    const supabase = getSupabaseServerClient();

    const { count, error } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('publication_id', publicationId)
        .eq('is_approved', true);

    if (error) {
        console.error('Error fetching comment count:', error);
        return 0;
    }

    return count || 0;
}

// =============================================================================
// Write Operations (using service role key - server only!)
// =============================================================================

interface CreateCommentParams {
    publicationId: string;
    userId: string;
    content: string;
    parentId?: string;
}

/**
 * Create a new comment
 * 
 * ⚠️ SERVER ONLY: Uses admin client with service role key
 */
export async function createComment(
    params: CreateCommentParams
): Promise<{ success: boolean; commentId?: string; error?: string }> {
    const supabase = getSupabaseAdminClient();

    // Validate content
    const content = params.content.trim();
    if (!content || content.length < 1) {
        return { success: false, error: 'Comment cannot be empty' };
    }

    if (content.length > 2000) {
        return { success: false, error: 'Comment is too long (max 2000 characters)' };
    }

    const { data, error } = await supabase
        .from('comments')
        .insert({
            publication_id: params.publicationId,
            user_id: params.userId,
            content,
            parent_id: params.parentId || null,
            is_approved: true, // Auto-approve for now, can add moderation later
        })
        .select('id')
        .single();

    if (error) {
        console.error('Error creating comment:', error);
        return { success: false, error: 'Failed to create comment' };
    }

    return { success: true, commentId: data.id };
}

/**
 * Delete a comment (only the owner can delete)
 * 
 * ⚠️ SERVER ONLY: Uses admin client with service role key
 */
export async function deleteComment(
    commentId: string,
    userId: string
): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseAdminClient();

    // Verify ownership
    const { data: existing, error: fetchError } = await supabase
        .from('comments')
        .select('user_id')
        .eq('id', commentId)
        .single();

    if (fetchError || !existing) {
        return { success: false, error: 'Comment not found' };
    }

    if (existing.user_id !== userId) {
        return { success: false, error: 'Not authorized to delete this comment' };
    }

    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

    if (error) {
        console.error('Error deleting comment:', error);
        return { success: false, error: 'Failed to delete comment' };
    }

    return { success: true };
}
