"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { PUBLICATIONS_CONTENT } from "@/app/data/publications";
import Section from "@/app/ui/components/Shared/Section";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function Publications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="publications" className="bg-white">
      <div ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#37352f]">
              {PUBLICATIONS_CONTENT.title.text} <span className="italic font-serif">{PUBLICATIONS_CONTENT.title.highlight}</span>
            </h2>
            <p className="text-xl text-[#787774] max-w-2xl mx-auto mb-8">
              {PUBLICATIONS_CONTENT.description}
            </p>
          </motion.div>

          <motion.a
            href={PUBLICATIONS_CONTENT.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#37352f] text-white rounded-full font-medium hover:bg-black transition-colors shadow-lg shadow-black/5"
          >
            <BookOpen size={20} />
            {PUBLICATIONS_CONTENT.buttonLabel} <ArrowRight size={18} />
          </motion.a>
        </div>
      </div>
    </Section>
  );
}
