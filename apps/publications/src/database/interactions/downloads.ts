/**
 * Downloads Queries
 * Database operations for tracking downloads
 */

import { getSupabaseServerClient, getSupabaseAdminClient } from '@/services/supabase/server';
import { STORAGE } from '@/constants';

// =============================================================================
// Read Operations (using anon key)
// =============================================================================

/**
 * Get download count for a publication
 */
export async function getDownloadCount(publicationId: string): Promise<number> {
    const supabase = getSupabaseServerClient();

    const { count, error } = await supabase
        .from('downloads')
        .select('*', { count: 'exact', head: true })
        .eq('publication_id', publicationId);

    if (error) {
        console.error('Error fetching download count:', error);
        return 0;
    }

    return count || 0;
}

// =============================================================================
// Write Operations (using service role key - server only!)
// =============================================================================

interface TrackDownloadParams {
    publicationId: string;
    userAgent?: string;
    ipHash?: string;
    country?: string;
    referrer?: string;
}

/**
 * Track a download event
 * 
 * ⚠️ SERVER ONLY: Uses admin client with service role key
 */
export async function trackDownload(params: TrackDownloadParams): Promise<boolean> {
    const supabase = getSupabaseAdminClient();

    const { error } = await supabase
        .from('downloads')
        .insert({
            publication_id: params.publicationId,
            user_agent: params.userAgent || null,
            ip_hash: params.ipHash || null,
            country: params.country || null,
            referrer: params.referrer || null,
        });

    if (error) {
        console.error('Error tracking download:', error);
        return false;
    }

    return true;
}

// =============================================================================
// Storage Operations
// =============================================================================

/**
 * Get a signed URL for downloading a PDF
 * The URL expires after the specified duration
 */
export async function getSignedDownloadUrl(
    pdfPath: string,
    expiresInSeconds: number = 120 // 2 Minutes
): Promise<string | null> {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
        .storage
        .from(STORAGE.bucket)
        .createSignedUrl(pdfPath, expiresInSeconds);

    if (error) {
        console.error('Error creating signed URL:', error);
        return null;
    }

    return data.signedUrl;
}

/**
 * Get a public URL for a PDF (if bucket is public)
 */
export function getPublicDownloadUrl(pdfPath: string): string {
    const supabase = getSupabaseServerClient();

    const { data } = supabase
        .storage
        .from(STORAGE.bucket)
        .getPublicUrl(pdfPath);

    return data.publicUrl;
}

