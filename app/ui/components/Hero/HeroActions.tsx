"use client";

import { motion } from "framer-motion";

export default function HeroActions() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="flex flex-wrap gap-4 justify-center"
        >
            <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#37352f] text-white rounded-lg hover:bg-[#2e2d29] transition-colors duration-200 font-medium shadow-lg"
            >
                About Me
            </motion.a>
            <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-transparent border-2 border-[#e9e9e7] text-[#37352f] rounded-lg hover:border-[#d4d4d1] transition-colors duration-200 font-medium"
            >
                Projects
            </motion.a>
        </motion.div>
    );
}
