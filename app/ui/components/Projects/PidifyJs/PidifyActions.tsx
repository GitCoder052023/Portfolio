"use client";

import { motion } from "framer-motion";
import { Github, ArrowRight, Sparkles } from "lucide-react";

import { InViewProps } from "@/app/types/components";

export default function PidifyActions({ isInView }: InViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4"
        >
            <motion.a
                href="https://github.com/GitCoder052023/PidifyJs"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 px-7 py-4 bg-[#37352f] text-white rounded-xl hover:bg-[#2e2d29] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
                href="https://github.com/GitCoder052023/PidifyJs#readme"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-4 bg-transparent border-2 border-[#e9e9e7] text-[#37352f] rounded-xl hover:border-[#d4d4d1] hover:bg-[#f7f6f3] transition-all duration-300 font-medium"
            >
                <Sparkles className="w-4 h-4" />
                <span>Documentation</span>
            </motion.a>
        </motion.div>
    );
}
