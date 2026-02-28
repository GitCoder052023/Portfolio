"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroBackground() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const y2 = useTransform(scrollY, [0, 500], [0, 100]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                style={{ y: y1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl"
            />
            <motion.div
                style={{ y: y2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl"
            />
        </div>
    );
}

