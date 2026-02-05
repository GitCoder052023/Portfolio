/**
 * About Page
 * The philosophical identity of the author and the purpose of this space
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Feather, Compass } from "lucide-react";
import { Container } from "@/components/layout";
import { FadeIn, StaggerChildren } from "@/components/motion";
import { PAGE_ROUTES } from "@/constants";
import { authorConfig } from "@/configs/author.config";

export const metadata: Metadata = {
    title: "About",
    description: `${authorConfig.name} — ${authorConfig.credo}. A space for serious philosophical and scientific inquiry.`,
};

export default async function AboutPage() {
    return (
        <>
            {/* Hero Section — The Writer */}
            <section className="section bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
                <Container>
                    <FadeIn>
                        <div className="max-w-3xl">
                            <span className="badge badge-primary mb-4">The Writer</span>
                            <h1 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
                                {authorConfig.name}
                            </h1>
                            <p className="mt-6 text-xl text-neutral-700 font-serif italic leading-relaxed">
                                "{authorConfig.credo}"
                            </p>
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* Philosophy Section */}
            <section className="section bg-white">
                <Container>
                    <div className="max-w-3xl">
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                                    <Compass className="h-5 w-5 text-primary-600" />
                                </div>
                                <h2 className="font-serif text-2xl font-semibold text-neutral-900">
                                    The Philosophy
                                </h2>
                            </div>
                            <div className="prose prose-neutral prose-lg max-w-none">
                                <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                                    {authorConfig.philosophy}
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* Purpose Section */}
            <section className="section bg-neutral-50">
                <Container>
                    <div className="max-w-3xl">
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                                    <Feather className="h-5 w-5 text-primary-600" />
                                </div>
                                <h2 className="font-serif text-2xl font-semibold text-neutral-900">
                                    Why I Write
                                </h2>
                            </div>
                            <div className="prose prose-neutral prose-lg max-w-none">
                                <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                                    {authorConfig.purpose}
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* This Space Section */}
            <section className="section bg-white">
                <Container>
                    <div className="max-w-3xl">
                        <FadeIn>
                            <h2 className="font-serif text-2xl font-semibold text-neutral-900 mb-6">
                                What This Space Is
                            </h2>
                            <div className="prose prose-neutral prose-lg max-w-none">
                                <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                                    {authorConfig.spaceDescription}
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* Domains of Inquiry */}
            <section className="section bg-neutral-50">
                <Container>
                    <FadeIn>
                        <div className="max-w-3xl mb-10">
                            <h2 className="font-serif text-2xl font-semibold text-neutral-900">
                                Domains of Inquiry
                            </h2>
                            <p className="mt-3 text-neutral-600">
                                The fields I explore in my writings — where questions lead to more questions.
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                        {authorConfig.domains.map((domain) => (
                            <DomainCard key={domain.name} domain={domain} />
                        ))}
                    </StaggerChildren>
                </Container>
            </section>

            {/* Open Access Section */}
            <section className="section bg-white">
                <Container>
                    <div className="max-w-3xl">
                        <FadeIn>
                            <h2 className="font-serif text-2xl font-semibold text-neutral-900 mb-6">
                                Why Everything Is Open
                            </h2>
                            <div className="prose prose-neutral prose-lg max-w-none">
                                <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                                    {authorConfig.openAccessStatement}
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* Invitation Section */}
            <section className="section bg-primary-600">
                <Container>
                    <FadeIn>
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                    <MessageCircle className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="font-serif text-2xl font-semibold text-white">
                                    An Invitation
                                </h2>
                            </div>
                            <p className="text-primary-100 text-lg leading-relaxed whitespace-pre-line">
                                {authorConfig.invitation}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href={PAGE_ROUTES.publications}
                                    className="btn btn-lg bg-white text-primary-700 hover:bg-neutral-100 group"
                                >
                                    <span>Read the Writings</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </Container>
            </section>
        </>
    );
}

function DomainCard({ domain }: { domain: { name: string; description: string } }) {
    return (
        <div className="card hover:shadow-lg transition-shadow">
            <h3 className="font-serif text-lg font-semibold text-neutral-900 mb-2">
                {domain.name}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
                {domain.description}
            </p>
        </div>
    );
}
