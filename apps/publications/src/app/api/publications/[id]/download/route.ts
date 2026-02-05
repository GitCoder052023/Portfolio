/**
 * Download API Route
 * GET /api/publications/[id]/download - Track download and return signed URL
 */

import { NextResponse, type NextRequest } from 'next/server';
import { getPublicationById, trackDownload, getSignedDownloadUrl } from '@/database/interactions';
import { createHash } from 'crypto';
import { STORAGE } from '@/constants';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
});

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Rate Limiting & Metadata
        const userAgent = request.headers.get('user-agent') || undefined;
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';

        const { isRateLimited } = limiter.check(10, `DOWNLOAD_GET_${ip}`); // 10 downloads per minute per IP

        if (isRateLimited) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // Get the publication to verify it exists and get the PDF path
        const publication = await getPublicationById(id);

        if (!publication) {
            return NextResponse.json(
                { error: 'Publication not found' },
                { status: 404 }
            );
        }

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

        // Get a signed URL for the PDF (valid for 2 Minute)
        // CONSTRUCTION: folder/Title.pdf
        const categoryFolder = STORAGE.folders[publication.category as keyof typeof STORAGE.folders];
        const correctPdfPath = `${categoryFolder}/${publication.title}.pdf`;

        console.log(`Generating signed URL for publication ${id}`);
        console.log(`Original PDF path (DB): ${publication.pdfPath}`);
        console.log(`Using Storage path: ${correctPdfPath}`);

        const signedUrl = await getSignedDownloadUrl(correctPdfPath, 120);

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

