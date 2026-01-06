"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  ShoppingCart, 
  Target, 
  GraduationCap, 
  Puzzle,
  Network,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface ExamBazarProps {
  align?: "left" | "right";
}

export default function ExamBazar({ align = "left" }: ExamBazarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const coreFeatures = [
    {
      icon: BookOpen,
      title: "Structured Learning Platform",
      description: "A Udemy-like ecosystem where educators create comprehensive courses, learning modules, and exam-oriented preparation materials. Students follow structured learning paths tailored to their academic goals.",
      color: "from-blue-100 to-cyan-100",
    },
    {
      icon: Users,
      title: "Community-Driven Discussions",
      description: "A vibrant forum-style community where students interact, ask questions, share insights, and solve doubts together. Peer learning is encouraged through structured academic discussions.",
      color: "from-purple-100 to-pink-100",
    },
    {
      icon: MessageSquare,
      title: "Educator-Student Engagement",
      description: "Direct channels for teachers and scholars to interact with learners, answer questions, guide discussions, and build meaningful academic relationships beyond traditional classroom boundaries.",
      color: "from-green-100 to-teal-100",
    },
    {
      icon: ShoppingCart,
      title: "Academic Resource Marketplace",
      description: "An efficient marketplace where resource providers, educators, and content creators can distribute study materials, exam-focused content, and educational resources to their target academic audience.",
      color: "from-orange-100 to-yellow-100",
    },
  ];

  const problemPoints = [
    "Study materials scattered across multiple disconnected platforms",
    "Students juggling between different tools for learning, discussion, and resources",
    "Teachers struggling to reach the right students without platform dependency",
    "Resource providers lacking efficient distribution channels",
  ];

  const visionPoints = [
    "Unified learning experience combining courses, discussions, and resources",
    "Support for students across different boards, exams, and educational paths",
    "Long-term academic ecosystem, not just another content-hosting website",
    "Interconnected experience supporting students throughout their educational journey",
  ];

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={align === "right" ? "lg:ml-auto lg:max-w-5xl" : "lg:max-w-5xl"}
        >
          {/* Header Section */}
          <div className={`mb-16 ${align === "right" ? "text-right" : "text-center lg:text-left"}`}>
            <span className="text-sm font-semibold text-[#787774] uppercase tracking-wider">
              Flagship Project
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-[#37352f]">
              Exam Bazar
            </h2>
            <p className={`text-xl text-[#787774] max-w-4xl leading-relaxed mb-6 ${align === "right" ? "" : "mx-auto lg:mx-0"}`}>
              A centralized academic ecosystem that combines structured learning, community-driven discussion, and an educational marketplace to help students, teachers, and scholars learn and grow together on a single platform.
            </p>
            <div className={`flex items-center gap-2 text-sm text-[#787774] bg-[#f7f6f3] px-5 py-2.5 rounded-lg border border-[#e9e9e7] w-fit ${align === "right" ? "ml-auto" : "mx-auto lg:mx-0"}`}>
              <Target className="w-4 h-4 text-[#37352f]" />
              <span className="font-medium">In Active Development</span>
            </div>
          </div>

          {/* The Problem Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <div className="bg-[#f7f6f3] p-8 md:p-12 rounded-2xl border border-[#e9e9e7]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#e9e9e7] flex items-center justify-center">
                  <Puzzle className="w-6 h-6 text-[#37352f]" />
                </div>
                <h3 className="text-3xl font-bold text-[#37352f]">
                  The Problem We're Solving
                </h3>
              </div>
              <p className="text-lg text-[#787774] mb-6 leading-relaxed">
                Today's academic ecosystem is highly fragmented. Students, teachers, and resource providers are forced to navigate multiple disconnected platforms, creating friction in the learning process and limiting the potential for meaningful academic collaboration.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {problemPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#f7f6f3] border border-[#e9e9e7] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#787774]" />
                    </div>
                    <p className="text-[#787774] leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Core Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <div className="bg-[#f7f6f3] p-8 md:p-12 rounded-2xl border border-[#e9e9e7]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#e9e9e7] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#37352f]" />
                </div>
                <h3 className="text-3xl font-bold text-[#37352f]">
                  Our Vision
                </h3>
              </div>
              <p className="text-lg text-[#787774] mb-6 leading-relaxed">
                Exam Bazar is designed to function as a <strong className="text-[#37352f]">long-term academic ecosystem</strong>, not just another content-hosting website. We're building a platform where learning, discussion, teaching, and resource distribution coexist seamlessly.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {visionPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#37352f] flex-shrink-0 mt-0.5" />
                    <p className="text-[#787774] leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Core Features Grid */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-2">
                <Network className="w-6 h-6 text-[#787774]" />
                <h3 className="text-3xl font-bold text-[#37352f]">
                  Key Components
                </h3>
              </div>
              <p className="text-lg text-[#787774] max-w-3xl">
                Four interconnected pillars that form the foundation of Exam Bazar
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="bg-white p-8 rounded-2xl border border-[#e9e9e7] hover:border-[#d4d4d1] transition-all duration-300 hover:shadow-lg group"
                  >
                    <div className="w-16 h-16 rounded-xl bg-[#f7f6f3] border border-[#e9e9e7] flex items-center justify-center mb-6 group-hover:border-[#d4d4d1] transition-all duration-300">
                      <Icon className="w-8 h-8 text-[#37352f]" />
                    </div>
                    <h4 className="text-xl font-bold text-[#37352f] mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-[#787774] leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Centralized Ecosystem Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-[#f7f6f3] p-8 md:p-12 rounded-2xl border border-[#e9e9e7]"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#e9e9e7] flex items-center justify-center flex-shrink-0">
                <Network className="w-6 h-6 text-[#37352f]" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#37352f] mb-4">
                  One Unified Platform
                </h3>
                <p className="text-lg text-[#787774] leading-relaxed mb-4">
                  Instead of forcing students to jump between isolated services, Exam Bazar creates an <strong className="text-[#37352f]">interconnected academic experience</strong>. Whether you're looking for structured courses, need to discuss a concept, want to connect with educators, or find specific study materials — it all happens in one place.
                </p>
                <p className="text-lg text-[#787774] leading-relaxed">
                  This centralized approach reduces friction, saves time, and creates a more cohesive learning environment where every interaction contributes to your academic growth.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

