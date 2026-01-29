"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";

import { InViewProps } from "@/app/types/components";

export default function GoalsHeader({ isInView }: InViewProps) {
    return (
        <div className="mb-16 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
            >
                <Target className="w-12 h-12 text-[#787774] mx-auto" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#37352f]">
                Goals for This Year
            </h2>
            <p className="text-lg text-[#787774] max-w-2xl mx-auto">
                My learning journey and development objectives for 2024
            </p>
        </div>
    );
}
