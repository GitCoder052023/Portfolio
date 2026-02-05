/**
 * Category Page
 * Lists publications filtered by category
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout";
import { PublicationGrid } from "@/components/publications";
import { FadeIn } from "@/components/motion";
import { getPublicationsByCategory } from "@/database/interactions";
import { PAGE_ROUTES } from "@/constants";
import { appConfig, type CategoryId } from "@/configs/app.config";
import { cn } from "@/utils";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params;
    const categoryInfo = appConfig.categories.find((c) => c.id === category);

    if (!categoryInfo) {
        return { title: "Category Not Found" };
    }

    return {
        title: categoryInfo.label,
        description: categoryInfo.description,
    };
}

export function generateStaticParams() {
    return appConfig.categories.map((category) => ({
        category: category.id,
    }));
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { category } = await params;
    const { page: pageParam } = await searchParams;

    const categoryInfo = appConfig.categories.find((c) => c.id === category);

    if (!categoryInfo) {
        notFound();
    }

    const page = parseInt(pageParam || "1", 10);

    const { publications, total, totalPages } = await getPublicationsByCategory(
        category as CategoryId,
        { page, pageSize: 12 }
    );

    return (
        <section className="section bg-white min-h-screen">
            <Container>
                {/* Back link */}
                <FadeIn>
                    <Link
                        href={PAGE_ROUTES.publications}
                        className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>All Publications</span>
                    </Link>
                </FadeIn>

                {/* Header */}
                <FadeIn delay={0.1}>
                    <div className="mb-10">
                        <span className="badge badge-primary mb-3">{total} Publications</span>
                        <h1 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
                            {categoryInfo.label}
                        </h1>
                        <p className="mt-3 text-neutral-600 max-w-2xl">
                            {categoryInfo.description}
                        </p>
                    </div>
                </FadeIn>

                {/* Other Categories */}
                <FadeIn delay={0.2}>
                    <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-neutral-200">
                        {appConfig.categories
                            .filter((c) => c.id !== category)
                            .map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={PAGE_ROUTES.category(cat.id)}
                                    className="px-3 py-1.5 text-sm font-medium rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                                >
                                    {cat.label}
                                </Link>
                            ))}
                    </div>
                </FadeIn>

                {/* Publications Grid */}
                <PublicationGrid publications={publications} />

                {/* Pagination */}
                {totalPages > 1 && (
                    <FadeIn delay={0.3}>
                        <div className="mt-12 flex items-center justify-center gap-4">
                            {page > 1 && (
                                <Link
                                    href={`${PAGE_ROUTES.category(category)}${page > 2 ? `?page=${page - 1}` : ""}`}
                                    className="btn btn-secondary"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Previous
                                </Link>
                            )}
                            <span className="text-sm text-neutral-500">
                                Page {page} of {totalPages}
                            </span>
                            {page < totalPages && (
                                <Link
                                    href={`${PAGE_ROUTES.category(category)}?page=${page + 1}`}
                                    className="btn btn-secondary"
                                >
                                    Next
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            )}
                        </div>
                    </FadeIn>
                )}

                {/* Empty State */}
                {publications.length === 0 && (
                    <FadeIn>
                        <div className="text-center py-16">
                            <p className="text-lg text-neutral-600">
                                No publications in this category yet.
                            </p>
                            <Link
                                href={PAGE_ROUTES.publications}
                                className="mt-4 inline-block text-primary-600 hover:underline"
                            >
                                View all publications
                            </Link>
                        </div>
                    </FadeIn>
                )}
            </Container>
        </section>
    );
}

