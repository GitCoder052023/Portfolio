/**
 * Sign In Page
 * Clerk-powered sign in
 */

import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { Container } from "@/components/layout";
import { FadeIn } from "@/components/motion";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your account to like and comment on publications.",
};

export default function SignInPage() {
    return (
        <section className="section bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 min-h-[80vh] flex items-center">
            <Container>
                <FadeIn>
                    <div className="max-w-md mx-auto text-center mb-8">
                        <h1 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl">
                            Welcome Back
                        </h1>
                        <p className="mt-3 text-neutral-600">
                            Sign in to like and comment on publications.
                            Reading and downloading is always free.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="flex justify-center">
                        <SignIn
                            appearance={{
                                elements: {
                                    rootBox: "mx-auto",
                                    card: "shadow-lg border border-neutral-200",
                                    headerTitle: "font-serif",
                                    formButtonPrimary: "bg-primary-600 hover:bg-primary-700",
                                },
                            }}
                            fallbackRedirectUrl="/"
                        />
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
}

