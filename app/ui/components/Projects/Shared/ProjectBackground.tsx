"use client";

import { motion } from "framer-motion";

interface ProjectBackgroundProps {
    isInView: boolean;
    colors: {
        top: string;
        bottom: string;
    };
}

export default function ProjectBackground({ isInView, colors }: ProjectBackgroundProps) {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
                transition={{ duration: 1.5 }}
                className={`absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br ${colors.top} rounded-full blur-3xl`}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className={`absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr ${colors.bottom} rounded-full blur-3xl`}
            />
        </div>
    );
}
