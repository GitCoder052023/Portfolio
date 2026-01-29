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
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="group bg-white p-6 rounded-xl border border-[#e9e9e7] hover:border-[#d4d4d1] transition-all duration-300 hover:shadow-lg"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#f7f6f3] border border-[#e9e9e7] flex items-center justify-center flex-shrink-0 group-hover:border-[#d4d4d1] transition-colors">
                                <Icon className="w-6 h-6 text-[#37352f]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-[#787774] mb-1">{method.label}</div>
                                <div className="text-[#37352f] font-medium truncate group-hover:text-[#2e2d29] transition-colors">
                                    {method.value}
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-[#787774] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                    </motion.a>
                );
            })}
        </div>
    );
}
