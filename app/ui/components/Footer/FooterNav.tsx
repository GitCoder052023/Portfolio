"use client";

import { SOCIAL_LINKS } from "@/app/constants/socialLinks";

export default function FooterNav() {
    const visibleSocialLinks = SOCIAL_LINKS.filter((link) => link.name !== "Email");

    return (
        <nav className="mb-8" aria-label="Social Media Links">
            <p className="text-xs text-[#787774] mb-3">Connect with me on:</p>
            <div className="flex justify-center gap-3 flex-wrap text-xs">
                {visibleSocialLinks.map((social, index) => (
                    <span key={social.name} className="flex items-center gap-3">
                        <a
                            href={social.url}
                            target="_blank"
                            rel={social.rel}
                            className="text-[#0d47a1] hover:underline"
                        >
                            {social.name}
                        </a>
                        {index < visibleSocialLinks.length - 1 && (
                            <span className="text-[#d4d4d1]">•</span>
                        )}
                    </span>
                ))}
            </div>
        </nav>
    );
}
