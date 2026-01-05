"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { BookOpen, Users, MessageSquare, ShoppingCart, Target } from "lucide-react";

export default function ExamBazar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: BookOpen,
      title: "Learning Platform",
      description: "Udemy-like ecosystem for structured educational content",
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Reddit-style discussions and student interactions",
    },
    {
      icon: MessageSquare,
      title: "Direct Engagement",
      description: "Connect educators with learners seamlessly",
    },
    {
      icon: ShoppingCart,
      title: "Marketplace",
      description: "Efficient content distribution to target audiences",
    },
  ];

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <span className="text-sm font-semibold text-[#787774] uppercase tracking-wider">
              Core Focus
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-4 text-[#37352f]">
              Exam Bazar
            </h2>
            <p className="text-lg text-[#787774] max-w-3xl">
              Centralized academic ecosystem for students, teachers, and educators across India. Launching this year.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden flex items-center justify-center"
            >
              <Image
                src="https://api.dicebear.com/7.x/shapes/svg?seed=ExamBazar&backgroundColor=b6e3f4,c0aede,d1d4f9"
                alt="Exam Bazar - Centralized Academic Ecosystem"
                width={300}
                height={300}
                className="w-full h-full object-contain p-8"
                unoptimized
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-semibold text-[#37352f] mb-4">
                  One Platform, Multiple Solutions
                </h3>
                <p className="text-[#787774] leading-relaxed">
                  Bringing learning, discussion, and resource sharing into a single, connected platform for students and educators across different boards and academic systems.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#787774] bg-[#f7f6f3] px-4 py-2 rounded-lg w-fit">
                <Target className="w-4 h-4" />
                <span>In Active Development</span>
              </div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white p-6 rounded-xl border border-[#e9e9e7] hover:border-[#d4d4d1] transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#37352f]" />
                  </div>
                  <h4 className="font-semibold text-[#37352f] mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-[#787774] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

