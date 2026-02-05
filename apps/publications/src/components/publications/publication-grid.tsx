/**
 * Publication Grid Component
 * Grid layout for publication cards
 */

import type { PublicationWithStats } from "@/types";
import { PublicationCard } from "./publication-card";
import { cn } from "@/utils";

interface PublicationGridProps {
    publications: PublicationWithStats[];
    variant?: "default" | "featured";
    className?: string;
}

export function PublicationGrid({
    publications,
    variant = "default",
    className,
}: PublicationGridProps) {
    if (publications.length === 0) {
        return (
            <div className="py-16 text-center">
                <p className="text-neutral-500">No publications found.</p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "grid gap-6",
                variant === "featured"
                    ? "md:grid-cols-2 lg:grid-cols-3"
                    : "md:grid-cols-2 lg:grid-cols-3",
                className
            )}
        >
            {publications.map((publication) => (
                <PublicationCard
                    key={publication.id}
                    publication={publication}
                    variant={variant === "featured" ? "featured" : "default"}
                />
            ))}
        </div>
    );
}

