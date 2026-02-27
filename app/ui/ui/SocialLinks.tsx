"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../../constants/socialLinks";

const SOCIAL_ICON_COLORS: Record<string, string> = {
  GitHub: "hover:text-gray-700",
  LinkedIn: "hover:text-blue-700",
  X: "hover:text-black",
  Instagram: "hover:text-pink-600",
  Facebook: "hover:text-blue-600",
  Threads: "hover:text-gray-700",
  Email: "hover:text-red-600",
};

export default function SocialLinks() {
  return (
    <nav
      className="flex items-center gap-4"
      aria-label="Social Media Links"
    >
      {SOCIAL_LINKS.map((social, index) => {
        const colorClass =
          SOCIAL_ICON_COLORS[social.name] ?? "hover:text-gray-700";

        return (
          <motion.a
            key={social.name}
            href={social.url}
            target={social.name !== "Email" ? "_blank" : undefined}
            rel={social.name !== "Email" ? social.rel : undefined}
            aria-label={`Visit ${social.name}`}
            title={social.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`text-gray-600 transition-colors ${colorClass}`}
          >
            <social.icon className="w-5 h-5" />
          </motion.a>
        );
      })}
    </nav>
  );
}
