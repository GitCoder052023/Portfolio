/**
 * Publications API
 * Client-side functions for publication-related API calls
 */

import { API_ROUTES } from "@/constants";

/**
 * Get download/view link for a publication PDF
 */
export async function getDownloadLink(publicationId: string): Promise<{ url: string }> {
    const response = await fetch(API_ROUTES.download(publicationId));

    if (!response.ok) {
        throw new Error("Failed to get download link");
    }

    return response.json();
}

