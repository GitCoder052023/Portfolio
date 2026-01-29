"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { InViewProps } from "@/app/types/components";

export default function ContactCTA({ isInView }: InViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-[#f7f6f3] p-8 md:p-12 rounded-2xl border border-[#e9e9e7] text-center"
        >
            <h3 className="text-2xl font-bold text-[#37352f] mb-4">
                Ready to Start a Project?
            </h3>
            <p className="text-lg text-[#787774] mb-6 max-w-2xl mx-auto">
                Whether you're looking for a full-stack developer, need help with a project, or want to discuss potential collaborations, I'm always open to new opportunities.
            </p>
            <motion.a
                href="mailto:your.email@example.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#37352f] text-white rounded-lg hover:bg-[#2e2d29] transition-colors duration-200 font-medium text-lg"
            >
                Get In Touch
                <ArrowRight className="w-5 h-5" />
            </motion.a>
        </motion.div>
    );
}
