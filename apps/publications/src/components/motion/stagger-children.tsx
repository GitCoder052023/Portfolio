/**
 * StaggerChildren Animation Component
 * Animates children with staggered delays
 */

"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import { UI } from "@/constants";

interface StaggerChildrenProps {
    children: ReactNode;
    staggerDelay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

export function StaggerChildren({
    children,
    staggerDelay = 0.1,
    duration = UI.animation.normal,
    className,
    once = true,
}: StaggerChildrenProps) {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-50px" }}
            variants={containerVariants}
            className={className}
        >
            {Children.map(children, (child) => {
                if (!isValidElement(child)) return child;

                return (
                    <motion.div variants={itemVariants}>
                        {child}
                    </motion.div>
                );
            })}
        </motion.div>
    );
}

