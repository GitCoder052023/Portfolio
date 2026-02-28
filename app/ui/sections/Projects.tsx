"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/app/data/projects";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Section from "@/app/ui/components/Shared/Section";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    scrollToProjects();
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    scrollToProjects();
  };

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    scrollToProjects();
  };

  const ActiveProject = PROJECTS[currentIndex].component;

  return (
    <Section id="projects" className="bg-white" py="py-0">

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
          <HiChevronLeft className="w-5 h-5 text-[#787774] group-hover:text-[#37352f]" />
        </button>
        
        <div className="flex gap-2">
          {PROJECTS.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
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
          <HiChevronRight className="w-5 h-5 text-[#787774] group-hover:text-[#37352f]" />
        </button>
      </div>
    </Section>
  );
}
