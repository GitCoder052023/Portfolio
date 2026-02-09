/**
 * Downloads Service
 * Business logic for downloads
 */

import { createHash } from 'crypto';
import { getPublicationById, trackDownload, getSignedDownloadUrl } from '@/database/interactions';
import { STORAGE } from '@/constants';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
});

interface ProcessDownloadParams {
    publicationId: string;
    ip: string;
    userAgent?: string;
    referrer?: string;
    country?: string;
}

export async function checkRateLimit(ip: string) {
    return limiter.check(10, `DOWNLOAD_GET_${ip}`);
}

export async function processDownload(params: ProcessDownloadParams) {
    const { publicationId, ip, userAgent, referrer, country } = params;

    const publication = await getPublicationById(publicationId);

    if (!publication) {
        return {
            success: false,
            error: 'Publication not found',
            statusCode: 404,
        };
    }

    const ipHash = ip !== 'unknown'
        ? createHash('sha256').update(ip).digest('hex').slice(0, 16)
        : undefined;

    trackDownload({
        publicationId,
        userAgent,
        ipHash,
        country,
        referrer,
    }).catch(err => console.error('Failed to track download:', err));

    const categoryFolder = STORAGE.folders[publication.category as keyof typeof STORAGE.folders];
    const correctPdfPath = `${categoryFolder}/${publication.title}.pdf`;

    console.log(`Generating signed URL for publication ${publicationId}`);
    console.log(`Original PDF path (DB): ${publication.pdfPath}`);
    console.log(`Using Storage path: ${correctPdfPath}`);

    const signedUrl = await getSignedDownloadUrl(correctPdfPath, 120);

    if (!signedUrl) {
        return {
            success: false,
            error: 'Failed to generate download link',
            statusCode: 500,
        };
    }

    return {
        success: true,
        url: signedUrl,
        filename: `${publication.slug}.pdf`,
    };
}
