/**
 * Publications API Route
 * GET /api/publications - List all publications with optional filtering
 * Router - delegates to controller
 */

import { type NextRequest } from 'next/server';
import * as publicationsController from '@/app/api/_controllers/publications/publications.controller';

export async function GET(request: NextRequest) {
    return publicationsController.getPublications(request);
}
