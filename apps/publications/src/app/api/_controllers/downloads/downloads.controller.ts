/**
 * Downloads Controller
 * Handles HTTP layer for download endpoints
 */

import { NextResponse, type NextRequest } from 'next/server';
import * as downloadsService from './downloads.service';

export async function downloadPublication(request: NextRequest, publicationId: string) {
    try {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || undefined;
        const referrer = request.headers.get('referer') || undefined;
        const country = request.headers.get('cf-ipcountry') || undefined;

        const rateLimitResult = await downloadsService.checkRateLimit(ip);
        if (rateLimitResult.isRateLimited) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const result = await downloadsService.processDownload({
            publicationId,
            ip,
            userAgent,
            referrer,
            country,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: result.statusCode || 500 }
            );
        }

        return NextResponse.json({
            url: result.url,
            filename: result.filename,
        });
    } catch (error) {
        console.error('Error in download controller:', error);
        return NextResponse.json(
            { error: 'Failed to process download' },
            { status: 500 }
        );
    }
}
