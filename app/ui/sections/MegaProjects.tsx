"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MEGA_PROJECTS } from "@/app/data/mega-projects";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

function MegaProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize from URL on mount
  useEffect(() => {
    const megaParam = searchParams.get("m");
    if (megaParam) {
      const index = parseInt(megaParam);
      if (!isNaN(index) && index >= 0 && index < MEGA_PROJECTS.length) {
        setCurrentIndex(index);
      }
    }
  }, [searchParams]);

  const updateUrl = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("m", index.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const nextProject = () => {
    const newIndex = (currentIndex + 1) % MEGA_PROJECTS.length;
    setCurrentIndex(newIndex);
    updateUrl(newIndex);
    scrollToMegaProjects();
  };

  const prevProject = () => {
    const newIndex = (currentIndex - 1 + MEGA_PROJECTS.length) % MEGA_PROJECTS.length;
    setCurrentIndex(newIndex);
    updateUrl(newIndex);
    scrollToMegaProjects();
  };

  const scrollToMegaProjects = () => {
    const element = document.getElementById("mega-projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    updateUrl(index);
    scrollToMegaProjects();
  };

  const ActiveProject = MEGA_PROJECTS[currentIndex].component;

  return (
    <>
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-4"
        >
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#37352f] to-transparent mb-6 sm:mb-8" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#37352f] mb-4 sm:mb-6 leading-tight">
            Mega <span className="italic font-serif">Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#787774] max-w-6xl mx-auto px-4 sm:px-0">
            In-depth look at complex, full-scale systems engineered for scalability and performance.
          </p>
        </motion.div>
      </div>

      {/* Project Content with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={MEGA_PROJECTS[currentIndex].id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <ActiveProject align={currentIndex % 2 === 0 ? "left" : "right"} />
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      <div className="pb-16 flex items-center justify-center gap-6 z-20">
        <button
          onClick={prevProject}
          className="p-2 rounded-full border border-[#e9e9e7] bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm group"
          aria-label="Previous mega project"
        >
          <HiChevronLeft className="w-5 h-5 text-[#787774] group-hover:text-[#37352f]" />
        </button>
        
        <div className="flex gap-2">
          {MEGA_PROJECTS.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index 
                  ? "w-8 bg-[#37352f]" 
                  : "bg-[#e9e9e7] hover:bg-[#d1d1cf]"
              }`}
              aria-label={`Go to mega project ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextProject}
          className="p-2 rounded-full border border-[#e9e9e7] bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm group"
          aria-label="Next mega project"
        >
          <HiChevronRight className="w-5 h-5 text-[#787774] group-hover:text-[#37352f]" />
        </button>
      </div>
    </>
  );
}

export default function MegaProjects() {
  return (
    <div id="mega-projects" className="bg-white">
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading Mega Projects...</div>}>
        <MegaProjectsContent />
      </Suspense>
    </div>
  );
}
