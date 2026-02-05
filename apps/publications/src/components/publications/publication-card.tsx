/**
 * Publication Card Component
 * Card display for a publication in list views
 */

"use client";

import Link from "next/link";
import { Download, Heart, MessageCircle, Calendar, FileText } from "lucide-react";
import { motion } from "motion/react";
import { PAGE_ROUTES } from "@/constants";
import { appConfig } from "@/configs/app.config";
import type { PublicationWithStats } from "@/types";
import { cn } from "@/utils";

interface PublicationCardProps {
    publication: PublicationWithStats;
    variant?: "default" | "featured";
}

export function PublicationCard({ publication, variant = "default" }: PublicationCardProps) {
    const category = appConfig.categories.find((c) => c.id === publication.category);
    const formattedDate = new Date(publication.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const isFeatured = variant === "featured";

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <Link
                href={PAGE_ROUTES.publication(publication.slug)}
                className={cn(
                    "group block rounded-xl border border-neutral-200 bg-white p-6",
                    "transition-all duration-300",
                    "hover:border-neutral-300 hover:shadow-lg hover:-translate-y-0.5",
                    isFeatured && "md:p-8"
                )}
            >
                {/* Header: Category & Date */}
                <div className="flex items-center justify-between gap-4">
                    <span className="badge badge-primary">
                        {category?.label || publication.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={publication.publishedAt}>{formattedDate}</time>
                    </div>
                </div>

                {/* Title */}
                <h3
                    className={cn(
                        "mt-4 font-serif font-semibold text-neutral-900",
                        "group-hover:text-primary-600 transition-colors",
                        isFeatured ? "text-xl md:text-2xl" : "text-lg"
                    )}
                >
                    {publication.title}
                </h3>

                {/* Description */}
                {publication.description && (
                    <p
                        className={cn(
                            "mt-3 text-neutral-600 line-clamp-2",
                            isFeatured ? "text-base" : "text-sm"
                        )}
                    >
                        {publication.description}
                    </p>
                )}

                {/* Tags */}
                {publication.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {publication.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                        {publication.tags.length > 3 && (
                            <span className="text-xs text-neutral-400">
                                +{publication.tags.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                {/* Footer: Stats */}
                <div className="mt-5 flex items-center gap-4 pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                        <Download className="h-4 w-4" />
                        <span>{publication.stats.downloadCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                        <Heart className="h-4 w-4" />
                        <span>{publication.stats.likeCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                        <MessageCircle className="h-4 w-4" />
                        <span>{publication.stats.commentCount.toLocaleString()}</span>
                    </div>
                    {publication.pdfSizeBytes && (
                        <div className="ml-auto flex items-center gap-1.5 text-xs text-neutral-400">
                            <FileText className="h-3.5 w-3.5" />
                            <span>{formatFileSize(publication.pdfSizeBytes)}</span>
                        </div>
                    )}
                </div>
            </Link>
        </motion.article>
    );
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

