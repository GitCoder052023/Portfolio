/**
 * Likes Queries
 * Database operations for likes
 */

import { getSupabaseServerClient, getSupabaseAdminClient } from '../server';

// =============================================================================
// Read Operations (using anon key)
// =============================================================================

/**
 * Get like count for a publication
 */
export async function getLikeCount(publicationId: string): Promise<number> {
    const supabase = getSupabaseServerClient();

    const { count, error } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('publication_id', publicationId);

    if (error) {
        console.error('Error fetching like count:', error);
        return 0;
    }

    return count || 0;
}

/**
 * Check if a user has liked a publication
 */
export async function hasUserLiked(
    publicationId: string,
    userId: string
): Promise<boolean> {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq('publication_id', publicationId)
        .eq('user_id', userId)
        .maybeSingle();

    if (error) {
        console.error('Error checking like status:', error);
        return false;
    }

    return !!data;
}

// =============================================================================
// Write Operations (using service role key - server only!)
// =============================================================================

/**
 * Add a like to a publication
 * 
 * ⚠️ SERVER ONLY: Uses admin client with service role key
 */
export async function addLike(
    publicationId: string,
    userId: string
): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseAdminClient();

    const { error } = await supabase
        .from('likes')
        .insert({
            publication_id: publicationId,
            user_id: userId,
        });

    if (error) {
        // Check if it's a duplicate
        if (error.code === '23505') { // Unique constraint violation
            return { success: false, error: 'Already liked' };
        }
        console.error('Error adding like:', error);
        return { success: false, error: 'Failed to add like' };
    }

    return { success: true };
}

/**
 * Remove a like from a publication
 * 
 * ⚠️ SERVER ONLY: Uses admin client with service role key
 */
export async function removeLike(
    publicationId: string,
    userId: string
): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseAdminClient();

    const { error } = await supabase
        .from('likes')
        .delete()
        .eq('publication_id', publicationId)
        .eq('user_id', userId);

    if (error) {
        console.error('Error removing like:', error);
        return { success: false, error: 'Failed to remove like' };
    }

    return { success: true };
}

/**
 * Toggle like status for a publication
 * 
 * ⚠️ SERVER ONLY: Uses admin client with service role key
 */
export async function toggleLike(
    publicationId: string,
    userId: string
): Promise<{ success: boolean; liked: boolean; error?: string }> {
    const isLiked = await hasUserLiked(publicationId, userId);

    if (isLiked) {
        const result = await removeLike(publicationId, userId);
        return { ...result, liked: false };
    } else {
        const result = await addLike(publicationId, userId);
        return { ...result, liked: true };
    }
}
