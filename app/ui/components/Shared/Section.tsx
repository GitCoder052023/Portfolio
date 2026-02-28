"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  maxWidth?: string;
  py?: string;
  delay?: number;
}

export default function Section({ 
  id, 
  className = "", 
  children, 
  maxWidth = "max-w-6xl",
  py = "py-32",
  delay = 0.2
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for "butter smooth" feel
        delay 
      }}
      className={`${py} px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className={`${maxWidth} mx-auto`}>
        {children}
      </div>
    </motion.section>
  );
}
