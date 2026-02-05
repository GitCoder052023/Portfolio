/**
 * Publication Model
 * Transformers and business logic for Publication entities
 */

import type { Publication, PublicationWithStats } from "@/types";
import type { CategoryId } from "@/configs/app.config";
import type { PublicationRow, PublicationStatsRow } from "../schemas/publications.schema";

/**
 * Transform a database row to a Publication entity
 */
export function transformPublicationRow(row: PublicationRow): Publication {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        description: row.description,
        abstract: row.abstract,
        category: row.category as CategoryId,
        tags: row.tags || [],
        pdfPath: row.pdf_path,
        pdfSizeBytes: row.pdf_size_bytes,
        pageCount: row.page_count,
        publishedAt: row.published_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        isFeatured: row.is_featured,
        isPublished: row.is_published,
    };
}

/**
 * Merge a publication entity with its stats
 */
export function mergeWithStats(
    publication: Publication,
    stats: PublicationStatsRow | null
): PublicationWithStats {
    return {
        ...publication,
        stats: {
            downloadCount: stats?.download_count ?? 0,
            likeCount: stats?.like_count ?? 0,
            commentCount: stats?.comment_count ?? 0,
        },
    };
}

/**
 * Business Logic: Check if a publication is considered "new" (published within 30 days)
 */
export function isPublicationNew(publication: Publication): boolean {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(publication.publishedAt) > thirtyDaysAgo;
}
