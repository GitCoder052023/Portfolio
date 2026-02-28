"use client";

import { motion } from "framer-motion";
import { useActiveState } from "@/app/hooks/useActiveState";
import { ProjectFeature } from "@/app/types/components";

interface ProjectFeaturesProps {
    isInView: boolean;
    features: ProjectFeature[];
    align: "left" | "right";
    layout?: "grid" | "list";
}

export default function ProjectFeatures({ isInView, features, align, layout = "grid" }: ProjectFeaturesProps) {
    const { active: activeFeature, setActive: setActiveFeature, clearActive } = useActiveState<number>();

    return (
        <motion.div
            initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === "left" ? -40 : 40 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1"
        >
            <div className={layout === "grid" ? "grid grid-cols-2 gap-3 sm:gap-4" : "space-y-3"}>
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    const isActive = activeFeature === index;
                    return (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, delay: 0.25 + index * 0.05 }}
                            onMouseEnter={() => setActiveFeature(index)}
                            onMouseLeave={clearActive}
                            className="group"
                        >
                            <motion.div
                                animate={{ 
                                    y: layout === "grid" && isActive ? -3 : 0,
                                    x: layout === "list" && isActive ? 4 : 0
                                }}
                                transition={{ duration: 0.2 }}
                                className={`p-4 sm:p-5 bg-[#f7f6f3] rounded-xl border border-[#e9e9e7] hover:border-[#d4d4d1] hover:bg-white transition-all duration-300 h-full ${isActive ? 'shadow-lg' : 'shadow-sm'}`}
                            >
                                <div className="flex items-start gap-4">
                                    <motion.div
                                        animate={{ scale: isActive ? 1.1 : 1 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${feature.accent} flex items-center justify-center`}
                                    >
                                        <Icon className="w-5 h-5 text-[#37352f]" />
                                    </motion.div>
                                    <div className="min-w-0">
                                        <h4 className={`font-semibold text-[#37352f] ${layout === "list" ? "text-base sm:text-lg" : "text-sm sm:text-base"}`}>
                                            {feature.title}
                                        </h4>
                                        <p className={`text-[#787774] mt-1 leading-relaxed ${layout === "list" ? "text-sm" : "text-xs sm:text-sm"}`}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
