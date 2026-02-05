/**
 * Single Publication API Route
 * GET /api/publications/[id] - Get a single publication by ID
 */

import { NextResponse, type NextRequest } from 'next/server';
import { getPublicationById } from '@/database/interactions';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const publication = await getPublicationById(id);

        if (!publication) {
            return NextResponse.json(
                { error: 'Publication not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ publication });
    } catch (error) {
        console.error('Error fetching publication:', error);
        return NextResponse.json(
            { error: 'Failed to fetch publication' },
            { status: 500 }
        );
    }
}

