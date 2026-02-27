"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CONTACT_METHODS } from "@/app/data/contact";
import { InViewProps } from "@/app/types/components";

export default function ContactGrid({ isInView }: InViewProps) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {CONTACT_METHODS.map((method, index) => {
                const Icon = method.icon;
                return (
                    <motion.a
                        key={method.label}
                        href={method.href}
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        whileHover={{ 
                            y: -5,
                            boxShadow: `0 20px 40px -15px ${(method as any).brandColor}33`
                        }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="group relative bg-white p-6 rounded-2xl border border-[#e9e9e7] hover:border-transparent transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
                    >
                        {/* Material background accent on hover */}
                        <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"
                            style={{ backgroundColor: (method as any).brandColor }}
                        />

                        <div className="flex items-start gap-4 relative z-10">
                            <motion.div 
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-out relative overflow-hidden"
                                style={{ 
                                    backgroundColor: '#f7f6f3',
                                    border: '1px solid #e9e9e7',
                                    color: (method as any).brandColor
                                }}
                            >
                                <Icon className="w-6 h-6 transition-colors duration-500 group-hover:text-white relative z-10" />
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100"
                                    style={{ background: (method as any).bgGradient || (method as any).brandColor }}
                                />
                            </motion.div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold uppercase tracking-wider text-[#a1a1a1] mb-1">{method.label}</div>
                                <div className="text-[#37352f] font-semibold truncate group-hover:text-black transition-colors">
                                    {method.value}
                                </div>
                            </div>

                            <div 
                                className="p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                                style={{ color: (method as any).brandColor }}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Bottom border accent */}
                        <div 
                            className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
                            style={{ backgroundColor: (method as any).brandColor }}
                        />
                    </motion.a>
                );
            })}
        </div>
    );
}
