"use client";

import { motion } from "framer-motion";
import { YEARLY_GOALS } from "@/app/data/goals";

interface GoalsGridProps {
    isInView: boolean;
}

export default function GoalsGrid({ isInView }: GoalsGridProps) {
    return (
        <div className="grid sm:grid-cols-2 gap-6">
            {YEARLY_GOALS.map((goal, index) => {
                const Icon = goal.icon;
                return (
                    <motion.div
                        key={goal.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative p-8 bg-white rounded-2xl border border-[#e9e9e7] hover:border-[#d4d4d1] transition-all duration-300 hover:shadow-lg"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${goal.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10`} />
                        <div className="relative">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-4`}>
                                <Icon className="w-7 h-7 text-[#37352f]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#37352f] mb-2">
                                {goal.title}
                            </h3>
                            <p className="text-[#787774] leading-relaxed">
                                {goal.description}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
