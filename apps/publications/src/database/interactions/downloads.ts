/**
 * Downloads Queries
 * Database operations for tracking downloads
 */

import { getSupabaseServerClient, getSupabaseAdminClient } from '@/services/supabase/server';
import { STORAGE } from '@/constants';

// =============================================================================
// Read Operations (using anon key)
// =============================================================================


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
    const supabase = getSupabaseAdminClient();

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


