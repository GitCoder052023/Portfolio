/**
 * Home Page
 * Landing page with hero and featured publications
 */

import Link from "next/link";
import { ArrowRight, BookOpen, Download, Users } from "lucide-react";
import { Container } from "@/components/layout";
import { PublicationGrid } from "@/components/publications";
import { FadeIn, StaggerChildren } from "@/components/motion";
import { getFeaturedPublications, getPublicationCount } from "@/database/interactions";
import { PAGE_ROUTES } from "@/constants";
import { appConfig } from "@/configs/app.config";

export default async function HomePage() {
  // Fetch featured publications and stats
  const [featuredPublications, totalPublications] = await Promise.all([
    getFeaturedPublications(6),
    getPublicationCount(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        <Container className="py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="badge badge-accent mb-4">
                Open Access Publications
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl text-balance">
                Formal Writings &{" "}
                <span className="gradient-text">Research Publications</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
                A curated collection of research papers, theses, ideas, and proposals.
                All publications are freely accessible—read, download, and share
                without restrictions.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={PAGE_ROUTES.publications}
                  className="btn btn-primary btn-lg group"
                >
                  <span>Browse Publications</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={PAGE_ROUTES.about}
                  className="btn btn-secondary btn-lg"
                >
                  About the Author
                </Link>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.4}>
              <div className="mt-12 flex flex-wrap gap-8">
                <StatCard
                  icon={BookOpen}
                  value={totalPublications}
                  label="Publications"
                />
                <StatCard
                  icon={Download}
                  value="Free"
                  label="All Downloads"
                />
                <StatCard
                  icon={Users}
                  value="Open"
                  label="No Login Required"
                />
              </div>
            </FadeIn>
          </div>
        </Container>

        {/* Decorative elements */}
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-primary-100/40 blur-3xl" />
        <div className="absolute -left-20 bottom-20 h-56 w-56 rounded-full bg-accent-300/20 blur-3xl" />
      </section>

      {/* Featured Publications */}
      {featuredPublications.length > 0 && (
        <section className="section bg-white">
          <Container>
            <FadeIn>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl">
                    Featured Publications
                  </h2>
                  <p className="mt-2 text-neutral-600">
                    Highlighted research and writings
                  </p>
                </div>
                <Link
                  href={PAGE_ROUTES.publications}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View all
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
                  View All Publications
                </Link>
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* Categories Section */}
      <section className="section bg-neutral-50">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl">
                Browse by Category
              </h2>
              <p className="mt-3 text-neutral-600 max-w-lg mx-auto">
                Explore publications organized by type and subject matter
              </p>
            </div>
          </FadeIn>

          <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {appConfig.categories.map((category) => (
              <Link
                key={category.id}
                href={PAGE_ROUTES.category(category.id)}
                className="group card card-interactive text-center"
              >
                <h3 className="font-serif text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {category.label}
                </h3>
                <p className="mt-2 text-sm text-neutral-500">
                  {category.description}
                </p>
              </Link>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600">
        <Container>
          <FadeIn>
            <div className="text-center py-8">
              <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                All Publications Are Free to Access
              </h2>
              <p className="mt-4 text-primary-100 max-w-lg mx-auto">
                No sign-up required to read, download, or share.
                Join the discussion by creating a free account.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href={PAGE_ROUTES.publications}
                  className="btn btn-lg bg-white text-primary-700 hover:bg-neutral-100"
                >
                  Start Reading
                </Link>
                <Link
                  href={PAGE_ROUTES.signUp}
                  className="btn btn-lg bg-primary-700 text-white hover:bg-primary-800"
                >
                  Create Account
                </Link>
              </div>
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
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
        <Icon className="h-5 w-5 text-primary-600" />
      </div>
      <div>
        <div className="font-serif text-xl font-bold text-neutral-900">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div className="text-sm text-neutral-500">{label}</div>
      </div>
    </div>
  );
}

