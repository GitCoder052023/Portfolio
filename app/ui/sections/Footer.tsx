"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../../constants/socialLinks";

export default function Footer() {
  const visibleSocialLinks = SOCIAL_LINKS.filter((link) => link.name !== "Email");

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f7f6f3] border-t border-[#e9e9e7]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
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
          
          {/* Social links text for SEO */}
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

          <p className="text-sm text-[#787774] mt-8">
            © {new Date().getFullYear()} Hamdan Khubaib. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

