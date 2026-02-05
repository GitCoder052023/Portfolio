/**
 * Home Page
 * Landing page — the entrance to this intellectual space
 */

import Link from "next/link";
import { ArrowRight, MessageCircle, Feather, Quote } from "lucide-react";
import { Container } from "@/components/layout";
import { PublicationGrid } from "@/components/publications";
import { FadeIn, StaggerChildren } from "@/components/motion";
import { getFeaturedPublications, getPublicationCount } from "@/database/interactions";
import { PAGE_ROUTES } from "@/constants";
import { authorConfig } from "@/configs/author.config";

export default async function HomePage() {
  // Fetch featured publications and stats
  const [featuredPublications] = await Promise.all([
    getFeaturedPublications(6),
    getPublicationCount(),
  ]);

  return (
    <>
      {/* Hero Section — The Opening */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        <Container className="py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="badge badge-accent mb-4">
                {authorConfig.name}
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl text-balance">
                A Public Journal of{" "}
                <span className="gradient-text">Philosophical & Scientific Inquiry</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <blockquote className="mt-8 border-l-4 border-primary-400 pl-6">
                <p className="text-xl text-neutral-700 font-serif italic">
                  "{authorConfig.credo}"
                </p>
              </blockquote>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={PAGE_ROUTES.publications}
                  className="btn btn-primary btn-lg group"
                >
                  <span>Explore the Writings</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={PAGE_ROUTES.about}
                  className="btn btn-secondary btn-lg"
                >
                  About the Writer
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>

        {/* Decorative elements */}
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-primary-100/40 blur-3xl" />
        <div className="absolute -left-20 bottom-20 h-56 w-56 rounded-full bg-accent-300/20 blur-3xl" />
      </section>

      {/* What This Space Is */}
      <section className="section bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                    <Feather className="h-5 w-5 text-primary-600" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl">
                    What This Space Is
                  </h2>
                </div>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    This is <span className="font-medium text-neutral-900">not a blog</span>.
                    This is <span className="font-medium text-neutral-900">not a portfolio</span>.
                  </p>
                  <p>
                    This is a public journal of serious inquiry — a place where I publish
                    formal writings, theories, research, and proposals on the questions
                    that resist easy answers.
                  </p>
                  <p>
                    Every piece here is meant to be <span className="font-medium text-neutral-900">engaged with</span>,
                    <span className="font-medium text-neutral-900"> challenged</span>, and
                    <span className="font-medium text-neutral-900"> built upon</span>.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                    <MessageCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl">
                    Why It's Public
                  </h2>
                </div>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    I write to document, to think aloud, and to invite intellectual conversation.
                  </p>
                  <p>
                    Ideas refined in isolation stagnate. I want to hear your
                    <span className="font-medium text-neutral-900"> arguments</span>, your
                    <span className="font-medium text-neutral-900"> objections</span>, your
                    <span className="font-medium text-neutral-900"> alternative perspectives</span>.
                  </p>
                  <p>
                    If you disagree with something I've written,
                    <span className="font-medium text-neutral-900"> I want to know</span>.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Domains of Inquiry */}
      <section className="section bg-neutral-50">
        <Container>
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl">
                Domains of Inquiry
              </h2>
              <p className="mt-3 text-neutral-600">
                The fields I explore — where questions lead to more questions.
              </p>
            </div>
          </FadeIn>

          <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {authorConfig.domains.map((domain) => (
              <DomainCard key={domain.name} domain={domain} />
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* Featured Publications */}
      {featuredPublications.length > 0 && (
        <section className="section bg-white">
          <Container>
            <FadeIn>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl">
                    Featured Writings
                  </h2>
                  <p className="mt-2 text-neutral-600">
                    Recent publications open for reading and discussion
                  </p>
                </div>
                <Link
                  href={PAGE_ROUTES.publications}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View all writings
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>

            <PublicationGrid
              publications={featuredPublications}
              variant="featured"
            />

            <FadeIn>
              <div className="mt-10 text-center sm:hidden">
                <Link
                  href={PAGE_ROUTES.publications}
                  className="btn btn-secondary"
                >
                  View All Writings
                </Link>
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* Invitation CTA */}
      <section className="section bg-primary-600">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl text-center">
                Ideas Are Meant to Be Challenged
              </h2>
              <p className="mt-6 text-primary-100 text-center text-lg leading-relaxed max-w-2xl mx-auto">
                If you see a flaw in my reasoning, point it out. If you have a better argument, make it.
                The purpose of publishing is not to broadcast conclusions, but to begin conversations.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href={PAGE_ROUTES.publications}
                  className="btn btn-lg bg-white text-primary-700 hover:bg-neutral-100 group"
                >
                  <span>Read the Writings</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={PAGE_ROUTES.signUp}
                  className="btn btn-lg bg-primary-700 text-white hover:bg-primary-800"
                >
                  Join the Discussion
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
    <div className="card hover:shadow-lg transition-shadow group">
      <h3 className="font-serif text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
        {domain.name}
      </h3>
      <p className="text-sm text-neutral-600 leading-relaxed">
        {domain.description}
      </p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number | string;
  label: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
      </div>
      <div className="font-serif text-3xl font-bold text-neutral-900">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div className="text-sm font-medium text-neutral-700 mt-1">{label}</div>
      <div className="text-xs text-neutral-500 mt-0.5">{description}</div>
    </div>
  );
}
