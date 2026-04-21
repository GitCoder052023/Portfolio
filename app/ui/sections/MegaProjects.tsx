"use client";

import { motion } from "framer-motion";
import PublicationsProject from "@/app/ui/sections/PublicationsProject";

export default function MegaProjects() {
    return (
        <div id="mega-projects" className="bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-4"
                >
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#37352f] to-transparent mb-8" />
                    <h2 className="text-5xl sm:text-6xl font-bold text-[#37352f] mb-6">
                        Mega <span className="italic font-serif">Projects</span>
                    </h2>
                    <p className="text-xl text-[#787774] max-w-4xl mx-auto">
                        In-depth look at complex, full-scale systems engineered for scalability and performance.
                    </p>
                </motion.div>
            </div>
            
            <PublicationsProject align="left" />
        </div>
    );
}
