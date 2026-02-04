/**
 * Not Found Page
 * 404 error page
 */

import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Container } from "@/components/layout";
import { PAGE_ROUTES } from "@/lib/constants";

export default function NotFound() {
    return (
        <section className="section min-h-[60vh] flex items-center">
            <Container>
                <div className="text-center max-w-md mx-auto">
                    <div className="flex justify-center mb-6">
                        <div className="rounded-full bg-neutral-100 p-6">
                            <FileQuestion className="h-12 w-12 text-neutral-400" />
                        </div>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-neutral-900">
                        Page Not Found
                    </h1>
                    <p className="mt-4 text-neutral-600">
                        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href={PAGE_ROUTES.home} className="btn btn-primary">
                            Go Home
                        </Link>
                        <Link href={PAGE_ROUTES.publications} className="btn btn-secondary">
                            Browse Publications
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
