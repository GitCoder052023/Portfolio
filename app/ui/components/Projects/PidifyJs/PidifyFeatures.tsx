"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PIDIFY_FEATURES } from "@/app/data/pidify";

interface PidifyFeaturesProps {
    isInView: boolean;
    align: "left" | "right";
}

export default function PidifyFeatures({ isInView, align }: PidifyFeaturesProps) {
    const [activeFeature, setActiveFeature] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === "left" ? -40 : 40 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1"
        >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {PIDIFY_FEATURES.map((feature, index) => {
                    const Icon = feature.icon;
                    const isActive = activeFeature === index;
                    return (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, delay: 0.25 + index * 0.05 }}
                            onMouseEnter={() => setActiveFeature(index)}
                            onMouseLeave={() => setActiveFeature(null)}
                            className="group"
                        >
                            <motion.div
                                animate={{ y: isActive ? -3 : 0 }}
                                transition={{ duration: 0.2 }}
                                className={`p-4 sm:p-5 bg-[#f7f6f3] rounded-xl border border-[#e9e9e7] hover:border-[#d4d4d1] hover:bg-white transition-all duration-300 h-full ${isActive ? 'shadow-lg' : 'shadow-sm'}`}
                            >
                                <div className="flex items-start gap-3">
                                    <motion.div
                                        animate={{ scale: isActive ? 1.1 : 1 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${feature.accent} flex items-center justify-center`}
                                    >
                                        <Icon className="w-5 h-5 text-[#37352f]" />
                                    </motion.div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-[#37352f] text-sm sm:text-base">
                                            {feature.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-[#787774] mt-1 leading-relaxed">
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
