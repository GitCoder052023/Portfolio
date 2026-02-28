"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ProjectSectionProps } from "@/app/types/components";
import { PIDIFY_PROJECT_DATA } from "@/app/data/pidify";
import ProjectBackground from "@/app/ui/components/Projects/Shared/ProjectBackground";
import ProjectHeader from "@/app/ui/components/Projects/Shared/ProjectHeader";
import ProjectFeatures from "@/app/ui/components/Projects/Shared/ProjectFeatures";
import ProjectHighlights from "@/app/ui/components/Projects/Shared/ProjectHighlights";
import ProjectActions from "@/app/ui/components/Projects/Shared/ProjectActions";
import PidifyViewer from "@/app/ui/components/Projects/PidifyJs/PidifyViewer";

export default function PidifyJs({ align = "left" }: ProjectSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const alignClass = align === "right" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <ProjectBackground isInView={isInView} colors={PIDIFY_PROJECT_DATA.backgroundColors} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <ProjectHeader 
            isInView={isInView} 
            tagline={PIDIFY_PROJECT_DATA.tagline}
            title={PIDIFY_PROJECT_DATA.name}
            description={PIDIFY_PROJECT_DATA.description}
          />

          <div className={`flex flex-col ${alignClass} gap-12 lg:gap-16 items-stretch mb-20`}>
            <ProjectFeatures 
                isInView={isInView} 
                features={PIDIFY_PROJECT_DATA.features} 
                align={align} 
                layout="grid"
            />
            <PidifyViewer isInView={isInView} />
          </div>

          <ProjectHighlights isInView={isInView} highlights={PIDIFY_PROJECT_DATA.highlights} />
          <ProjectActions 
            isInView={isInView} 
            githubUrl={PIDIFY_PROJECT_DATA.githubUrl} 
            docsUrl={PIDIFY_PROJECT_DATA.docsUrl} 
          />
        </motion.div>
      </div>
    </div>
  );
}
