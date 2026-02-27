"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  const sitemap = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socials = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/hamdan-khubaib-3046b8331" },
    { name: "GitHub", href: "https://github.com/GitCoder052023" },
    { name: "Twitter", href: "https://x.com/HamdanKhu41893" },
  ];

  return (
    <footer className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#e9e9e7]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Side: Large Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-[80px] font-bold text-[#1a1a1a] leading-[0.95] tracking-tighter">
              Let&apos;s build the <br />
              <span className="font-serif italic text-[#d1d1cf] font-normal tracking-tight">impossible.</span>
            </h2>
          </motion.div>

          {/* Right Side: Navigation Columns */}
          <div className="flex flex-row gap-16 lg:gap-24 lg:justify-end">
            {/* Sitemap Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a1a1a1] mb-2">
                Sitemap
              </h3>
              <div className="flex flex-col gap-3">
                {sitemap.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-[#37352f] hover:text-[#787774] transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Socials Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a1a1a1] mb-2">
                Socials
              </h3>
              <div className="flex flex-col gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1 text-base font-medium text-[#37352f] hover:text-[#787774] transition-colors"
                  >
                    {social.name}
                    <FiArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Line & Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-32 pt-8 border-t border-[#f0f0f0] flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs font-medium text-[#a1a1a1] tracking-wide uppercase">
            © {new Date().getFullYear()} Hamdan Khubaib
          </p>
          <div className="h-[1px] flex-grow mx-8 bg-[#f0f0f0] hidden md:block" />
          <p className="text-xs font-medium text-[#a1a1a1] tracking-wide uppercase">
            Build with passion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

