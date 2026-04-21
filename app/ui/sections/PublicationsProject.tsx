"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ProjectSectionProps } from "@/app/types/components";
import { PUBLICATIONS_BACKEND_DATA } from "@/app/data/publications-backend";
import ProjectBackground from "@/app/ui/components/Projects/Shared/ProjectBackground";
import ProjectHeader from "@/app/ui/components/Projects/Shared/ProjectHeader";
import ProjectFeatures from "@/app/ui/components/Projects/Shared/ProjectFeatures";
import ProjectActions from "@/app/ui/components/Projects/Shared/ProjectActions";
import { 
  Layers, RefreshCw, ShieldCheck, Cpu, Database, Server, Code, Globe, 
  Box, UserCheck, Zap, HardDrive, Activity, AlertTriangle,
  Feather, Grid, MessageCircle, Heart, ArrowUpRight
} from "lucide-react";

export default function PublicationsProject({ align = "left" }: ProjectSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const icons: Record<string, any> = {
    Layers,
    RefreshCw,
    ShieldCheck,
    Cpu,
    Box,
    Database,
    UserCheck,
    Zap,
    HardDrive,
    Activity,
    AlertTriangle,
    Feather,
    Grid,
    MessageCircle,
    Heart
  };

  const highlights = PUBLICATIONS_BACKEND_DATA.highlights.map(h => ({
    ...h,
    icon: icons[h.icon] || Layers,
    color: "from-slate-50 to-white",
    borderColor: "border-slate-200"
  }));

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <ProjectBackground isInView={isInView} colors={PUBLICATIONS_BACKEND_DATA.backgroundColors} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
             <span className="px-3 py-1 bg-[#37352f] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
               Mega Project
             </span>
             <span className="text-[#787774] text-xs font-medium tracking-wide">Backend Focused</span>
          </div>

          <ProjectHeader 
            isInView={isInView} 
            tagline={PUBLICATIONS_BACKEND_DATA.tagline}
            title={PUBLICATIONS_BACKEND_DATA.name}
            description={PUBLICATIONS_BACKEND_DATA.description}
          />

          {/* User Experience Section */}
          <div className="mb-24 sm:mb-32">
            <div className="flex flex-col items-center text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 mb-4 bg-slate-100 px-3 py-1 rounded-full border border-slate-200"
                >
                    <Feather size={12} className="text-slate-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform Experience</span>
                </motion.div>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#37352f] mb-4">Designed for Deep <span className="italic font-serif">Inquiry</span></h3>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                    A minimal, focused environment where complex ideas are published, engaged with, and built upon through collaborative intellectual exchange.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(PUBLICATIONS_BACKEND_DATA.userFeatures as any[]).map((feature: any, i) => {
                    const Icon = icons[feature.icon] || Feather;
                    return (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Icon size={80} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-[#37352f] group-hover:border-[#37352f] transition-colors duration-500">
                                    <Icon className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h4 className="text-lg font-bold text-[#37352f] mb-3">{feature.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {feature.description}
                                </p>
                                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span>Experience</span>
                                    <ArrowUpRight size={12} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
          </div>

          {/* Contextual Visual Divide */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative py-12 sm:py-20"
          >
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="bg-white px-6 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] border border-slate-200 rounded-full shadow-sm">
                    Technical Deep Dive
                </span>
            </div>
          </motion.div>

          <div className={`flex flex-col ${align === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-center mb-16 lg:mb-20`}>
            <div className="flex-1 w-full order-2 lg:order-1">
                <div className="mb-8 lg:hidden">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                        Process Flow
                    </span>
                </div>
                <BackendVisualizer isInView={isInView} />
            </div>
            
            <div className="flex-1 w-full order-1 lg:order-2">
                <div className="mb-6 hidden lg:block">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                        Process Flow
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {highlights.map((highlight, index) => (
                        <motion.div
                            key={highlight.title}
                            initial={{ opacity: 0, x: align === "left" ? 20 : -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === "left" ? 20 : -20 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            className="p-5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl hover:shadow-md transition-shadow"
                        >
                            <div className="flex gap-4 items-start">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <highlight.icon className="w-5 h-5 text-slate-700" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1">{highlight.title}</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{highlight.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
          </div>

          {/* Core Backend Infrastructure (The Schematic) */}
          <div className="bg-slate-50/50 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-16 relative overflow-hidden border border-slate-100 shadow-sm">
            {/* Minimalist Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: "radial-gradient(#37352f 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            
            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <div className="w-8 sm:w-10 h-[1px] bg-slate-300" />
                            <span className="text-slate-500 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">Engineering Schematics</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#37352f] leading-tight">
                            Core <span className="italic font-serif text-slate-400 underline decoration-slate-200 underline-offset-4 sm:underline-offset-8">Backend</span> Infrastructure
                        </h3>
                    </div>
                    <div className="flex self-start md:self-auto items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Verified</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-8 sm:gap-y-12">
                    {(PUBLICATIONS_BACKEND_DATA.features as any[]).map((feature: any, i) => {
                        const FeatureIcon = icons[feature.icon] || Code;
                        return (
                            <motion.div 
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                                className="group flex gap-4 sm:gap-6"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-emerald-200 group-hover:shadow-md transition-all duration-300">
                                        <FeatureIcon className="w-5 h-5 sm:w-6 h-6 text-slate-700 group-hover:text-emerald-600 transition-colors" />
                                    </div>
                                    {i < (PUBLICATIONS_BACKEND_DATA.features as any[]).length - 2 && (
                                        <div className="hidden sm:block w-px flex-1 bg-gradient-to-b from-slate-200 to-transparent mt-4" />
                                    )}
                                </div>

                                <div className="pt-1 sm:pt-2">
                                    <h4 className="text-lg sm:text-xl font-bold text-[#37352f] mb-1 sm:mb-2 flex items-center gap-3">
                                        {feature.title}
                                        <span className="text-[9px] sm:text-[10px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                            0{i + 1}
                                        </span>
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-slate-200/60">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12">
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Integrated Stack</span>
                        <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-4">
                            {["Next.js 15", "Supabase", "PostgreSQL", "Clerk", "Redis", "Svix Webhooks"].map(tech => (
                                <div key={tech} className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                                    <span className="text-[10px] sm:text-xs font-semibold text-slate-600">{tech}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="mt-12">
            <ProjectActions 
                isInView={isInView} 
                githubUrl={PUBLICATIONS_BACKEND_DATA.githubUrl} 
                docsUrl={PUBLICATIONS_BACKEND_DATA.liveUrl} 
                docsLabel="Live Site"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function BackendVisualizer({ isInView }: { isInView: boolean }) {
    const [activeStep, setActiveStep] = useState(0);
    
    useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, [isInView]);

    const steps = [
        { title: "API Gateway", icon: Globe, detail: "Next.js Edge Runtime / Middleware", color: "text-blue-500" },
        { title: "Controllers", icon: Server, detail: "Request Parsing & DTO Validation", color: "text-indigo-500" },
        { title: "Services", icon: Cpu, detail: "Business Logic & Core Operations", color: "text-purple-500" },
        { title: "Repository", icon: Database, detail: "Supabase / Postgres Interactions", color: "text-emerald-500" }
    ];

    return (
        <div className="bg-slate-50/50 border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-inner relative h-full min-h-[350px] sm:min-h-[400px] flex flex-col justify-center">
            <div className="space-y-6 sm:space-y-8 relative">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = activeStep === index;

                    return (
                        <div key={step.title} className="relative z-10">
                            <div className={`flex items-center gap-4 sm:gap-6 transition-all duration-500 ${isActive ? "translate-x-2 sm:translate-x-4" : "opacity-60"}`}>
                                <div className={`w-10 h-10 sm:w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isActive ? "bg-white shadow-lg ring-2 ring-slate-200 scale-105 sm:scale-110" : "bg-slate-200 shadow-none scale-100"}`}>
                                    <Icon className={`w-5 h-5 sm:w-6 h-6 ${isActive ? step.color : "text-slate-500"}`} />
                                </div>
                                <div>
                                    <h5 className={`text-sm sm:text-base font-bold transition-colors ${isActive ? "text-slate-900" : "text-slate-500"}`}>{step.title}</h5>
                                    <p className="text-[10px] sm:text-xs text-slate-400 font-mono">{step.detail}</p>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="absolute left-5 sm:left-6 top-10 sm:top-12 w-0.5 h-6 sm:h-8 bg-slate-200 overflow-hidden">
                                    <motion.div 
                                        className={`w-full bg-gradient-to-b from-blue-500 to-emerald-500`}
                                        initial={{ height: 0 }}
                                        animate={isActive ? { height: "100%" } : { height: 0 }}
                                        transition={{ duration: 3, ease: "linear" }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden xs:block">
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-100 max-w-[150px] sm:max-w-[200px]">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tight whitespace-nowrap">Active Process</span>
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-600 truncate">
                        {steps[activeStep].detail}
                    </div>
                </div>
            </div>
        </div>
    );
}
