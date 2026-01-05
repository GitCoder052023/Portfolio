"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Database, TrendingUp, MapPin } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Years Coding", value: "6+", icon: Code },
    { label: "Web Dev Focus", value: "3 years", icon: TrendingUp },
    { label: "Python Experience", value: "4 years", icon: Database },
    { label: "Location", value: "India", icon: MapPin },
  ];

  const expertise = [
    {
      category: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "TanStack Start"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "REST APIs", "Webhooks"],
    },
    {
      category: "Database",
      skills: ["MongoDB", "PostgreSQL", "Supabase"],
    },
    {
      category: "Data & ML",
      skills: ["Python", "Pandas", "NumPy", "ML Fundamentals"],
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
              <h3 className="text-2xl font-semibold text-[#37352f] mb-4">
                Full-Stack Developer
              </h3>
              <p className="text-[#787774] leading-relaxed mb-4">
                Building end-to-end applications independently. Strong focus on backend systems and application logic. Comfortable taking products from idea to deployment.
              </p>
              <p className="text-[#787774] leading-relaxed">
                Currently building <strong className="text-[#37352f]">Exam Bazar</strong> — a centralized academic ecosystem for students and educators.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-xl border border-[#e9e9e7]"
            >
              <h3 className="text-2xl font-semibold text-[#37352f] mb-4">
                Python & Data
              </h3>
              <p className="text-[#787774] leading-relaxed mb-4">
                4 years of experience in scripting, automation, and data analysis. Worked with Pandas, NumPy, Matplotlib, Seaborn, and Plotly.
              </p>
              <p className="text-[#787774] leading-relaxed">
                Preparing to re-engage with Python while learning <strong className="text-[#37352f]">machine learning fundamentals</strong>.
              </p>
            </motion.div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#37352f] mb-6">
              Tech Stack
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertise.map((area, index) => (
                <motion.div
                  key={area.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white p-6 rounded-xl border border-[#e9e9e7]"
                >
                  <h4 className="font-semibold text-[#37352f] mb-3">
                    {area.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs bg-[#f7f6f3] text-[#787774] rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

