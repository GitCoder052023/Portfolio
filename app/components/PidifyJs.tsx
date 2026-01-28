"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  FileText,
  Zap,
  Edit3,
  Bookmark,
  List,
  Type,
  Eye,
  Moon,
  Lightbulb,
  TreePine,
  Code,
  ArrowRight,
  CheckCircle2,
  Github
} from "lucide-react";

interface PidifyJsProps {
  align?: "left" | "right";
}

export default function PidifyJs({ align = "left" }: PidifyJsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Eye,
      title: "Modern UI",
      description: "Clean, intuitive interface built with TailwindCSS",
    },
    {
      icon: Zap,
      title: "Responsive Design",
      description: "Seamless experience across all device sizes",
    },
    {
      icon: FileText,
      title: "High Performance",
      description: "Optimized rendering with smooth animations",
    },
    {
      icon: Lightbulb,
      title: "Navigation Tools",
      description: "Page navigation, zoom controls, and rotation",
    },
    {
      icon: Edit3,
      title: "Annotations",
      description: "Highlights, notes, and drawing capabilities",
    },
    {
      icon: Bookmark,
      title: "Bookmarks",
      description: "Create and manage bookmarks for quick navigation",
    },
    {
      icon: List,
      title: "Document Outline",
      description: "Auto-generated table of contents from PDF structure",
    },
    {
      icon: Type,
      title: "Text Layer Support",
      description: "Searchable and selectable text in PDFs",
    },
  ];

  const coreFeatures = [
    {
      icon: Code,
      title: "TypeScript First",
      description: "Fully typed for superior developer experience",
      color: "from-blue-100 to-cyan-100",
    },
    {
      icon: TreePine,
      title: "Tree-shakeable",
      description: "Only import what you need",
      color: "from-green-100 to-teal-100",
    },
    {
      icon: Moon,
      title: "Dark Mode Ready",
      description: "Fully compatible with dark mode themes",
      color: "from-purple-100 to-pink-100",
    },
  ];

  const alignClass = align === "right" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <span className="text-sm font-semibold text-[#787774] uppercase tracking-wider">
              Featured Project
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-4 text-[#37352f]">
              PidifyJS
            </h2>
            <p className="text-lg text-[#787774] max-w-2xl">
              A powerful, production-ready PDF viewer component library for React applications. Built with modern web technologies and designed for document management, e-signature applications, and more.
            </p>
          </div>

          <div className={`flex flex-col ${alignClass} gap-12 items-center mb-16`}>
            <motion.div
              initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === "left" ? -40 : 40 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1"
            >
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                      className="p-4 bg-[#f7f6f3] rounded-lg border border-[#e9e9e7] hover:border-[#d4d4d1] transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-[#37352f] mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-[#37352f] text-sm">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-[#787774] mt-1">
                            {feature.description}
                          </p>
                        </div>
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-2xl blur-2xl opacity-20" />
                <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-[#e9e9e7]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-[#37352f]">PDF Viewer</div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 space-y-3 min-h-64">
                      <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-16 h-16 text-blue-300" />
                      </div>
                      <div className="flex gap-2 mt-4">
                        <div className="px-3 py-1 bg-[#37352f] text-white text-xs rounded hover:bg-[#2e2d29] transition-colors cursor-pointer">
                          Download
                        </div>
                        <div className="px-3 py-1 border border-[#e9e9e7] text-xs rounded hover:bg-[#f7f6f3] transition-colors cursor-pointer">
                          Print
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="group relative p-6 bg-white rounded-2xl border border-[#e9e9e7] hover:border-[#d4d4d1] transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10`} />
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-[#37352f]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#37352f] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#787774] leading-relaxed">
                      {feature.description}
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
              href="https://github.com/GitCoder052023/PidifyJs"
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
