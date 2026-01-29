"use client";

import { motion } from "framer-motion";

interface PidifyHeaderProps {
    isInView: boolean;
}

export default function PidifyHeader({ isInView }: PidifyHeaderProps) {
    return (
        <div className="mb-16">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 mb-6"
            >
                <div className="h-px w-8 bg-gradient-to-r from-transparent via-[#787774] to-transparent" />
                <span className="text-sm font-semibold text-[#787774] uppercase tracking-widest">
                    Featured Project
                </span>
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#37352f] tracking-tight"
            >
                PidifyJS
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-[#787774] max-w-3xl leading-relaxed"
            >
                A powerful, production-ready PDF viewer component library for React applications.
                Built with modern web technologies and designed for document management,
                e-signature applications, and more.
            </motion.p>
        </div>
    );
}
