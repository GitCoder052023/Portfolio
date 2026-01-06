"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Database, TrendingUp, MapPin, Sparkles, Rocket } from "lucide-react";
import TechIcon from "./TechIcon";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Years Coding", value: "6+", icon: Code },
    { label: "Web Dev Focus", value: "3 years", icon: TrendingUp },
    { label: "Python Experience", value: "4 years", icon: Database },
    { label: "Location", value: "India", icon: MapPin },
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
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl border border-[#e9e9e7] hover:border-[#d4d4d1] transition-colors"
                >
                  <Icon className="w-6 h-6 text-[#787774] mb-3" />
                  <div className="text-3xl font-bold text-[#37352f] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#787774]">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
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

          <div>
            <h3 className="text-2xl font-semibold text-[#37352f] mb-8">
              Tech Stack
            </h3>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Core Technologies - Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <h4 className="text-xl font-bold text-[#37352f] mb-6">
                  Core Technologies
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "React",
                      description: "Component-based UI, Hooks, State management",
                      icon: "react",
                    },
                    {
                      name: "Next.js",
                      description: "Full-stack React framework, SSR, API routes",
                      icon: "next.js",
                    },
                    {
                      name: "TypeScript",
                      description: "Type-safe JavaScript, Enhanced developer experience",
                      icon: "typescript",
                    },
                    {
                      name: "Node.js",
                      description: "Server-side JavaScript, API development",
                      icon: "nodejs",
                    },
                    {
                      name: "Express.js",
                      description: "Web framework, REST APIs, Middleware",
                      icon: "express",
                    },
                    {
                      name: "MongoDB",
                      description: "NoSQL database, Schema design, CRUD operations",
                      icon: "mongodb",
                    },
                    {
                      name: "PostgreSQL",
                      description: "Relational database, Query optimization, Data modeling",
                      icon: "postgresql",
                    },
                    {
                      name: "Python",
                      description: "Data science, Automation, Scripting, ML fundamentals",
                      icon: "python",
                    },
                  ].map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                      className="bg-white p-5 rounded-xl border border-[#e9e9e7] hover:border-[#d4d4d1] transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <TechIcon name={tech.icon} size={40} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-[#37352f] mb-1.5">
                            {tech.name}
                          </h5>
                          <p className="text-sm text-[#787774] leading-relaxed">
                            {tech.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - Technologies & Additional Skills */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-8"
              >
                {/* Technologies */}
                <div>
                  <h4 className="text-xl font-bold text-[#37352f] mb-4">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "TanStack Start",
                      "JavaScript",
                      "TypeScript",
                      "Node.js",
                      "Express.js",
                      "REST APIs",
                      "Webhooks",
                      "MongoDB",
                      "PostgreSQL",
                      "Supabase",
                      "Python",
                      "Pandas",
                      "NumPy",
                      "Matplotlib",
                      "Seaborn",
                      "Plotly",
                      "Authentication & Authorization",
                      "API Integration",
                      "Deployment",
                    ].map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.02 }}
                        className="px-4 py-2 bg-white border border-[#e9e9e7] rounded-full text-sm text-[#37352f] hover:border-[#d4d4d1] transition-colors cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Additional Skills */}
                <div>
                  <h4 className="text-xl font-bold text-[#37352f] mb-4">
                    Additional Skills
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Full Backend Development",
                      "API Design & Business Logic",
                      "End-to-end Deployment",
                      "Data Cleaning & Preprocessing",
                      "Exploratory Data Analysis",
                      "Data Visualization",
                      "Machine Learning Fundamentals",
                      "Environment Configuration",
                      "Authentication & Authorization",
                    ].map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: 10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 text-blue-600"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-[#787774]">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

