/**
 * Header Component
 * Main navigation header for the publication platform
 */

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, FileText, Search } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "./container";
import { PAGE_ROUTES } from "@/lib/constants";
import { appConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: PAGE_ROUTES.publications, label: "Publications" },
    { href: PAGE_ROUTES.category("research-paper"), label: "Research" },
    { href: PAGE_ROUTES.category("thesis"), label: "Theses" },
    { href: PAGE_ROUTES.about, label: "About" },
];

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href={PAGE_ROUTES.home}
                        className="flex items-center gap-2.5 text-neutral-900 hover:text-neutral-700"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
                            <FileText className="h-5 w-5 text-white" strokeWidth={2} />
                        </div>
                        <span className="font-serif text-xl font-semibold tracking-tight">
                            {appConfig.name}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-3 py-2 text-sm font-medium text-neutral-600",
                                    "rounded-md transition-colors duration-200",
                                    "hover:bg-neutral-100 hover:text-neutral-900"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-3">
                        {/* Search button */}
                        <button
                            type="button"
                            className="btn btn-ghost btn-icon hidden md:flex"
                            aria-label="Search publications"
                        >
                            <Search className="h-4.5 w-4.5" />
                        </button>

                        {/* Auth buttons */}
                        <SignedOut>
                            <Link
                                href={PAGE_ROUTES.signIn}
                                className="btn btn-secondary btn-sm hidden md:inline-flex"
                            >
                                Sign In
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                afterSignOutUrl={PAGE_ROUTES.home}
                                appearance={{
                                    elements: {
                                        avatarBox: "h-8 w-8",
                                    },
                                }}
                            />
                        </SignedIn>

                        {/* Mobile menu toggle */}
                        <button
                            type="button"
                            className="btn btn-ghost btn-icon md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </Container>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-neutral-200 bg-white md:hidden"
                    >
                        <Container>
                            <nav className="flex flex-col gap-1 py-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "px-3 py-2.5 text-sm font-medium text-neutral-600",
                                            "rounded-md transition-colors duration-200",
                                            "hover:bg-neutral-100 hover:text-neutral-900"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="my-2 h-px bg-neutral-200" />
                                <SignedOut>
                                    <Link
                                        href={PAGE_ROUTES.signIn}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="btn btn-primary w-full"
                                    >
                                        Sign In
                                    </Link>
                                </SignedOut>
                            </nav>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
