"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code, Database, TrendingUp, MapPin, Sparkles, Rocket } from "lucide-react";
import TechIcon from "./TechIcon";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [hoveredTech, setHoveredTech] = useState(null);

  const stats = [
    { label: "Years Coding", value: "6+", icon: Code },
    { label: "Web Dev Focus", value: "3 years", icon: TrendingUp },
    { label: "Python Experience", value: "4 years", icon: Database },
    { label: "Location", value: "India", icon: MapPin },
  ];

  const techCategories = [
    {
      category: "Frontend",
      techs: [
        { name: "HTML5", icon: "html5" },
        { name: "CSS3", icon: "css3" },
        { name: "JavaScript", icon: "javascript" },
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "next.js" },
        { name: "TanStack Start", icon: "tanstack start" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Tailwind CSS", icon: "tailwindcss" }
      ]
    },
    {
      category: "Backend",
      techs: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Express.js", icon: "express" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "Supabase", icon: "supabase" },
      ]
    },
    {
      category: "Data",
      techs: [
        { name: "Python", icon: "python" },
        { name: "Pandas", icon: "pandas" },
        { name: "NumPy", icon: "numpy" },
        { name: "Matplotlib", icon: "matplotlib" },
        { name: "Seaborn", icon: "seaborn" },
        { name: "Plotly", icon: "plotly" },
      ]
    },
  ];

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

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl border border-[#e9e9e7] hover:border-[#d4d4d1] transition-colors"
                >
                  <div className="text-3xl font-bold text-[#37352f] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#787774]">{stat.label}</div>
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
                  Full-Stack Developer
                </h3>
              </div>
              <p className="text-[#787774] leading-relaxed mb-4">
                I'm a self-driven developer who thrives on building complete solutions from the ground up. With over 6 years of coding experience, I've developed a deep passion for creating applications that solve real-world problems. My journey has been one of continuous learning, from scripting automation tools to architecting full-stack web applications.
              </p>
              <p className="text-[#787774] leading-relaxed mb-4">
                What sets me apart is my ability to work independently across the entire development stack. I'm comfortable diving into backend architecture, crafting intuitive frontend experiences, and ensuring everything works seamlessly together. I believe in writing clean, maintainable code and building systems that scale.
              </p>
              <p className="text-[#787774] leading-relaxed">
                Currently, I'm channeling my expertise into building <strong className="text-[#37352f]">Exam Bazar</strong> — a transformative platform that aims to reshape how students and educators connect, learn, and grow together in the academic space.
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
                Python has been my companion for over 4 years, and it's where I discovered the power of data. I've spent countless hours working with Pandas, NumPy, Matplotlib, Seaborn, and Plotly to transform raw data into meaningful insights. Whether it's automating repetitive tasks, analyzing complex datasets, or building data pipelines, Python has been my go-to tool.
              </p>
              <p className="text-[#787774] leading-relaxed mb-4">
                My experience spans from writing efficient scripts that save hours of manual work to creating comprehensive data analysis workflows. I understand the nuances of data manipulation, cleaning, and visualization — skills that have proven invaluable in understanding user behavior and making data-driven decisions.
              </p>
              <p className="text-[#787774] leading-relaxed">
                As I continue to grow, I'm preparing to dive deeper into <strong className="text-[#37352f]">machine learning fundamentals</strong>, exploring how algorithms can unlock patterns and predictions that weren't visible before. The intersection of data science and web development is where I see exciting opportunities ahead.
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
                {techCategories.map((cat, idx) => (
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
                  {techCategories[selectedCategory].techs.map((tech, idx) => (
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
