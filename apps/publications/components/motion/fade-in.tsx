/**
 * FadeIn Animation Component
 * Wrapper for fade-in animations with optional delay and direction
 */

"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { UI } from "@/lib/constants";

type Direction = "up" | "down" | "left" | "right";

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: Direction;
    distance?: number;
    className?: string;
    once?: boolean;
}

const directionOffset = {
    up: { y: 1 },
    down: { y: -1 },
    left: { x: 1 },
    right: { x: -1 },
};

export function FadeIn({
    children,
    delay = 0,
    duration = UI.animation.normal,
    direction,
    distance = 24,
    className,
    once = true,
}: FadeInProps) {
    const offset = direction ? directionOffset[direction] : { x: 0, y: 0 };

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: offset.x ? offset.x * distance : 0,
                y: offset.y ? offset.y * distance : 0,
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
            }}
            viewport={{ once, margin: "-50px" }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // ease-out-quart
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
