/**
 * Comment Model
 * Transformers and logic for Comment entities
 */

import type { CommentWithUser } from "@/types";
import type { CommentWithUserRow } from "../schemas/comments.schema";

/**
 * Transform a database row to a Comment entity
 */
export function transformCommentRow(row: CommentWithUserRow): CommentWithUser {
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

/**
 * Nest a flat array of comments into a tree structure
 */
export function nestComments(comments: CommentWithUser[]): CommentWithUser[] {
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
