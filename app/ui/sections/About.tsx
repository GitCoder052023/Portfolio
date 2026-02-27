"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#f7f6f3]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >

          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-[#37352f] flex items-center gap-3">
            A little about <span className="italic font-serif">me</span>
          </h2>

          <div className="space-y-8">
            <p className="text-xl text-[#787774] leading-relaxed max-w-3xl mx-auto">
              I&apos;m a backend-first developer focused on building reliable, scalable software systems from the ground up. With over six years of experience, I specialize in turning ambiguous problems into well-structured solutions that are easy to maintain, extend, and operate in real-world environments.
            </p>

            <div className="space-y-8 text-left max-w-2xl mx-auto">
              <p className="text-[#787774] leading-relaxed">
                I work comfortably across the entire development lifecycle, with a strong emphasis on backend architecture and system design. My approach prioritizes clean abstractions, secure and well-defined interfaces, and thoughtful trade-offs that support long-term scalability rather than short-term fixes.
              </p>
              <p className="text-[#787774] leading-relaxed">
                Alongside product work, I actively contribute to open-source projects, helping design and maintain production-ready tools and architectures that enable developers to ship higher-quality applications with confidence.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
