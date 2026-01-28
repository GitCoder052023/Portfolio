"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Rocket } from "lucide-react";
import TechIcon from "./TechIcon";
import { ABOUT_STATS, TECH_CATEGORIES } from "../data/about";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#f7f6f3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-[#37352f]">
            About Me
          </h2>

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


          {/* Modern Tech Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24"
          >
            <div className="mb-16">
              <h3 className="text-4xl sm:text-5xl font-bold mb-6 text-[#37352f]">
                Tech Arsenal
              </h3>
              <p className="text-[#787774] text-lg">
                The tools and technologies I use to build modern, scalable solutions
              </p>
            </div>

            {/* Centered Capsule Navigation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-16 flex justify-center"
            >
              <div className="bg-white border border-[#e9e9e7] rounded-full p-2 inline-flex gap-2 shadow-sm">
                {TECH_CATEGORIES.map((cat, idx) => (
                  <motion.button
                    key={cat.category}
                    onClick={() => setSelectedCategory(idx)}
                    className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === idx
                      ? "bg-[#37352f] text-white shadow-md"
                      : "bg-transparent text-[#37352f] hover:bg-[#f0f0ed]"
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cat.category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Dynamic Tech Grid with Clean Hover */}
            <AnimatePresence mode="wait">
              <motion.div
                className="md:flex md:justify-center"
                key={selectedCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {TECH_CATEGORIES[selectedCategory].techs.map((tech, idx) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      onMouseEnter={() => setHoveredTech(idx)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className="group"
                    >
                      <motion.div
                        animate={hoveredTech === idx ? { y: -4 } : { y: 0 }}
                        transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 30 }}
                        className="rounded-xl p-6 flex flex-col items-center justify-center gap-3 h-full cursor-pointer transition-all duration-300 group-hover:border-[#d4d4d1] group-hover:shadow-md"
                      >
                        <motion.div
                          animate={hoveredTech === idx ? { scale: 1.08 } : { scale: 1 }}
                          transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 30 }}
                          className="w-12 h-12 flex items-center justify-center"
                        >
                          <TechIcon name={tech.icon} size={44} />
                        </motion.div>

                        <motion.div
                          animate={hoveredTech === idx ? { opacity: 1 } : { opacity: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="text-center"
                        >
                          <span className="text-sm font-medium text-[#37352f] block">
                            {tech.name}
                          </span>
                        </motion.div>

                        {/* Subtle bottom accent on hover */}
                        <motion.div
                          animate={hoveredTech === idx ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="h-0.5 w-6 bg-[#d4d4d1] rounded-full origin-center mt-1"
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}