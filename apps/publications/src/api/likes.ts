/**
 * Likes API
 * Client-side functions for like-related API calls
 */

import { API_ROUTES } from "@/constants";

/**
 * Toggle like for a publication
 */
export async function toggleLike(publicationId: string): Promise<{ liked: boolean; likeCount: number }> {
    const response = await fetch(API_ROUTES.like(publicationId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error("Failed to update like");
    }

    return response.json();
}

