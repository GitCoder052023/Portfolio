/**
 * Downloads Service
 * Business logic for downloads
 */

import { createHash } from 'crypto';
import { getPublicationById, trackDownload, getSignedDownloadUrl } from '@/database/interactions';
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

    console.log(`Generating signed URL for publication ${publicationId}`);
    console.log(`Using database pdfPath: ${publication.pdfPath}`);

    let signedUrl = null;
    if (publication.pdfPath) {
        signedUrl = await getSignedDownloadUrl(publication.pdfPath, 120);
    }

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
