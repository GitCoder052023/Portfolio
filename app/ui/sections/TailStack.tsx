"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ProjectSectionProps } from "@/app/types/components";
import { TAILSTACK_PROJECT_DATA } from "@/app/data/tailstack";
import ProjectBackground from "@/app/ui/components/Projects/Shared/ProjectBackground";
import ProjectHeader from "@/app/ui/components/Projects/Shared/ProjectHeader";
import ProjectFeatures from "@/app/ui/components/Projects/Shared/ProjectFeatures";
import ProjectHighlights from "@/app/ui/components/Projects/Shared/ProjectHighlights";
import ProjectActions from "@/app/ui/components/Projects/Shared/ProjectActions";
import TailStackTerminal from "@/app/ui/components/Projects/TailStack/TailStackTerminal";

export default function TailStack({ align = "right" }: ProjectSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const alignClass = align === "right" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <ProjectBackground isInView={isInView} colors={TAILSTACK_PROJECT_DATA.backgroundColors} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <ProjectHeader 
            isInView={isInView} 
            tagline={TAILSTACK_PROJECT_DATA.tagline}
            title={TAILSTACK_PROJECT_DATA.name}
            description={TAILSTACK_PROJECT_DATA.description}
          />

          <div className={`flex flex-col ${alignClass} gap-12 lg:gap-16 items-stretch mb-20`}>
            <ProjectFeatures 
                isInView={isInView} 
                features={TAILSTACK_PROJECT_DATA.features} 
                align={align} 
                layout="list"
            />
            <TailStackTerminal isInView={isInView} />
          </div>

          <ProjectHighlights isInView={isInView} highlights={TAILSTACK_PROJECT_DATA.highlights} />
          <ProjectActions 
            isInView={isInView} 
            githubUrl={TAILSTACK_PROJECT_DATA.githubUrl} 
            docsUrl={TAILSTACK_PROJECT_DATA.docsUrl} 
          />
        </motion.div>
      </div>
    </div>
  );
}
