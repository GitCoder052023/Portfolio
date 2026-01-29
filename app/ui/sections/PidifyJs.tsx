"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { PidifyJsProps } from "@/app/types/components";
import PidifyBackground from "@/app/ui/components/Projects/PidifyJs/PidifyBackground";
import PidifyHeader from "@/app/ui/components/Projects/PidifyJs/PidifyHeader";
import PidifyFeatures from "@/app/ui/components/Projects/PidifyJs/PidifyFeatures";
import PidifyViewer from "@/app/ui/components/Projects/PidifyJs/PidifyViewer";
import PidifyCoreFeatures from "@/app/ui/components/Projects/PidifyJs/PidifyCoreFeatures";
import PidifyActions from "@/app/ui/components/Projects/PidifyJs/PidifyActions";

export default function PidifyJs({ align = "left" }: PidifyJsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const alignClass = align === "right" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <section
      id="projects"
      className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      <PidifyBackground isInView={isInView} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <PidifyHeader isInView={isInView} />

          <div className={`flex flex-col ${alignClass} gap-12 lg:gap-16 items-stretch mb-20`}>
            <PidifyFeatures isInView={isInView} align={align} />
            <PidifyViewer isInView={isInView} />
          </div>

          <PidifyCoreFeatures isInView={isInView} />
          <PidifyActions isInView={isInView} />
        </motion.div>
      </div>
    </section>
  );
}
