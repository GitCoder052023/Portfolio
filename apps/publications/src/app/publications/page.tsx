/**
 * Publications List Page
 * Lists all publications with filtering and pagination
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout";
import { PublicationGrid } from "@/components/publications";
import { FadeIn } from "@/components/motion";
import { getPublications } from "@/database/interactions";
import { PAGE_ROUTES, SEO } from "@/constants";
import { appConfig, type CategoryId } from "@/configs/app.config";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { cn } from "@/utils";

export const metadata: Metadata = {
    title: "Publications",
    description: "Browse all research papers, theses, ideas, and proposals. Free to read and download.",
};

interface PublicationsPageProps {
    searchParams: Promise<{
        page?: string;
        category?: string;
        search?: string;
    }>;
}

export default async function PublicationsPage({ searchParams }: PublicationsPageProps) {
    const params = await searchParams;
    const page = parseInt(params.page || "1", 10);
    const category = params.category as CategoryId | undefined;
    const search = params.search;

    const { publications, total, totalPages } = await getPublications({
        page,
        pageSize: 12,
        category,
        search,
    });

    const activeCategory = category
        ? appConfig.categories.find((c) => c.id === category)
        : null;

    return (
        <section className="section bg-white min-h-screen">
            <Container>
                {/* Header */}
                <FadeIn>
                    <div className="mb-10">
                        <h1 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
                            {activeCategory ? activeCategory.label : "All Publications"}
                        </h1>
                        <p className="mt-3 text-neutral-600">
                            {activeCategory
                                ? activeCategory.description
                                : `${total.toLocaleString()} publications available for reading and download`}
                        </p>
                    </div>
                </FadeIn>

                {/* Filters */}
                <FadeIn delay={0.1}>
                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-neutral-200">
                        <div className="flex items-center gap-2 text-sm text-neutral-500">
                            <Filter className="h-4 w-4" />
                            <span>Category:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <CategoryFilter
                                href={PAGE_ROUTES.publications}
                                isActive={!category}
                            >
                                All
                            </CategoryFilter>
                            {appConfig.categories.map((cat) => (
                                <CategoryFilter
                                    key={cat.id}
                                    href={`${PAGE_ROUTES.publications}?category=${cat.id}`}
                                    isActive={category === cat.id}
                                >
                                    {cat.label}
                                </CategoryFilter>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Publications Grid */}
                <PublicationGrid publications={publications} />

                {/* Pagination */}
                {totalPages > 1 && (
                    <FadeIn delay={0.2}>
                        <div className="mt-12 flex items-center justify-center gap-2">
                            <PaginationLink
                                href={buildPaginationUrl(page - 1, category, search)}
                                disabled={page <= 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only md:not-sr-only">Previous</span>
                            </PaginationLink>

                            <div className="flex items-center gap-1">
                                {generatePageNumbers(page, totalPages).map((pageNum, index) => (
                                    pageNum === "..." ? (
                                        <span key={`ellipsis-${index}`} className="px-2 text-neutral-400">
                                            ...
                                        </span>
                                    ) : (
                                        <PaginationLink
                                            key={pageNum}
                                            href={buildPaginationUrl(pageNum as number, category, search)}
                                            isActive={page === pageNum}
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    )
                                ))}
                            </div>

                            <PaginationLink
                                href={buildPaginationUrl(page + 1, category, search)}
                                disabled={page >= totalPages}
                            >
                                <span className="sr-only md:not-sr-only">Next</span>
                                <ChevronRight className="h-4 w-4" />
                            </PaginationLink>
                        </div>
                    </FadeIn>
                )}

                {/* Empty State */}
                {publications.length === 0 && (
                    <FadeIn>
                        <div className="text-center py-16">
                            <p className="text-lg text-neutral-600">
                                No publications found{category ? ` in ${activeCategory?.label}` : ""}.
                            </p>
                            {category && (
                                <Link
                                    href={PAGE_ROUTES.publications}
                                    className="mt-4 inline-block text-primary-600 hover:underline"
                                >
                                    View all publications
                                </Link>
                            )}
                        </div>
                    </FadeIn>
                )}
            </Container>
        </section>
    );
}

function CategoryFilter({
    href,
    isActive,
    children,
}: {
    href: string;
    isActive: boolean;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
                isActive
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            )}
        >
            {children}
        </Link>
    );
}

function PaginationLink({
    href,
    disabled,
    isActive,
    children,
}: {
    href: string;
    disabled?: boolean;
    isActive?: boolean;
    children: React.ReactNode;
}) {
    if (disabled) {
        return (
            <span className="px-3 py-2 text-sm text-neutral-300 cursor-not-allowed flex items-center gap-1">
                {children}
            </span>
        );
    }

    return (
        <Link
            href={href}
            className={cn(
                "px-3 py-2 text-sm font-medium rounded-md flex items-center gap-1 transition-colors",
                isActive
                    ? "bg-primary-600 text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
            )}
        >
            {children}
        </Link>
    );
}

function buildPaginationUrl(
    page: number,
    category?: string,
    search?: string
): string {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    const queryString = params.toString();
    return `${PAGE_ROUTES.publications}${queryString ? `?${queryString}` : ""}`;
}

function generatePageNumbers(
    current: number,
    total: number
): (number | "...")[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
        return [1, 2, 3, 4, 5, "...", total];
    }

    if (current >= total - 2) {
        return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, "...", current - 1, current, current + 1, "...", total];
}

