"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT } from "@/app/data/hero";

export default function HeroContent() {
    return (
        <>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-[#37352f] leading-tight"
            >
                {HERO_CONTENT.name}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                className="text-xl sm:text-2xl text-[#787774] mb-12 max-w-2xl mx-auto leading-relaxed"
            >
                {HERO_CONTENT.bio}
            </motion.p>
        </>
    );
}

