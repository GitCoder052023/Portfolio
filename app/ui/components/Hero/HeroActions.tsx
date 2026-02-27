"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT } from "@/app/data/hero";

export default function HeroActions() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="flex flex-wrap gap-4 justify-center"
        >
            {HERO_CONTENT.actions.map((action) => (
                <motion.a
                    key={action.label}
                    href={action.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-lg transition-colors duration-200 font-medium ${action.primary
                        ? "bg-[#37352f] text-white hover:bg-[#2e2d29] shadow-lg"
                        : "bg-transparent border-2 border-[#e9e9e7] text-[#37352f] hover:border-[#d4d4d1]"
                        }`}
                >
                    {action.label}
                </motion.a>
            ))}
        </motion.div>
    );
}

