/**
 * Download Button Component
 * Button to download/open publication PDF
 */

"use client";

import { useState } from "react";
import { Download, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { API_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_ROUTES.download(publicationId));

            if (!response.ok) {
                throw new Error("Failed to get download link");
            }

            const data = await response.json();

            if (data.url) {
                // Open PDF in new tab (browser's built-in PDF viewer)
                window.open(data.url, "_blank");
                toast.success("Opening PDF...");
            } else {
                throw new Error("No download URL received");
            }
        } catch (error) {
            console.error("Download error:", error);
            toast.error("Failed to open PDF. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
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
    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_ROUTES.download(publicationId));

            if (!response.ok) throw new Error("Failed to get link");

            const data = await response.json();

            if (data.url) {
                window.open(data.url, "_blank");
            }
        } catch (error) {
            toast.error("Failed to open PDF");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleOpen}
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
