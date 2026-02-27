"use client";

import { motion } from "framer-motion";
import { FaComment } from "react-icons/fa";

import { InViewProps } from "@/app/types/components";
import { CONTACT_CONTENT } from "@/app/data/contact";

export default function ContactHeader({ isInView }: InViewProps) {
    return (
        <div className="text-center mb-16">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
            >
                <div className="w-16 h-16 rounded-2xl bg-[#f7f6f3] border border-[#e9e9e7] flex items-center justify-center mx-auto">
                    <FaComment className="w-8 h-8 text-[#37352f]" />
                </div>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#37352f]">
                {CONTACT_CONTENT.header.title}
            </h2>
            <p className="text-xl text-[#787774] max-w-2xl mx-auto leading-relaxed">
                {CONTACT_CONTENT.header.description}
            </p>
        </div>
    );
}

