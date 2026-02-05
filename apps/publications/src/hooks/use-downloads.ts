/**
 * useDownloads Hook
 * Manages the logic for downloading publications
 */

import { useState } from "react";
import { toast } from "sonner";
import { getDownloadLink } from "@/api/publications";

export function useDownloads() {
    const [isLoading, setIsLoading] = useState(false);

    const download = async (publicationId: string, title?: string) => {
        setIsLoading(true);
        try {
            const data = await getDownloadLink(publicationId);

            if (data.url) {
                // Open PDF in new tab
                window.open(data.url, "_blank");
                if (title) {
                    toast.success(`Opening PDF: ${title}`);
                }
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

    return {
        download,
        isLoading,
    };
}

