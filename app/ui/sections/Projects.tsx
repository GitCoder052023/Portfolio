"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/app/data/projects";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Section from "@/app/ui/components/Shared/Section";

function ProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize from URL on mount
  useEffect(() => {
    const projectParam = searchParams.get("p");
    if (projectParam) {
      const index = parseInt(projectParam);
      if (!isNaN(index) && index >= 0 && index < PROJECTS.length) {
        setCurrentIndex(index);
      }
    }
  }, [searchParams]);

  const updateUrl = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("p", index.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const nextProject = () => {
    const newIndex = (currentIndex + 1) % PROJECTS.length;
    setCurrentIndex(newIndex);
    updateUrl(newIndex);
    scrollToProjects();
  };

  const prevProject = () => {
    const newIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    setCurrentIndex(newIndex);
    updateUrl(newIndex);
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
    updateUrl(index);
    scrollToProjects();
  };

  const ActiveProject = PROJECTS[currentIndex].component;

  return (
    <>
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
    </>
  );
}

export default function Projects() {
  return (
    <Section id="projects" className="bg-white" py="py-0">
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading Projects...</div>}>
        <ProjectsContent />
      </Suspense>
    </Section>
  );
}
