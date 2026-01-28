"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { 
  Zap,
  Package,
  Code2,
  Sliders,
  Lightbulb,
  Shield,
  Brain,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Github
} from "lucide-react";

interface TailStackProps {
  align?: "left" | "right";
}

export default function TailStack({ align = "right" }: TailStackProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Package,
      title: "Proven Architecture",
      description: "TailStack Architecture - battle-tested for production-grade applications",
    },
    {
      icon: Zap,
      title: "Hit the Ground Running",
      description: "Pre-configured tools and beautiful UI system out of the box",
    },
    {
      icon: Sliders,
      title: "Fully Customizable",
      description: "Not a rigid framework - adapt to your specific needs",
    },
    {
      icon: Shield,
      title: "Industry-Standard Tooling",
      description: "Rigorous linting and best practices built-in",
    },
    {
      icon: Rocket,
      title: "Scalable Foundation",
      description: "Perfect for MVPs and large-scale enterprise solutions",
    },
    {
      icon: Code2,
      title: "Full-Stack Ready",
      description: "Express, React, and Node.js perfectly integrated",
    },
  ];

  const highlights = [
    {
      icon: Brain,
      title: "ERN Stack",
      description: "Express, React, Node.js - complete full-stack solution",
      color: "from-blue-100 to-cyan-100",
    },
    {
      icon: Lightbulb,
      title: "Customizable",
      description: "Designed to be adapted to your project requirements",
      color: "from-purple-100 to-pink-100",
    },
    {
      icon: Shield,
      title: "Production-Ready",
      description: "Robust structure used for real-world applications",
      color: "from-green-100 to-teal-100",
    },
  ];

  const alignClass = align === "right" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#f7f6f3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <span className="text-sm font-semibold text-[#787774] uppercase tracking-wider">
              Flagship Project
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-4 text-[#37352f]">
              TailStack
            </h2>
            <p className="text-lg text-[#787774] max-w-2xl">
              The flagship Monorepo Project Architecture and boilerplate for ERN (Express, React, Node.js) applications. A proven, customizable foundation for building scalable, secure, and maintainable full-stack solutions.
            </p>
          </div>

          <div className={`flex flex-col ${alignClass} gap-12 items-center mb-16`}>
            <motion.div
              initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === "left" ? -40 : 40 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1"
            >
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                      className="flex gap-4 p-4 bg-white rounded-lg border border-[#e9e9e7] hover:border-[#d4d4d1] transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#37352f]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#37352f]">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-[#787774] mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 rounded-2xl blur-2xl opacity-20" />
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-mono text-emerald-400">tailstack/</div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                      </div>
                    </div>
                    <div className="bg-slate-950 rounded-lg p-6 space-y-3 font-mono text-sm">
                      <div className="text-emerald-400">$ <span className="text-slate-300">pnpm install</span></div>
                      <div className="text-emerald-400">$ <span className="text-slate-300">pnpm dev</span></div>
                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <div className="text-slate-400">✓ Frontend ready on port 3000</div>
                        <div className="text-slate-400">✓ Backend ready on port 5000</div>
                        <div className="text-slate-400">✓ Database connected</div>
                        <div className="text-emerald-400 mt-3">Ready to build! 🚀</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="group relative p-6 bg-white rounded-2xl border border-[#e9e9e7] hover:border-[#d4d4d1] transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10`} />
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${highlight.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-[#37352f]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#37352f] mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-[#787774] leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <motion.a
              href="https://github.com/GitCoder052023/TailStack"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#37352f] text-white rounded-lg hover:bg-[#2e2d29] transition-colors duration-200 font-medium"
            >
              <Github className="w-5 h-5" />
              View on GitHub
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
