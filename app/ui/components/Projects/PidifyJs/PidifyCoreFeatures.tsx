"use client";

import { motion } from "framer-motion";

import { PIDIFY_CORE_FEATURES } from "@/app/data/pidify";
import { InViewProps } from "@/app/types/components";

export default function PidifyCoreFeatures({ isInView }: InViewProps) {
    return (
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-14">
            {PIDIFY_CORE_FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 25 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="group"
                    >
                        <div className={`relative h-full p-6 sm:p-7 bg-gradient-to-br ${feature.color} rounded-2xl border ${feature.borderColor} backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}>
                            <div className="absolute inset-0 bg-white/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <div className="w-14 h-14 rounded-xl bg-white/80 border border-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                                    <Icon className="w-7 h-7 text-[#37352f]" />
                                </div>
                                <h3 className="text-xl font-semibold text-[#37352f] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-[#787774] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
