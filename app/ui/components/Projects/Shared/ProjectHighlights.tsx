"use client";

import { motion } from "framer-motion";
import { ProjectHighlight } from "@/app/types/components";

interface ProjectHighlightsProps {
    isInView: boolean;
    highlights: ProjectHighlight[];
}

export default function ProjectHighlights({ isInView, highlights }: ProjectHighlightsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
            {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                    <motion.div
                        key={highlight.title}
                        initial={{ opacity: 0, y: 25 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="group"
                    >
                        <div className={`relative h-full p-5 sm:p-7 bg-gradient-to-br ${highlight.color} rounded-2xl border ${highlight.borderColor} backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}>
                            <div className="absolute inset-0 bg-white/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/80 border border-white shadow-sm flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform duration-300">
                                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#37352f]" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-[#37352f] mb-2 sm:mb-3">
                                    {highlight.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-[#787774] leading-relaxed">
                                    {highlight.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
