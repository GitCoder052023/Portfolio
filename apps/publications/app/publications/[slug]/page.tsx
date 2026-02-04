/**
 * Single Publication Page
 * Displays a single publication with full details, download, like, and comments
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Container } from "@/components/layout";
import {
    PublicationMeta,
    DownloadButton,
    ShareButton,
    LikeButton,
    CommentSection,
    PublicationCard,
} from "@/components/publications";
import { FadeIn } from "@/components/motion";
import {
    getPublicationBySlug,
    getRelatedPublications,
    getComments,
    hasUserLiked,
    getUserByClerkId,
} from "@/lib/supabase/queries";
import { PAGE_ROUTES } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";

interface PublicationPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PublicationPageProps): Promise<Metadata> {
    const { slug } = await params;
    const publication = await getPublicationBySlug(slug);

    if (!publication) {
        return {
            title: "Publication Not Found",
        };
    }

    return {
        title: publication.title,
        description: publication.description || publication.abstract || undefined,
        keywords: publication.tags,
        openGraph: {
            title: publication.title,
            description: publication.description || undefined,
            type: "article",
            publishedTime: publication.publishedAt,
        },
    };
}

export default async function PublicationPage({ params }: PublicationPageProps) {
    const { slug } = await params;

    const publication = await getPublicationBySlug(slug);

    if (!publication) {
        notFound();
    }

    // Get related publications, comments, and user like status in parallel
    const { userId: clerkUserId } = await auth();

    const [relatedPublications, comments, isLiked] = await Promise.all([
        getRelatedPublications(publication.id, publication.category, 3),
        getComments(publication.id),
        clerkUserId
            ? getUserByClerkId(clerkUserId).then(user =>
                user ? hasUserLiked(publication.id, user.id) : false
            )
            : Promise.resolve(false),
    ]);

    return (
        <article className="min-h-screen">
            {/* Header Section */}
            <section className="bg-gradient-to-b from-neutral-50 to-white border-b border-neutral-100">
                <Container className="py-12 md:py-20">
                    <FadeIn>
                        {/* Back link */}
                        <Link
                            href={PAGE_ROUTES.publications}
                            className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to Publications</span>
                        </Link>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        {/* Title */}
                        <h1 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl max-w-4xl text-balance">
                            {publication.title}
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        {/* Metadata */}
                        <div className="mt-8">
                            <PublicationMeta publication={publication} />
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        {/* Action buttons */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <DownloadButton
                                publicationId={publication.id}
                                title={publication.title}
                                variant="primary"
                                size="lg"
                            />
                            <LikeButton
                                publicationId={publication.id}
                                initialLikeCount={publication.stats.likeCount}
                                initialIsLiked={isLiked}
                            />
                            <ShareButton
                                url={PAGE_ROUTES.publication(publication.slug)}
                                title={publication.title}
                                description={publication.description || undefined}
                            />
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* Abstract Section */}
            {publication.abstract && (
                <section className="section bg-white">
                    <Container size="prose">
                        <FadeIn>
                            <div className="flex items-center gap-2 mb-6">
                                <BookOpen className="h-5 w-5 text-primary-600" />
                                <h2 className="font-serif text-xl font-semibold text-neutral-900">
                                    Abstract
                                </h2>
                            </div>
                            <div className="prose text-neutral-700 leading-relaxed">
                                <p>{publication.abstract}</p>
                            </div>
                        </FadeIn>
                    </Container>
                </section>
            )}

            {/* Description Section */}
            {publication.description && !publication.abstract && (
                <section className="section bg-white">
                    <Container size="prose">
                        <FadeIn>
                            <div className="prose text-neutral-700 leading-relaxed">
                                <p>{publication.description}</p>
                            </div>
                        </FadeIn>
                    </Container>
                </section>
            )}

            {/* Download CTA */}
            <section className="py-12 bg-primary-50 border-y border-primary-100">
                <Container>
                    <FadeIn>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                            <div>
                                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                                    Ready to Read?
                                </h3>
                                <p className="mt-2 text-neutral-600">
                                    Download the full PDF to read offline or open in your browser.
                                </p>
                            </div>
                            <DownloadButton
                                publicationId={publication.id}
                                title={publication.title}
                                variant="primary"
                                size="lg"
                            />
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* Comments Section */}
            <section className="section bg-white">
                <Container size="prose">
                    <FadeIn>
                        <CommentSection
                            publicationId={publication.id}
                            initialComments={comments}
                        />
                    </FadeIn>
                </Container>
            </section>

            {/* Related Publications */}
            {relatedPublications.length > 0 && (
                <section className="section bg-neutral-50">
                    <Container>
                        <FadeIn>
                            <h2 className="font-serif text-2xl font-semibold text-neutral-900 mb-8">
                                Related Publications
                            </h2>
                        </FadeIn>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedPublications.map((pub) => (
                                <PublicationCard key={pub.id} publication={pub} />
                            ))}
                        </div>
                    </Container>
                </section>
            )}
        </article>
    );
}
