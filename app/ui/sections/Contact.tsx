"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ContactHeader from "@/app/ui/components/Contact/ContactHeader";
import ContactGrid from "@/app/ui/components/Contact/ContactGrid";
import ContactCTA from "@/app/ui/components/Contact/ContactCTA";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <ContactHeader isInView={isInView} />
          <ContactGrid isInView={isInView} />
          <ContactCTA isInView={isInView} />
        </motion.div>
      </div>
    </section>
  );
}
