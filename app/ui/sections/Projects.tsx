"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PidifyJs from "./PidifyJs";
import TailStack from "./TailStack";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS = [
  { id: "pidify", component: PidifyJs, name: "Pidify.js" },
  { id: "tailstack", component: TailStack, name: "TailStack" },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const ActiveProject = PROJECTS[currentIndex].component;

  return (
    <section id="projects" className="relative bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={PROJECTS[currentIndex].id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <ActiveProject align={currentIndex % 2 === 0 ? "left" : "right"} />
        </motion.div>
      </AnimatePresence>

      {/* Minimal Pagination Controls */}
      <div className="pb-16 flex items-center justify-center gap-6 z-20">
        <button
          onClick={prevProject}
          className="p-2 rounded-full border border-[#e9e9e7] bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm group"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5 text-[#787774] group-hover:text-[#37352f]" />
        </button>
        
        <div className="flex gap-2">
          {PROJECTS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index 
                  ? "w-8 bg-[#37352f]" 
                  : "bg-[#e9e9e7] hover:bg-[#d1d1cf]"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextProject}
          className="p-2 rounded-full border border-[#e9e9e7] bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm group"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5 text-[#787774] group-hover:text-[#37352f]" />
        </button>
      </div>
    </section>
  );
}
