"use client";

import { useEffect, useRef, useState } from "react";
import { TAILSTACK_TERMINAL_LINES } from "@/app/data/tailstack";

export function useTailStackTerminal(isInView: boolean) {
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

    return {
        elapsedTime,
        terminalContentRef,
    };
}
