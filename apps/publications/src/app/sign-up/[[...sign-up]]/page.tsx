/**
 * Sign Up Page
 * Clerk-powered sign up
 */

import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { Container } from "@/components/layout";
import { FadeIn } from "@/components/motion";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Create an account to join the discussion on publications.",
};

export default function SignUpPage() {
    return (
        <section className="section bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 min-h-[80vh] flex items-center">
            <Container>
                <FadeIn>
                    <div className="max-w-md mx-auto text-center mb-8">
                        <h1 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl">
                            Create an Account
                        </h1>
                        <p className="mt-3 text-neutral-600">
                            Join the community to like and comment on publications.
                            Reading and downloading is always free—no account required.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="flex justify-center">
                        <SignUp
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

