"use client";

import { motion } from "framer-motion";
import { Github, Mail, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/GitCoder052023",
      label: "GitHub",
      rel: "external nofollow",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/hamdan-khubaib-3046b8331",
      label: "LinkedIn",
      rel: "external nofollow",
    },
    {
      icon: Twitter,
      href: "https://x.com/HamdanKhu41893",
      label: "X (Twitter)",
      rel: "external nofollow",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/hamdankhubaib.code",
      label: "Instagram",
      rel: "external nofollow",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/HamdanKhubaib",
      label: "Facebook",
      rel: "external nofollow",
    },
    {
      icon: Mail,
      href: "mailto:hamdankhubaib959@gmail.com",
      label: "Email",
      rel: "nofollow",
    },
  ];

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
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel={social.rel}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg bg-white border border-[#e9e9e7] hover:border-[#d4d4d1] transition-colors"
                aria-label={social.label}
                title={social.label}
              >
                <social.icon className="w-5 h-5 text-[#37352f]" />
              </motion.a>
            ))}
          </div>
          
          {/* Social links text for SEO */}
          <nav className="mb-8" aria-label="Social Media Links">
            <p className="text-xs text-[#787774] mb-3">Connect with me on:</p>
            <div className="flex justify-center gap-3 flex-wrap text-xs">
              <a href="https://github.com/GitCoder052023" target="_blank" rel="external nofollow" className="text-[#0d47a1] hover:underline">GitHub</a>
              <span className="text-[#d4d4d1]">•</span>
              <a href="https://www.linkedin.com/in/hamdan-khubaib-3046b8331" target="_blank" rel="external nofollow" className="text-[#0d47a1] hover:underline">LinkedIn</a>
              <span className="text-[#d4d4d1]">•</span>
              <a href="https://x.com/HamdanKhu41893" target="_blank" rel="external nofollow" className="text-[#0d47a1] hover:underline">X (Twitter)</a>
              <span className="text-[#d4d4d1]">•</span>
              <a href="https://instagram.com/hamdankhubaib.code" target="_blank" rel="external nofollow" className="text-[#0d47a1] hover:underline">Instagram</a>
              <span className="text-[#d4d4d1]">•</span>
              <a href="https://www.facebook.com/HamdanKhubaib" target="_blank" rel="external nofollow" className="text-[#0d47a1] hover:underline">Facebook</a>
              <span className="text-[#d4d4d1]">•</span>
              <a href="https://threads.com/@hamdankhubaib.code" target="_blank" rel="external nofollow" className="text-[#0d47a1] hover:underline">Threads</a>
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

