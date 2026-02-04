/**
 * Footer Component
 * Site footer with links and attribution
 */

import Link from "next/link";
import { FileText, Github, Twitter, Linkedin } from "lucide-react";
import { Container } from "./container";
import { PAGE_ROUTES } from "@/lib/constants";
import { appConfig } from "@/lib/config";

const footerLinks = {
    browse: [
        { href: PAGE_ROUTES.publications, label: "All Publications" },
        { href: PAGE_ROUTES.category("research-paper"), label: "Research Papers" },
        { href: PAGE_ROUTES.category("thesis"), label: "Theses" },
        { href: PAGE_ROUTES.category("idea"), label: "Ideas" },
        { href: PAGE_ROUTES.category("proposal"), label: "Proposals" },
    ],
    about: [
        { href: PAGE_ROUTES.about, label: "About the Author" },
        { href: "#", label: "Contact" },
    ],
};

const socialLinks = [
    { href: "#", icon: Github, label: "GitHub" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-neutral-200 bg-neutral-50">
            <Container>
                <div className="py-12 md:py-16">
                    <div className="grid gap-8 md:grid-cols-12">
                        {/* Brand */}
                        <div className="md:col-span-5">
                            <Link
                                href={PAGE_ROUTES.home}
                                className="inline-flex items-center gap-2.5 text-neutral-900"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
                                    <FileText className="h-5 w-5 text-white" strokeWidth={2} />
                                </div>
                                <span className="font-serif text-xl font-semibold tracking-tight">
                                    {appConfig.name}
                                </span>
                            </Link>
                            <p className="mt-4 max-w-sm text-sm text-neutral-600 leading-relaxed">
                                A professional publication platform for formal academic writings,
                                research papers, theses, ideas, and proposals.
                            </p>
                            {/* Social links */}
                            <div className="mt-6 flex gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-300 hover:text-neutral-900"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="md:col-span-4">
                            <h3 className="text-sm font-semibold text-neutral-900">Browse</h3>
                            <ul className="mt-4 space-y-2.5">
                                {footerLinks.browse.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-600 hover:text-neutral-900"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-3">
                            <h3 className="text-sm font-semibold text-neutral-900">About</h3>
                            <ul className="mt-4 space-y-2.5">
                                {footerLinks.about.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-600 hover:text-neutral-900"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-neutral-200 py-6">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-sm text-neutral-500">
                            © {currentYear} {appConfig.authorName}. All rights reserved.
                        </p>
                        <p className="text-sm text-neutral-500">
                            All content is publicly available for reading and download.
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
