"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ABOUT_CONTENT } from "@/app/data/about";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Title */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl sm:text-6xl font-bold text-[#2d2925]">
                {ABOUT_CONTENT.title.prefix}
              </h2>
              <span className="text-5xl sm:text-6xl italic font-serif text-[#37352f]">
                {ABOUT_CONTENT.title.highlight}
              </span>
            </div>
            <div className="h-1 w-16 bg-gradient-to-r from-[#37352f] to-transparent rounded-full" />
          </motion.div>

          {/* Main Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[#6b6b66] leading-relaxed max-w-3xl"
          >
            {ABOUT_CONTENT.description}
          </motion.p>

          {/* Detailed Descriptions with left border accent */}
          <motion.div
            variants={containerVariants}
            className="space-y-10"
          >
            {ABOUT_CONTENT.detailedDescription.map((paragraph, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-6"
              >
                <div className="hidden sm:block">
                  <div className="w-1 h-full bg-gradient-to-b from-[#37352f] to-transparent rounded-full" />
                </div>
                <p className="text-[#787774] leading-relaxed text-base sm:text-lg pt-1">
                  {paragraph}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
