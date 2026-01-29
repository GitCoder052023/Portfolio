"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { TailStackProps } from "@/app/types/components";
import TailStackBackground from "@/app/ui/components/Projects/TailStack/TailStackBackground";
import TailStackHeader from "@/app/ui/components/Projects/TailStack/TailStackHeader";
import TailStackFeatures from "@/app/ui/components/Projects/TailStack/TailStackFeatures";
import TailStackTerminal from "@/app/ui/components/Projects/TailStack/TailStackTerminal";
import TailStackHighlights from "@/app/ui/components/Projects/TailStack/TailStackHighlights";
import TailStackActions from "@/app/ui/components/Projects/TailStack/TailStackActions";

export default function TailStack({ align = "right" }: TailStackProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const alignClass = align === "right" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#f7f6f3] relative overflow-hidden">
      <TailStackBackground />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <TailStackHeader />

          <div className={`flex flex-col ${alignClass} gap-12 lg:gap-16 items-stretch mb-20`}>
            <TailStackFeatures />
            <TailStackTerminal isInView={isInView} />
          </div>

          <TailStackHighlights />
          <TailStackActions />
        </motion.div>
      </div>
    </section>
  );
}