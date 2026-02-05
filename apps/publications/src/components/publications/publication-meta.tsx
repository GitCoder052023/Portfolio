/**
 * Publication Meta Component
 * Displays metadata for a publication (stats, category, date, etc.)
 */

import { Download, Heart, MessageCircle, Calendar, FileText, BookOpen } from "lucide-react";
import { appConfig } from "@/configs/app.config";
import type { PublicationWithStats } from "@/types";
import { cn } from "@/utils";

interface PublicationMetaProps {
    publication: PublicationWithStats;
    variant?: "default" | "compact";
    className?: string;
}

export function PublicationMeta({
    publication,
    variant = "default",
    className,
}: PublicationMetaProps) {
    const formattedDate = new Date(publication.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    if (variant === "compact") {
        return (
            <div className={cn("flex flex-wrap items-center gap-4 text-sm text-neutral-500", className)}>
                <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={publication.publishedAt}>{formattedDate}</time>
                </div>
                <div className="flex items-center gap-1.5">
                    <Download className="h-4 w-4" />
                    <span>{publication.stats.downloadCount.toLocaleString()}</span>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("space-y-4", className)}>
            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-3">
                <span className="text-neutral-300">|</span>
                <div className="flex items-center gap-1.5 text-neutral-600">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={publication.publishedAt} className="text-sm">
                        Published on {formattedDate}
                    </time>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
                <StatItem
                    icon={Download}
                    value={publication.stats.downloadCount}
                    label="Downloads"
                />
                <StatItem
                    icon={Heart}
                    value={publication.stats.likeCount}
                    label="Likes"
                />
                <StatItem
                    icon={MessageCircle}
                    value={publication.stats.commentCount}
                    label="Comments"
                />
                {publication.pageCount && (
                    <StatItem
                        icon={BookOpen}
                        value={publication.pageCount}
                        label="Pages"
                    />
                )}
                {publication.pdfSizeBytes && (
                    <StatItem
                        icon={FileText}
                        value={formatFileSize(publication.pdfSizeBytes)}
                        label="File Size"
                        isString
                    />
                )}
            </div>

            {/* Tags */}
            {publication.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {publication.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

interface StatItemProps {
    icon: React.ComponentType<{ className?: string }>;
    value: number | string;
    label: string;
    isString?: boolean;
}

function StatItem({ icon: Icon, value, label, isString }: StatItemProps) {
    return (
        <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-neutral-400" />
            <span className="font-medium text-neutral-800 tabular-nums">
                {isString ? value : (value as number).toLocaleString()}
            </span>
            <span className="text-sm text-neutral-500">{label}</span>
        </div>
    );
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

