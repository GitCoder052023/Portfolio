/**
 * Comments API
 * Client-side functions for comment-related API calls
 */

import { API_ROUTES } from "@/constants";
import type { CommentWithUser } from "@/types";

/**
 * Post a new comment
 */
export async function postComment(publicationId: string, content: string): Promise<CommentWithUser> {
    const response = await fetch(API_ROUTES.comments(publicationId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) {
        throw new Error("Failed to post comment");
    }

    const data = await response.json();
    return data.comment;
}

/**
 * Delete a comment
 */
export async function deleteComment(publicationId: string, commentId: string): Promise<void> {
    const response = await fetch(API_ROUTES.comments(publicationId), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
    });

    if (!response.ok) {
        throw new Error("Failed to delete comment");
    }
}

