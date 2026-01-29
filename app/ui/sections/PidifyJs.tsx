"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, FileText, Github, Sparkles } from "lucide-react";
import {
  PIDIFY_CORE_FEATURES,
  PIDIFY_FEATURES,
  PIDIFY_PREVIEW_TOOLS,
} from "../../data/pidify";
import type { PidifyJsProps } from "../../types/components";

export default function PidifyJs({ align = "left" }: PidifyJsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [previewPage, setPreviewPage] = useState(1);

  const alignClass = align === "right" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <section
      id="projects"
      className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      {/* Subtle background patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-100 via-purple-50 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr from-pink-100 via-rose-50 to-transparent rounded-full blur-3xl"
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
                Featured Project
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#37352f] tracking-tight"
            >
              PidifyJS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#787774] max-w-3xl leading-relaxed"
            >
              A powerful, production-ready PDF viewer component library for React applications.
              Built with modern web technologies and designed for document management,
              e-signature applications, and more.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className={`flex flex-col ${alignClass} gap-12 lg:gap-16 items-stretch mb-20`}>
            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === "left" ? -40 : 40 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {PIDIFY_FEATURES.map((feature, index) => {
                  const Icon = feature.icon;
                  const isActive = activeFeature === index;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 0.25 + index * 0.05 }}
                      onMouseEnter={() => setActiveFeature(index)}
                      onMouseLeave={() => setActiveFeature(null)}
                      className="group"
                    >
                      <motion.div
                        animate={{ y: isActive ? -3 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 sm:p-5 bg-[#f7f6f3] rounded-xl border border-[#e9e9e7] hover:border-[#d4d4d1] hover:bg-white transition-all duration-300 h-full ${isActive ? 'shadow-lg' : 'shadow-sm'}`}
                      >
                        <div className="flex items-start gap-3">
                          <motion.div
                            animate={{ scale: isActive ? 1.1 : 1 }}
                            transition={{ duration: 0.2 }}
                            className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${feature.accent} flex items-center justify-center`}
                          >
                            <Icon className="w-5 h-5 text-[#37352f]" />
                          </motion.div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-[#37352f] text-sm sm:text-base">
                              {feature.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-[#787774] mt-1 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* PDF Viewer Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1"
            >
              <div className="relative h-full">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-pink-200/30 rounded-3xl blur-2xl" />

                {/* PDF Viewer container */}
                <div className="relative bg-white rounded-2xl border border-[#e9e9e7] shadow-2xl overflow-hidden h-full min-h-[480px]">
                  {/* Viewer header */}
                  <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#e9e9e7] bg-[#f7f6f3]">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="w-px h-4 bg-[#e9e9e7]" />
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#787774]" />
                        <span className="text-xs font-medium text-[#37352f]">document.pdf</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#787774] px-2 py-1 bg-white rounded-md border border-[#e9e9e7]">
                        Page {previewPage} of 12
                      </span>
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="flex items-center gap-1 px-4 sm:px-5 py-2.5 border-b border-[#e9e9e7] bg-white">
                    {PIDIFY_PREVIEW_TOOLS.map((tool, index) => {
                      const Icon = tool.icon;
                      return (
                        <motion.div
                          key={tool.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.08 }}
                          className="p-2 hover:bg-[#f7f6f3] rounded-lg transition-colors cursor-pointer group"
                          title={tool.label}
                        >
                          <Icon className="w-4 h-4 text-[#787774] group-hover:text-[#37352f] transition-colors" />
                        </motion.div>
                      );
                    })}
                    <div className="w-px h-5 bg-[#e9e9e7] mx-2" />
                    <div className="flex items-center gap-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPreviewPage(Math.max(1, previewPage - 1))}
                        className="p-2 hover:bg-[#f7f6f3] rounded-lg transition-colors text-[#787774] hover:text-[#37352f]"
                      >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPreviewPage(Math.min(12, previewPage + 1))}
                        className="p-2 hover:bg-[#f7f6f3] rounded-lg transition-colors text-[#787774] hover:text-[#37352f]"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* PDF Preview Area */}
                  <div className="p-4 sm:p-6 bg-[#f7f6f3] h-full min-h-[320px] flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="w-full max-w-[280px] aspect-[3/4] bg-white rounded-lg shadow-lg border border-[#e9e9e7] overflow-hidden relative"
                    >
                      {/* Document content simulation */}
                      <div className="p-6 space-y-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: "60%" } : { width: 0 }}
                          transition={{ duration: 0.6, delay: 0.9 }}
                          className="h-4 bg-gradient-to-r from-[#37352f] to-[#787774] rounded"
                        />
                        <div className="space-y-2 pt-2">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${85 - (i % 3) * 10}%` } : { width: 0 }}
                              transition={{ duration: 0.4, delay: 1 + i * 0.08 }}
                              className="h-2 bg-[#e9e9e7] rounded"
                            />
                          ))}
                        </div>
                        <div className="pt-3 space-y-2">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${80 - (i % 4) * 8}%` } : { width: 0 }}
                              transition={{ duration: 0.4, delay: 1.5 + i * 0.08 }}
                              className="h-2 bg-[#e9e9e7] rounded"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Highlight overlay demonstration */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 2 }}
                        className="absolute top-24 left-6 right-12 h-4 bg-yellow-200/60 rounded-sm"
                      />

                      {/* Page number */}
                      <div className="absolute bottom-3 left-0 right-0 text-center">
                        <span className="text-xs text-[#787774]">{previewPage}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core Features Grid */}
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-14">
            {PIDIFY_CORE_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group"
                >
                  <div className={`relative h-full p-6 sm:p-7 bg-gradient-to-br ${feature.color} rounded-2xl border ${feature.borderColor} backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}>
                    <div className="absolute inset-0 bg-white/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-white/80 border border-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-[#37352f]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#37352f] mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#787774] leading-relaxed">
                        {feature.description}
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
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            <motion.a
              href="https://github.com/GitCoder052023/PidifyJs"
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
            <motion.a
              href="https://github.com/GitCoder052023/PidifyJs#readme"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-4 bg-transparent border-2 border-[#e9e9e7] text-[#37352f] rounded-xl hover:border-[#d4d4d1] hover:bg-[#f7f6f3] transition-all duration-300 font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>Documentation</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
