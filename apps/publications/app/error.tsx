/**
 * Error Page
 * Global error boundary
 */

"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Container } from "@/components/layout";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application error:", error);
    }, [error]);

    return (
        <section className="section min-h-[60vh] flex items-center">
            <Container>
                <div className="text-center max-w-md mx-auto">
                    <div className="flex justify-center mb-6">
                        <div className="rounded-full bg-red-100 p-6">
                            <AlertTriangle className="h-12 w-12 text-red-500" />
                        </div>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-neutral-900">
                        Something Went Wrong
                    </h1>
                    <p className="mt-4 text-neutral-600">
                        An unexpected error occurred. Please try again or contact support if the problem persists.
                    </p>
                    {error.digest && (
                        <p className="mt-2 text-xs text-neutral-400">
                            Error ID: {error.digest}
                        </p>
                    )}
                    <div className="mt-8">
                        <button
                            onClick={reset}
                            className="btn btn-primary inline-flex items-center gap-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Try Again
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
