"use client";

import { motion } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";

export default function Footer() {
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
          <div className="flex justify-center gap-6">
            <motion.a
              href="https://github.com/GitCoder052023"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-white border border-[#e9e9e7] hover:border-[#d4d4d1] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-[#37352f]" />
            </motion.a>
            <motion.a
              href="mailto:your-email@example.com"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-white border border-[#e9e9e7] hover:border-[#d4d4d1] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-[#37352f]" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-white border border-[#e9e9e7] hover:border-[#d4d4d1] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-[#37352f]" />
            </motion.a>
          </div>
          <p className="text-sm text-[#787774] mt-8">
            © {new Date().getFullYear()} Hamdan Khubaib. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

