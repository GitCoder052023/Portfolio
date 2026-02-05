/**
 * Download Button Component
 * Button to download/open publication PDF
 */

"use client";

import { Download, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/utils";
import { useDownloads } from "@/hooks/use-downloads";

interface DownloadButtonProps {
    publicationId: string;
    title: string;
    variant?: "primary" | "secondary";
    size?: "default" | "lg";
    className?: string;
}

export function DownloadButton({
    publicationId,
    title,
    variant = "primary",
    size = "default",
    className,
}: DownloadButtonProps) {
    const { download, isLoading } = useDownloads();

    return (
        <button
            type="button"
            onClick={() => download(publicationId, title)}
            disabled={isLoading}
            className={cn(
                "btn",
                variant === "primary" ? "btn-primary" : "btn-secondary",
                size === "lg" ? "btn-lg" : "",
                className
            )}
            aria-label={`Download ${title}`}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Download className="h-4 w-4" />
            )}
            <span>Download PDF</span>
        </button>
    );
}

// Also export a simple open button for inline use
export function OpenPdfButton({
    publicationId,
    className,
}: {
    publicationId: string;
    className?: string;
}) {
    const { download, isLoading } = useDownloads();

    return (
        <button
            type="button"
            onClick={() => download(publicationId)}
            disabled={isLoading}
            className={cn("btn btn-ghost btn-icon", className)}
            aria-label="Open in new tab"
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <ExternalLink className="h-4 w-4" />
            )}
        </button>
    );
}

