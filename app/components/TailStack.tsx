"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  Settings,
} from "lucide-react";

interface TailStackProps {
  align?: "left" | "right";
}

interface TerminalLine {
  type: "command" | "output" | "success" | "ready" | "section" | "processing";
  text: string;
  delay: number;
}

export default function TailStack({ align = "right" }: TailStackProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: Package, title: "Proven Architecture", description: "TailStack Architecture — battle-tested for production-grade applications", accent: "from-amber-100 to-orange-100" },
    { icon: Zap, title: "Hit the Ground Running", description: "Pre-configured tools and beautiful UI system out of the box", accent: "from-yellow-100 to-amber-100" },
    { icon: Sliders, title: "Fully Customizable", description: "Not a rigid framework — adapt to your specific needs", accent: "from-emerald-100 to-teal-100" },
    { icon: Shield, title: "Industry-Standard Tooling", description: "Rigorous linting, TypeScript, and best practices built-in", accent: "from-sky-100 to-blue-100" },
    { icon: Rocket, title: "Scalable Foundation", description: "Perfect for MVPs and large-scale enterprise solutions", accent: "from-violet-100 to-purple-100" },
    { icon: Code2, title: "Full-Stack Ready", description: "Express, React, and Node.js perfectly integrated", accent: "from-rose-100 to-pink-100" },
  ];

  const architectureItems = [
    { icon: FolderTree, label: "packages/", sublabel: "Modular workspace" },
    { icon: Layout, label: "core/", sublabel: "Frontend + Backend" },
    { icon: Server, label: "node/", sublabel: "Backend template" },
    { icon: Terminal, label: "react/", sublabel: "Frontend template" },
  ];

  const highlights = [
    { icon: Brain, title: "ERN Stack", description: "Express, React, Node.js — complete full-stack solution with modern tooling", color: "from-blue-50 to-cyan-50", borderColor: "border-blue-200/50" },
    { icon: Layers, title: "Monorepo Ready", description: "Organized workspace structure with shared configurations", color: "from-purple-50 to-pink-50", borderColor: "border-purple-200/50" },
    { icon: Settings, title: "Production-Grade", description: "Robust structure tested in real-world applications at scale", color: "from-emerald-50 to-teal-50", borderColor: "border-emerald-200/50" },
  ];

  const terminalLines: TerminalLine[] = [
    { type: "section", text: "→ Initializing TailStack environment...", delay: 0 },
    { type: "command", text: "pnpm install", delay: 800 },
    { type: "output", text: "Resolving dependencies...", delay: 1200 },
    { type: "processing", text: "├─ typescript@5.x", delay: 1800 },
    { type: "processing", text: "├─ vite@6.x", delay: 2200 },
    { type: "processing", text: "├─ react@19.x", delay: 2600 },
    { type: "processing", text: "├─ express@5.x", delay: 3000 },
    { type: "processing", text: "├─ tailwindcss@4.x", delay: 3400 },
    { type: "processing", text: "└─ shadcn/ui@latest", delay: 3800 },
    { type: "output", text: "Packages: +847 ++++++++++++++++++++++++++", delay: 4800 },
    { type: "success", text: "Dependencies installed successfully", delay: 1800 },
    { type: "section", text: "→ Starting development servers...", delay: 10800 },
    { type: "command", text: "pnpm dev", delay: 11400 },
    { type: "success", text: "Frontend ready on http://localhost:3000", delay: 12200 },
    { type: "success", text: "Backend API on http://localhost:5000", delay: 13000 },
    { type: "success", text: "Hot reload enabled for all packages", delay: 13800 },
    { type: "success", text: "TypeScript type checking active", delay: 14600 },
    { type: "section", text: "→ Setup complete!", delay: 15400 },
    { type: "ready", text: "Ready to build your next incredible project 🚀", delay: 16200 },
  ];

  useEffect(() => {
    if (!isInView) return;

    const maxDelay = Math.max(...terminalLines.map((line) => line.delay));
    const totalCycle = maxDelay + 5000; // Show final state for 5s before reset

    const timer = setInterval(() => {
      setElapsedTime((prev) => (prev >= totalCycle ? 0 : prev + 100));
    }, 100);

    return () => clearInterval(timer);
  }, [isInView]);

  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [elapsedTime]);

  const alignClass = align === "right" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#f7f6f3] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-100 via-amber-50 to-transparent rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-rose-100 via-pink-50 to-transparent rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#787774]" />
              <span className="text-sm font-semibold text-[#787774] uppercase tracking-widest">Flagship Project</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#37352f] tracking-tight">TailStack</h2>
            <p className="text-lg sm:text-xl text-[#787774] max-w-3xl leading-relaxed">
              The flagship Monorepo Project Architecture and boilerplate for ERN applications.
            </p>
          </div>

          <div className={`flex flex-col ${alignClass} gap-12 lg:gap-16 items-stretch mb-20`}>
            {/* Features */}
            <div className="flex-1 space-y-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setActiveFeature(index)}
                    onMouseLeave={() => setActiveFeature(null)}
                    className={`flex gap-4 p-4 sm:p-5 bg-white rounded-xl border transition-all duration-300 ${
                      activeFeature === index ? "border-[#d4d4d1] shadow-md translate-x-1" : "border-[#e9e9e7] shadow-sm"
                    }`}
                  >
                    <div className={`flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br ${feature.accent} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-[#37352f]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#37352f] text-base sm:text-lg">{feature.title}</h4>
                      <p className="text-sm text-[#787774] mt-1">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Terminal */}
            <div className="flex-1">
              <div className="relative h-full min-h-[550px] bg-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-800/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs font-mono text-emerald-400/80">tailstack/ ~ zsh</span>
                </div>

                <div ref={terminalContentRef} className="p-6 font-mono text-sm space-y-1.5 overflow-y-auto h-[480px] scroll-smooth">
                  {terminalLines.map((line, index) => {
                    const isVisible = elapsedTime >= line.delay;
                    if (!isVisible) return null;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2 min-h-[1.25rem]"
                      >
                        {line.type === "command" && (
                          <>
                            <span className="text-emerald-400">$</span>
                            <span className="text-slate-200">{line.text}</span>
                          </>
                        )}
                        {line.type === "section" && <span className="text-cyan-400 font-semibold">{line.text}</span>}
                        {line.type === "output" && <span className="text-slate-400 pl-4">{line.text}</span>}
                        {line.type === "processing" && <span className="text-slate-300 pl-4">{line.text}</span>}
                        {line.type === "success" && (
                          <>
                            <span className="text-emerald-400">✓</span>
                            <span className="text-emerald-400/90">{line.text}</span>
                          </>
                        )}
                        {line.type === "ready" && <span className="text-emerald-300 font-bold pl-4 animate-pulse">{line.text}</span>}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Items */}
          <div className="mb-14 p-8 rounded-2xl bg-white border border-[#e9e9e7] grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {architectureItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200/50">
                <item.icon className="w-5 h-5 text-[#37352f]" />
                <div>
                  <p className="font-semibold text-[#37352f] text-sm">{item.label}</p>
                  <p className="text-xs text-[#787774]">{item.sublabel}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {highlights.map((h, i) => (
              <div key={i} className={`p-7 bg-gradient-to-br ${h.color} rounded-2xl border ${h.borderColor} hover:shadow-lg transition-all`}>
                <h3 className="text-xl font-semibold text-[#37352f] mb-3">{h.title}</h3>
                <p className="text-sm text-[#787774]">{h.description}</p>
              </div>
            ))}
          </div>

          <a
            href="https://github.com/GitCoder052023/TailStack"
            target="_blank"
            className="inline-flex items-center gap-3 px-7 py-4 bg-[#37352f] text-white rounded-xl font-medium shadow-lg hover:bg-black transition-all"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}