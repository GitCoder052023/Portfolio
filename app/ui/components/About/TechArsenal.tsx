"use client";

import { motion, AnimatePresence } from "framer-motion";

import { InViewProps } from "@/app/types/components";
import { useTechArsenal } from "@/app/hooks/useTechArsenal";
import { TECH_CATEGORIES } from "@/app/data/about";
import TechIcon from "@/app/ui/utils/TechIcon";

export default function TechArsenal({ isInView }: InViewProps) {
    const { selectedCategory, hoveredTech, selectCategory, setHovered } = useTechArsenal();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24"
        >
            <div className="mb-16">
                <h3 className="text-4xl sm:text-5xl font-bold mb-4 text-[#37352f]">
                    Tech Arsenal
                </h3>
                <h4 className="text-xl text-[#37352f]/70 font-medium mb-6">
                    Technologies I use to build scalable & production-ready systems.
                </h4>
            </div>

            {/* Centered Capsule Navigation */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-16 flex justify-center"
            >
                <div className="bg-white border border-[#e9e9e7] rounded-full p-2 inline-flex gap-2 shadow-sm">
                    {TECH_CATEGORIES.map((cat, idx) => (
                        <motion.button
                            key={cat.category}
                            onClick={() => selectCategory(idx)}
                            className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === idx
                                ? "bg-[#37352f] text-white shadow-md"
                                : "bg-transparent text-[#37352f] hover:bg-[#f0f0ed]"
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {cat.category}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Dynamic Tech Grid with Clean Hover */}
            <AnimatePresence mode="wait">
                <motion.div
                    className="md:flex md:justify-center"
                    key={selectedCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {TECH_CATEGORIES[selectedCategory].techs.map((tech, idx) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: idx * 0.05 }}
                                onMouseEnter={() => setHovered(idx)}
                                onMouseLeave={() => setHovered(null)}
                                className="group"
                            >
                                <motion.div
                                    animate={hoveredTech === idx ? { y: -4 } : { y: 0 }}
                                    transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 30 }}
                                    className="rounded-xl p-6 flex flex-col items-center justify-center gap-3 h-full cursor-pointer transition-all duration-100 border-[#d4d4d1] shadow-md group-hover:scale-150"
                                >
                                    <motion.div
                                        animate={hoveredTech === idx ? { scale: 1.08 } : { scale: 1 }}
                                        transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 30 }}
                                        className="w-12 h-12 flex items-center justify-center"
                                    >
                                        <TechIcon name={tech.icon} size={44} />
                                    </motion.div>

                                    <motion.div
                                        animate={hoveredTech === idx ? { opacity: 1 } : { opacity: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-center"
                                    >
                                        <span className="text-sm font-medium text-[#37352f] block">
                                            {tech.name}
                                        </span>
                                    </motion.div>

                                    {/* Subtle bottom accent on hover */}
                                    <motion.div
                                        animate={hoveredTech === idx ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                        className="h-0.5 w-6 bg-[#d4d4d1] rounded-full origin-center mt-1"
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
