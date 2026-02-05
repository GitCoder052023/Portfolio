/**
 * Loading Page
 * Global loading state
 */

import { Container } from "@/components/layout";

export default function Loading() {
    return (
        <section className="section min-h-[60vh] flex items-center">
            <Container>
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative h-12 w-12">
                        <div className="absolute inset-0 rounded-full border-4 border-neutral-200"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-neutral-500">Loading...</p>
                </div>
            </Container>
        </section>
    );
}

