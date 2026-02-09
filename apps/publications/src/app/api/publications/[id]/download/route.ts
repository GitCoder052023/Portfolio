/**
 * Download API Route
 * GET /api/publications/[id]/download - Track download and return signed URL
 * Router - delegates to controller
 */

import { type NextRequest } from 'next/server';
import * as downloadsController from '@/app/api/_controllers/downloads/downloads.controller';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: publicationId } = await params;
    return downloadsController.downloadPublication(request, publicationId);
}
