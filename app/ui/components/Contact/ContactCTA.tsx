"use client";

import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

import { InViewProps } from "@/app/types/components";
import { CONTACT_CONTENT } from "@/app/data/contact";

export default function ContactCTA({ isInView }: InViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-[#f7f6f3] p-8 md:p-12 rounded-2xl border border-[#e9e9e7] text-center"
        >
            <h3 className="text-2xl font-bold text-[#37352f] mb-4">
                {CONTACT_CONTENT.cta.title}
            </h3>
            <p className="text-lg text-[#787774] mb-6 max-w-2xl mx-auto">
                {CONTACT_CONTENT.cta.description}
            </p>
            <motion.a
                href="mailto:hi@hamdankhubaib.in"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#37352f] text-white rounded-lg hover:bg-[#2e2d29] transition-colors duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
            >
                {CONTACT_CONTENT.cta.buttonLabel}
                <HiArrowRight className="w-5 h-5" />
            </motion.a>
        </motion.div>
    );
}

