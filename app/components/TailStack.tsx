"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Zap,
  Package,
  Code2,
  Sliders,
  Shield,
  Brain,
  Rocket,
  ArrowRight,
  Github,
  Layers,
  Server,
  Layout,
  Terminal,
  FolderTree,
  Settings
} from "lucide-react";

interface TailStackProps {
  align?: "left" | "right";
}

export default function TailStack({ align = "right" }: TailStackProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Package,
      title: "Proven Architecture",
      description: "TailStack Architecture — battle-tested for production-grade applications",
      accent: "from-amber-100 to-orange-100",
    },
    {
      icon: Zap,
      title: "Hit the Ground Running",
      description: "Pre-configured tools and beautiful UI system out of the box",
      accent: "from-yellow-100 to-amber-100",
    },
    {
      icon: Sliders,
      title: "Fully Customizable",
      description: "Not a rigid framework — adapt to your specific needs",
      accent: "from-emerald-100 to-teal-100",
    },
    {
      icon: Shield,
      title: "Industry-Standard Tooling",
      description: "Rigorous linting, TypeScript, and best practices built-in",
      accent: "from-sky-100 to-blue-100",
    },
    {
      icon: Rocket,
      title: "Scalable Foundation",
      description: "Perfect for MVPs and large-scale enterprise solutions",
      accent: "from-violet-100 to-purple-100",
    },
    {
      icon: Code2,
      title: "Full-Stack Ready",
      description: "Express, React, and Node.js perfectly integrated",
      accent: "from-rose-100 to-pink-100",
    },
  ];

  const architectureItems = [
    { icon: FolderTree, label: "packages/", sublabel: "Modular workspace" },
    { icon: Layout, label: "core/", sublabel: "Frontend + Backend" },
    { icon: Server, label: "node/", sublabel: "Backend template" },
    { icon: Terminal, label: "react/", sublabel: "Frontend template" },
  ];

  const highlights = [
    {
      icon: Brain,
      title: "ERN Stack",
      description: "Express, React, Node.js — complete full-stack solution with modern tooling",
      color: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200/50",
    },
    {
      icon: Layers,
      title: "Monorepo Ready",
      description: "Organized workspace structure with shared configurations",
      color: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200/50",
    },
    {
      icon: Settings,
      title: "Production-Grade",
      description: "Robust structure tested in real-world applications at scale",
      color: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200/50",
    },
  ];

  const terminalLines = [
    { type: "command", text: "pnpm install" },
    { type: "output", text: "Packages: +847 ++++++++++++++++++" },
    { type: "command", text: "pnpm dev" },
    { type: "success", text: "✓ Frontend ready on localhost:3000" },
    { type: "success", text: "✓ Backend ready on localhost:5000" },
    { type: "success", text: "✓ Hot reload enabled" },
    { type: "ready", text: "Ready to build! 🚀" },
  ];

  const alignClass = align === "right" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#f7f6f3] relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-100 via-amber-50 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-rose-100 via-pink-50 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-[#787774] to-transparent" />
              <span className="text-sm font-semibold text-[#787774] uppercase tracking-widest">
                Flagship Project
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#37352f] tracking-tight"
            >
              TailStack
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#787774] max-w-3xl leading-relaxed"
            >
              The flagship Monorepo Project Architecture and boilerplate for ERN applications. 
              A proven, customizable foundation for building scalable, secure, and maintainable 
              full-stack solutions.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className={`flex flex-col ${alignClass} gap-12 lg:gap-16 items-stretch mb-20`}>
            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === "left" ? -40 : 40 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1"
            >
              <div className="space-y-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  const isActive = activeFeature === index;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.25 + index * 0.06 }}
                      onMouseEnter={() => setActiveFeature(index)}
                      onMouseLeave={() => setActiveFeature(null)}
                      className="group"
                    >
                      <motion.div
                        animate={{ x: isActive ? 4 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex gap-4 p-4 sm:p-5 bg-white rounded-xl border border-[#e9e9e7] hover:border-[#d4d4d1] hover:shadow-lg transition-all duration-300 cursor-default ${isActive ? 'shadow-md' : 'shadow-sm'}`}
                      >
                        <motion.div
                          animate={{ scale: isActive ? 1.1 : 1 }}
                          transition={{ duration: 0.2 }}
                          className={`flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br ${feature.accent} flex items-center justify-center`}
                        >
                          <Icon className="w-5 h-5 text-[#37352f]" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#37352f] text-base sm:text-lg">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-[#787774] mt-1 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                        <motion.div
                          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                          transition={{ duration: 0.2 }}
                          className="hidden sm:flex items-center"
                        >
                          <ArrowRight className="w-4 h-4 text-[#787774]" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Terminal Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1"
            >
              <div className="relative h-full">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-orange-200/30 via-rose-200/20 to-purple-200/30 rounded-3xl blur-2xl" />
                
                {/* Terminal container */}
                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden h-full min-h-[420px]">
                  {/* Terminal header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm shadow-red-400/30" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/30" />
                        <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm shadow-green-400/30" />
                      </div>
                      <div className="w-px h-4 bg-slate-600" />
                      <span className="text-xs font-mono text-slate-400">zsh</span>
                    </div>
                    <div className="text-xs font-mono text-emerald-400/80 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      tailstack/
                    </div>
                  </div>

                  {/* Terminal content */}
                  <div className="p-5 sm:p-6 font-mono text-sm space-y-2">
                    {terminalLines.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.12 }}
                        className="flex items-start gap-2"
                      >
                        {line.type === "command" && (
                          <>
                            <span className="text-emerald-400 select-none">$</span>
                            <span className="text-slate-200">{line.text}</span>
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                              className="text-emerald-400"
                            >
                              _
                            </motion.span>
                          </>
                        )}
                        {line.type === "output" && (
                          <span className="text-slate-500 pl-4">{line.text}</span>
                        )}
                        {line.type === "success" && (
                          <span className="text-emerald-400/80 pl-4">{line.text}</span>
                        )}
                        {line.type === "ready" && (
                          <motion.span
                            animate={{ opacity: [0.7, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                            className="text-emerald-300 font-medium pl-4 mt-2"
                          >
                            {line.text}
                          </motion.span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-14">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group"
                >
                  <div className={`relative h-full p-6 sm:p-7 bg-gradient-to-br ${highlight.color} rounded-2xl border ${highlight.borderColor} backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}>
                    <div className="absolute inset-0 bg-white/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-white/80 border border-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-[#37352f]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#37352f] mb-3">
                        {highlight.title}
                      </h3>
                      <p className="text-sm text-[#787774] leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <motion.a
              href="https://github.com/GitCoder052023/TailStack"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 px-7 py-4 bg-[#37352f] text-white rounded-xl hover:bg-[#2e2d29] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
