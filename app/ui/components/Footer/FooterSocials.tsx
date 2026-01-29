"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/app/constants/socialLinks";

export default function FooterSocials() {
    const visibleSocialLinks = SOCIAL_LINKS.filter((link) => link.name !== "Email");

    return (
        <div className="flex justify-center gap-4 flex-wrap mb-8">
            {visibleSocialLinks.map((social) => (
                <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel={social.rel}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-lg bg-white border border-[#e9e9e7] hover:border-[#d4d4d1] transition-colors"
                    aria-label={social.label}
                    title={social.name}
                >
                    <social.icon className="w-5 h-5 text-[#37352f]" />
                </motion.a>
            ))}
        </div>
    );
}
