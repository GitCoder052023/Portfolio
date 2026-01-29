"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import GoalsHeader from "@/app/ui/components/Goals/GoalsHeader";
import GoalsGrid from "@/app/ui/components/Goals/GoalsGrid";

export default function Goals() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="goals" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <GoalsHeader isInView={isInView} />
          <GoalsGrid isInView={isInView} />
        </motion.div>
      </div>
    </section>
  );
}
