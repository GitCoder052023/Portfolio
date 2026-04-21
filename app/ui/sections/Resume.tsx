"use client";

import { motion } from "framer-motion";
import { FileDown, ArrowRight } from "lucide-react";
import { RESUME_CONTENT } from "@/app/data/resume";
import Section from "@/app/ui/components/Shared/Section";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="resume" className="bg-[#fcfaf8]">
      <div ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#37352f]">
              {RESUME_CONTENT.title.text} <span className="italic font-serif">{RESUME_CONTENT.title.highlight}</span>
            </h2>
            <p className="text-xl text-[#787774] max-w-2xl mx-auto mb-10">
              {RESUME_CONTENT.description}
            </p>
          </motion.div>

          <motion.a
            href={`/${RESUME_CONTENT.fileName}`}
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#37352f] text-white rounded-full font-semibold text-lg hover:bg-black transition-all duration-300 shadow-xl shadow-[#37352f]/10"
          >
            <FileDown size={24} />
            {RESUME_CONTENT.buttonLabel}
            <ArrowRight size={20} className="ml-1 opacity-50" />
          </motion.a>
        </div>
      </div>
    </Section>
  );
}
