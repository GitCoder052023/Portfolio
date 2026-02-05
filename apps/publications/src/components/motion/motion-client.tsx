/**
 * Motion Client Export
 * Re-exports motion from the client-safe path for Next.js App Router
 */

"use client";

export * from "motion/react";

// Also export the AnimatePresence for convenience
export { AnimatePresence, motion, useScroll, useTransform, useSpring, useInView } from "motion/react";

