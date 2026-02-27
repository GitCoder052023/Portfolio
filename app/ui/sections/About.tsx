"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import AboutHeader from "@/app/ui/components/About/AboutHeader";
import AboutDescription from "@/app/ui/components/About/AboutDescription";
import TechMarquee from "@/app/ui/components/About/TechMarquee";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#f7f6f3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <AboutHeader />
          <AboutDescription isInView={isInView} />
          <TechMarquee />
        </motion.div>
      </div>
    </section>
  );
}