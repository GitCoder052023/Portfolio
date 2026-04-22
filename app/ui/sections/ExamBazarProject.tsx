"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Cpu, Zap, Shield, FileText, Mail, 
  Database, Terminal, Activity, ArrowRight, 
  Server, Globe, Code, Lock, CheckCircle2,
  ShoppingBag, CreditCard, Search, Github, ExternalLink
} from "lucide-react";
import { EXAM_BAZAR_DATA } from "@/app/data/exam-bazar";

export default function ExamBazarProject() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const icons: Record<string, any> = {
    Cpu, Zap, Shield, FileText, Mail, Database, Terminal, Activity, Server, Globe, Code, Lock
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Intro Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-slate-300" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Legacy Project Case Study</span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-bold text-[#37352f] mb-8 tracking-tight">
            Exam <span className="italic font-serif text-slate-400">Bazar</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-12">
              <p className="text-xl text-slate-500 leading-relaxed mb-8">
                {EXAM_BAZAR_DATA.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Part 1: The User Experience (Non-Technical) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-4 text-slate-400">
              <ShoppingBag size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Marketplace Experience</span>
            </div>
            <h3 className="text-4xl font-bold text-[#37352f] mb-8">
              Frictionless Commerce for <span className="italic font-serif text-indigo-500">Education</span>
            </h3>
            
            <div className="space-y-8">
              {EXAM_BAZAR_DATA.ecommerceFeatures.map((feature, i) => (
                <motion.div key={i} variants={itemVariants} className="flex gap-4">
                  <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <p className="text-slate-600 leading-relaxed font-medium">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative"
          >
            <div className="aspect-video bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl relative group">
              {/* Abstract UI Representation */}
              <div className="absolute inset-4 sm:inset-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                <div className="h-10 border-b border-slate-50 flex items-center px-4 gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                </div>
                <div className="flex-1 p-6 grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-4">
                    <div className="h-6 w-full bg-slate-50 rounded" />
                    <div className="grid grid-cols-2 gap-3">
                      {[1,2,3,4].map(j => (
                        <div key={j} className="h-24 bg-slate-50/50 rounded-xl border border-slate-100/50" />
                      ))}
                    </div>
                  </div>
                  <div className="h-full bg-slate-50/50 rounded-xl border border-slate-100/50" />
                </div>
              </div>

              {/* Floating Tech Badges */}
              <div className="absolute bottom-10 right-10 flex gap-2">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-100 flex items-center gap-2">
                  <CreditCard size={12} className="text-indigo-500" />
                  <span className="text-[9px] font-bold uppercase tracking-tight text-slate-500">Razorpay</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-100 flex items-center gap-2">
                  <Search size={12} className="text-indigo-500" />
                  <span className="text-[9px] font-bold uppercase tracking-tight text-slate-500">Supabase</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Divide */}
        <div className="relative py-24 mb-24">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="bg-white px-8 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] border border-slate-100 rounded-full shadow-sm">
                    Backend Engineering Deep-Dive
                </span>
            </div>
        </div>

        {/* Part 2: Chronological Technical Storytelling (RESTORED EXACTLY AS IT WAS) */}
        <div className="space-y-32 mb-40">
          {EXAM_BAZAR_DATA.story.map((step, index) => {
            const Icon = icons[step.icon];
            const isEven = index % 2 === 0;

            return (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={!isEven ? 'lg:order-2' : ''}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 mb-8 text-slate-600 shadow-sm">
                    <Icon size={24} />
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                     <span className="text-[10px] font-mono font-bold text-slate-300">PHASE 0{index + 1}</span>
                     <div className="h-px w-12 bg-slate-100" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#37352f] mb-6 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-8 text-lg">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`relative ${!isEven ? 'lg:order-1' : ''}`}
                >
                  <Visualizer index={index} />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* System Status Warning */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 p-8 bg-amber-50 border border-amber-100 rounded-[2rem]"
        >
            <div className="flex items-center gap-2 mb-4 text-amber-600">
                <Activity size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">Post-Operational Status</span>
            </div>
            <p className="text-amber-800/80 leading-relaxed text-lg">
                Exam Bazar is currently not operational. This showcase serves as a comprehensive archive of the technical architecture and user experience designed during its active phase.
            </p>
        </motion.div>

        {/* Footer Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-12 mt-20 border-t border-slate-100"
        >
          <div className="flex gap-4">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Stack</span>
             <div className="flex gap-2">
                {["Express 5", "TS", "Supabase", "Redis"].map(t => (
                    <span key={t} className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">• {t}</span>
                ))}
             </div>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-[#37352f] text-white rounded-full font-bold text-sm hover:bg-black transition-colors shadow-lg">
              <Github size={16} />
              Repository
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#37352f] border border-slate-200 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm">
              <ExternalLink size={16} />
              Operational Archive
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Visualizer({ index }: { index: number }) {
  if (index === 0) return <ClusterVisualizer />;
  if (index === 1) return <TransactionVisualizer />;
  if (index === 2) return <AssetVisualizer />;
  if (index === 3) return <PDFVisualizer />;
  if (index === 4) return <AIVisualizer />;
  return null;
}

function ClusterVisualizer() {
    return (
        <div className="bg-slate-50/50 border border-slate-200 rounded-[2.5rem] p-12 aspect-square flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="relative flex flex-col items-center">
                {/* Master */}
                <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-24 h-24 bg-white border-2 border-slate-200 rounded-3xl shadow-xl flex flex-col items-center justify-center z-10 relative"
                >
                    <Cpu className="text-slate-700" size={32} />
                    <span className="text-[8px] font-bold mt-2 text-slate-400">MASTER</span>
                </motion.div>
                
                {/* Workers */}
                <div className="grid grid-cols-3 gap-12 mt-12">
                    {[1, 2, 3].map(w => (
                        <motion.div 
                            key={w}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: w * 0.2 }}
                            className="w-16 h-16 bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col items-center justify-center relative"
                        >
                            <Activity size={16} className={w === 3 ? "text-emerald-500" : "text-slate-400"} />
                            <span className="text-[7px] font-bold mt-2 text-slate-400 uppercase">W-0{w}</span>
                            {/* Line to master */}
                            <div className="absolute -top-12 left-1/2 w-px h-12 bg-slate-100" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TransactionVisualizer() {
    return (
        <div className="bg-slate-50/50 border border-slate-200 rounded-[2.5rem] p-12 aspect-square flex flex-col items-center justify-center gap-8">
            <div className="w-full space-y-4">
                {[
                    { label: "Payment Verification", status: "complete", icon: Lock },
                    { label: "DB Transaction: START", status: "complete", icon: Database },
                    { label: "Redis Cache: INVALIDATE", status: "active", icon: Zap },
                    { label: "Commit State", status: "pending", icon: CheckCircle2 }
                ].map((step, i) => (
                    <motion.div 
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${step.status === 'complete' ? 'bg-emerald-50 border-emerald-100' : step.status === 'active' ? 'bg-white border-slate-200 shadow-lg scale-105' : 'bg-slate-50 border-slate-100 opacity-50'}`}
                    >
                        <step.icon size={16} className={step.status === 'complete' ? 'text-emerald-500' : 'text-slate-400'} />
                        <span className={`text-xs font-bold ${step.status === 'complete' ? 'text-emerald-700' : 'text-slate-600'}`}>{step.label}</span>
                        {step.status === 'active' && <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="ml-auto w-2 h-2 rounded-full bg-blue-500" />}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function AssetVisualizer() {
    return (
        <div className="bg-slate-50/50 border border-slate-200 rounded-[2.5rem] p-12 aspect-square relative flex items-center justify-center">
            <div className="relative">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-48 h-48 border-2 border-dashed border-slate-200 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 border border-slate-100 rounded-full" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white border-2 border-slate-200 rounded-2xl shadow-xl flex items-center justify-center">
                        <Lock size={24} className="text-slate-700" />
                    </div>
                </div>
                {/* Permissions Nodes */}
                {[0, 1, 2].map(i => (
                    <motion.div 
                        key={i}
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 3, delay: i, repeat: Infinity }}
                        className="absolute w-4 h-4 bg-emerald-500 rounded-full"
                        style={{ 
                            top: `${50 + 40 * Math.sin(i * 2.1)}%`, 
                            left: `${50 + 40 * Math.cos(i * 2.1)}%` 
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function PDFVisualizer() {
    return (
        <div className="bg-slate-50/50 border border-slate-200 rounded-[2.5rem] p-12 aspect-square flex items-center justify-center">
            <div className="w-64 h-80 bg-white border border-slate-200 rounded-lg shadow-2xl p-6 relative overflow-hidden group">
                <div className="h-4 w-1/2 bg-slate-100 rounded mb-8" />
                <div className="space-y-3">
                    <div className="h-2 w-full bg-slate-50 rounded" />
                    <div className="h-2 w-full bg-slate-50 rounded" />
                    <div className="h-2 w-3/4 bg-slate-50 rounded" />
                </div>
                <div className="absolute bottom-6 left-6 w-12 h-12 border border-slate-100 rounded flex items-center justify-center">
                    <div className="w-8 h-8 bg-slate-50 rounded-sm" />
                </div>
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <FileText size={48} className="text-slate-200" />
                </motion.div>
                {/* Verification Overlay */}
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </div>
    );
}

function AIVisualizer() {
    return (
        <div className="bg-slate-50/50 border border-slate-200 rounded-[2.5rem] p-12 aspect-square flex flex-col items-center justify-center">
            <div className="flex items-center gap-4 mb-12">
                <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-400">LEGAL_TERMS.pdf</div>
                <ArrowRight size={16} className="text-slate-300" />
                <div className="w-12 h-12 bg-white border-2 border-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-blue-500 font-bold">AI</span>
                </div>
            </div>
            <div className="w-full space-y-3">
                <motion.div animate={{ width: ["100%", "90%", "100%"] }} transition={{ duration: 2, repeat: Infinity }} className="h-2 bg-blue-50 rounded-full" />
                <motion.div animate={{ width: ["100%", "95%", "100%"] }} transition={{ duration: 2.5, repeat: Infinity }} className="h-2 bg-blue-50 rounded-full" />
                <motion.div animate={{ width: ["100%", "85%", "100%"] }} transition={{ duration: 1.8, repeat: Infinity }} className="h-2 bg-blue-50 rounded-full" />
            </div>
            <div className="mt-8 flex gap-2">
                <div className="w-1 h-1 rounded-full bg-blue-400 animate-bounce" />
                <div className="w-1 h-1 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
            </div>
        </div>
    );
}
