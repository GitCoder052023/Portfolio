"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import AboutHeader from "@/app/ui/components/About/AboutHeader";
import AboutStats from "@/app/ui/components/About/AboutStats";
import AboutDescription from "@/app/ui/components/About/AboutDescription";
import TechArsenal from "@/app/ui/components/About/TechArsenal";

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
          <AboutStats isInView={isInView} />
          <AboutDescription isInView={isInView} />
          <TechArsenal isInView={isInView} />
        </motion.div>
      </div>
    </section>
  );
}