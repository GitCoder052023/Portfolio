/**
 * Download API Route
 * GET /api/publications/[id]/download - Track download and return signed URL
 */

import { NextResponse, type NextRequest } from 'next/server';
import { getPublicationById, trackDownload, getSignedDownloadUrl } from '@/lib/supabase/queries';
import { createHash } from 'crypto';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Get the publication to verify it exists and get the PDF path
        const publication = await getPublicationById(id);

        if (!publication) {
            return NextResponse.json(
                { error: 'Publication not found' },
                { status: 404 }
            );
        }

        // Get request metadata for tracking
        const userAgent = request.headers.get('user-agent') || undefined;
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Hash the IP for privacy
        const ipHash = ip !== 'unknown'
            ? createHash('sha256').update(ip).digest('hex').slice(0, 16)
            : undefined;

        const referrer = request.headers.get('referer') || undefined;
        const country = request.headers.get('cf-ipcountry') || undefined; // Cloudflare

        // Track the download (fire and forget - don't block on this)
        trackDownload({
            publicationId: id,
            userAgent,
            ipHash,
            country,
            referrer,
        }).catch(err => console.error('Failed to track download:', err));

        // Get a signed URL for the PDF (valid for 1 hour)
        const signedUrl = await getSignedDownloadUrl(publication.pdfPath, 3600);

        if (!signedUrl) {
            return NextResponse.json(
                { error: 'Failed to generate download link' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            url: signedUrl,
            filename: `${publication.slug}.pdf`,
        });
    } catch (error) {
        console.error('Error processing download:', error);
        return NextResponse.json(
            { error: 'Failed to process download' },
            { status: 500 }
        );
    }
}
