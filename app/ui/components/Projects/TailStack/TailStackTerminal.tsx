"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TAILSTACK_TERMINAL_LINES } from "@/app/data/tailstack";

interface TailStackTerminalProps {
    isInView: boolean;
}

export default function TailStackTerminal({ isInView }: TailStackTerminalProps) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const terminalContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isInView) return;

        const maxDelay = Math.max(...TAILSTACK_TERMINAL_LINES.map((line) => line.delay));
        const totalCycle = maxDelay + 5000;

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

    return (
        <div className="flex-1">
            <div className="relative min-h-[400px] bg-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-800/50">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs font-mono text-emerald-400/80">tailstack/ ~ zsh</span>
                </div>

                {/* SCROLLBAR HIDDEN HERE */}
                <div
                    ref={terminalContentRef}
                    className="p-6 font-mono text-sm space-y-1.5 overflow-y-auto h-[480px] scroll-smooth 
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {TAILSTACK_TERMINAL_LINES.map((line, index) => {
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
    );
}
