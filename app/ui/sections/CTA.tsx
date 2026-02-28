"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiArrowRight } from "react-icons/hi";
import { CONTACT_CONTENT } from "@/app/data/contact";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-32 sm:py-40 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] overflow-hidden"
    >
      {/* Background grain / noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#37352f] rounded-full blur-[180px] opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#4a4a45] rounded-full blur-[150px] opacity-15" />
      </motion.div>

      {/* Top border fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#333] to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#333] bg-[#222] text-xs font-medium tracking-widest uppercase text-[#888]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {CONTACT_CONTENT.cta.tagline}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center leading-[1.05] tracking-tight mb-8"
        >
          <span className="text-white">{CONTACT_CONTENT.cta.title}</span>
          <br />
          <span className="font-serif italic font-normal text-[#666]">
            {CONTACT_CONTENT.cta.titleHighlight}
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl text-[#888] text-center max-w-2xl mx-auto leading-relaxed mb-12"
        >
          {CONTACT_CONTENT.cta.description}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary button */}
          <motion.button
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition =
                  elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1a1a1a] rounded-full font-semibold text-base shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-shadow duration-500"
          >
            {CONTACT_CONTENT.cta.buttonLabel}
            <HiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>

          {/* Secondary button */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-base text-[#999] border border-[#333] hover:border-[#555] hover:text-white transition-all duration-300"
          >
            {CONTACT_CONTENT.cta.secondaryLabel}
          </motion.a>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-[#444] to-transparent origin-center"
        />
      </div>
    </section>
  );
}
