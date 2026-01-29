"use client";

import { motion } from "framer-motion";

import { InViewProps } from "@/app/types/components";
import { usePidifyViewer } from "@/app/hooks/usePidifyViewer";
import { FileText, ArrowRight } from "lucide-react";
import { PIDIFY_PREVIEW_TOOLS } from "@/app/data/pidify";

export default function PidifyViewer({ isInView }: InViewProps) {
    const { previewPage, nextPage, prevPage } = usePidifyViewer();

    return (
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
                                onClick={prevPage}
                                className="p-2 hover:bg-[#f7f6f3] rounded-lg transition-colors text-[#787774] hover:text-[#37352f]"
                            >
                                <ArrowRight className="w-4 h-4 rotate-180" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={nextPage}
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
    );
}
