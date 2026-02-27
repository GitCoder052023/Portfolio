"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ABOUT_CONTENT } from "@/app/data/about";

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
            {ABOUT_CONTENT.title.prefix} <span className="italic font-serif">{ABOUT_CONTENT.title.highlight}</span>
          </h2>

          <div className="space-y-8">
            <p className="text-xl text-[#787774] leading-relaxed max-w-3xl mx-auto">
              {ABOUT_CONTENT.description}
            </p>

            <div className="space-y-8 text-left max-w-2xl mx-auto">
              {ABOUT_CONTENT.detailedDescription.map((paragraph, index) => (
                <p key={index} className="text-[#787774] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
