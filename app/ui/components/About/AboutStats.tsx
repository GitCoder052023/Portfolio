"use client";

import { motion } from "framer-motion";

import { ABOUT_STATS } from "@/app/data/about";
import { InViewProps } from "@/app/types/components";

export default function AboutStats({ isInView }: InViewProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {ABOUT_STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative"
                    >
                        <div className={`relative h-full p-6 rounded-2xl border border-[#e9e9e7] bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#d4d4d1]`}>
                            <div className="flex flex-col gap-4">
                                {/* Icon Circle */}
                                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                                </div>

                                <div className="space-y-1">
                                    <div className="text-2xl font-bold text-[#37352f] tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="text-[13px] font-medium text-[#9d9b97] leading-tight">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>

                            {/* Notion-style subtle hover indicator */}
                            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#e9e9e7] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
