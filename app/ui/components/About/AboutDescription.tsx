"use client";

import { motion } from "framer-motion";
import { Rocket, Sparkles } from "lucide-react";

interface AboutDescriptionProps {
    isInView: boolean;
}

export default function AboutDescription({ isInView }: AboutDescriptionProps) {
    return (
        <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-8 rounded-xl border border-[#e9e9e7]"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-[#37352f]" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#37352f]">
                        Backend-first Full-Stack Developer
                    </h3>
                </div>

                <p className="text-[#787774] leading-relaxed mb-4">
                    I'm a backend-first developer focused on building reliable, scalable software
                    systems from the ground up. With over six years of experience, I specialize
                    in turning ambiguous problems into well-structured solutions that are easy
                    to maintain, extend, and operate in real-world environments.
                </p>

                <p className="text-[#787774] leading-relaxed mb-4">
                    I work comfortably across the entire development lifecycle, with a strong
                    emphasis on backend architecture and system design. My approach prioritizes
                    clean abstractions, secure and well-defined interfaces, and thoughtful
                    trade-offs that support long-term scalability rather than short-term fixes.
                </p>

                <p className="text-[#787774] leading-relaxed">
                    Alongside product work, I actively contribute to open-source projects,
                    helping design and maintain production-ready tools and architectures that
                    enable developers to ship higher-quality applications with confidence.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-8 rounded-xl border border-[#e9e9e7]"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-[#37352f]" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#37352f]">
                        Python & Data Enthusiast
                    </h3>
                </div>

                <p className="text-[#787774] leading-relaxed mb-4">
                    I use Python as a practical tool for understanding systems, workflows, and
                    user behavior through data. Over several years, I've applied data analysis
                    and automation to reduce manual effort, surface insights, and support better
                    technical and product decisions.
                </p>

                <p className="text-[#787774] leading-relaxed mb-4">
                    My experience includes building repeatable data workflows, cleaning and
                    structuring messy datasets, and translating raw information into clear,
                    actionable insights. This has helped guide decisions based on evidence
                    rather than assumptions.
                </p>

                <p className="text-[#787774] leading-relaxed">
                    As I continue to grow, I'm expanding into{" "}
                    <strong className="text-[#37352f]">machine learning fundamentals</strong>{" "}
                    to further connect data-driven insights with production software systems,
                    particularly at the intersection of backend engineering and intelligent
                    applications.
                </p>
            </motion.div>
        </div>
    );
}
