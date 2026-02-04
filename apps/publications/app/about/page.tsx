/**
 * About Page
 * Information about the author and the publication platform
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Users, Download } from "lucide-react";
import { Container } from "@/components/layout";
import { FadeIn, StaggerChildren } from "@/components/motion";
import { getPublicationCount } from "@/lib/supabase/queries";
import { PAGE_ROUTES } from "@/lib/constants";
import { appConfig } from "@/lib/config";

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about the author and this publication platform.",
};

export default async function AboutPage() {
    const publicationCount = await getPublicationCount();

    return (
        <>
            {/* Hero Section */}
            <section className="section bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
                <Container>
                    <FadeIn>
                        <div className="max-w-3xl">
                            <span className="badge badge-primary mb-4">About</span>
                            <h1 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
                                Sharing Knowledge Through{" "}
                                <span className="gradient-text">Open Publications</span>
                            </h1>
                            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                                This platform serves as a repository for my formal academic writings,
                                research papers, theses, ideas, and proposals. All content is freely
                                accessible to anyone who wishes to read, learn, and share.
                            </p>
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* Mission Section */}
            <section className="section bg-white">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
                        <FadeIn>
                            <div>
                                <h2 className="font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl">
                                    The Mission
                                </h2>
                                <div className="mt-6 space-y-4 text-neutral-600 leading-relaxed">
                                    <p>
                                        Knowledge should be accessible to everyone. This platform embodies
                                        that belief by making all publications freely available without
                                        requiring registration or payment.
                                    </p>
                                    <p>
                                        Whether you&apos;re a fellow researcher, a student, or simply
                                        someone curious about the topics covered here, you&apos;re welcome
                                        to explore, download, and share any publication.
                                    </p>
                                    <p>
                                        The only requirement for engagement—liking and commenting—is
                                        creating a free account, which helps foster meaningful discussions
                                        around the content.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <StaggerChildren className="grid grid-cols-2 gap-4">
                                <StatCard
                                    icon={BookOpen}
                                    value={publicationCount}
                                    label="Publications"
                                />
                                <StatCard
                                    icon={FileText}
                                    value={appConfig.categories.length}
                                    label="Categories"
                                />
                                <StatCard
                                    icon={Download}
                                    value="Free"
                                    label="All Downloads"
                                />
                                <StatCard
                                    icon={Users}
                                    value="Open"
                                    label="Access"
                                />
                            </StaggerChildren>
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* Topics Section */}
            <section className="section bg-neutral-50">
                <Container>
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl">
                                Publication Categories
                            </h2>
                            <p className="mt-3 text-neutral-600 max-w-lg mx-auto">
                                Explore writings across different formats and subject areas
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {appConfig.categories.map((category) => (
                            <Link
                                key={category.id}
                                href={PAGE_ROUTES.category(category.id)}
                                className="group card card-interactive"
                            >
                                <h3 className="font-serif text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                                    {category.label}
                                </h3>
                                <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                                    {category.description}
                                </p>
                                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-600">
                                    <span>Browse</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </StaggerChildren>
                </Container>
            </section>

            {/* Access Section */}
            <section className="section bg-white">
                <Container>
                    <FadeIn>
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl">
                                Open Access Philosophy
                            </h2>
                            <p className="mt-6 text-neutral-600 leading-relaxed">
                                Every publication on this platform is available under open access principles.
                                You can read, download, and share any document without restrictions.
                                Attribution is appreciated when referencing the work.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <Link href={PAGE_ROUTES.publications} className="btn btn-primary btn-lg">
                                    Browse Publications
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* Contact Section */}
            <section className="section bg-primary-600">
                <Container>
                    <FadeIn>
                        <div className="text-center">
                            <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                                Get in Touch
                            </h2>
                            <p className="mt-4 text-primary-100 max-w-lg mx-auto">
                                Have questions about a publication or interested in collaboration?
                                Feel free to reach out through the comments or connect via social media.
                            </p>
                        </div>
                    </FadeIn>
                </Container>
            </section>
        </>
    );
}

function StatCard({
    icon: Icon,
    value,
    label,
}: {
    icon: React.ComponentType<{ className?: string }>;
    value: number | string;
    label: string;
}) {
    return (
        <div className="card text-center">
            <div className="flex justify-center mb-3">
                <div className="rounded-lg bg-primary-100 p-3">
                    <Icon className="h-6 w-6 text-primary-600" />
                </div>
            </div>
            <div className="font-serif text-2xl font-bold text-neutral-900">
                {typeof value === "number" ? value.toLocaleString() : value}
            </div>
            <div className="text-sm text-neutral-500">{label}</div>
        </div>
    );
}
