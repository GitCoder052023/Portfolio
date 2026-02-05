/**
 * Container Component
 * Constrains content width and centers it
 */

import { cn } from "@/utils";
import type { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    as?: "div" | "section" | "article" | "main";
    size?: "default" | "prose";
}

export function Container({
    children,
    className,
    as: Component = "div",
    size = "default",
}: ContainerProps) {
    return (
        <Component
            className={cn(
                size === "prose" ? "container-prose" : "container",
                className
            )}
        >
            {children}
        </Component>
    );
}

