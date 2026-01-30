"use client";

import { motion } from "framer-motion";

import { TECH_STACK_ICONS } from "@/app/constants/techstackicons";
import type { MarqueeRowProps, TechIconItemProps } from "@/app/types/TechMarquee";

function TechIconItem({ name, slug, color, iconUrl }: TechIconItemProps) {
    return (
        <motion.div
            className="group relative flex-shrink-0 mx-4 md:mx-6 cursor-pointer flex flex-col items-center gap-2.5"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.3 }}
        >
            {/* Animated background glow - subtle */}
            <motion.div
                className={`absolute -inset-3 rounded-2xl bg-gradient-to-br ${color} opacity-0 blur-lg group-hover:opacity-15 transition-opacity duration-500`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.15 }}
            />

            {/* Main icon container */}
            <motion.div 
                className={`relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-md group-hover:shadow-lg transition-shadow duration-500 border border-white/20`}
                whileHover={{ boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.08)" }}
            >
                {/* Subtle shine effect */}
                <motion.div 
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500" 
                />

                {/* Icon image */}
                <motion.img
                    src={iconUrl || `https://cdn.simpleicons.org/${slug}/ffffff`}
                    alt={name}
                    className="w-6 h-6 md:w-7 md:h-7 relative z-10 filter drop-shadow"
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    loading="lazy"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://api.iconify.design/simple-icons:${slug}.svg?color=ffffff`;
                    }}
                />
            </motion.div>

            {/* Tech name label below icon */}
            <motion.span
                className="text-xs font-medium text-slate-700 whitespace-nowrap text-center"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {name}
            </motion.span>
        </motion.div>
    );
}

function MarqueeRow({ icons, direction = "left", speed = 30 }: MarqueeRowProps) {
    // Double the icons for seamless loop
    const duplicatedIcons = [...icons, ...icons];

    return (
        <div className="relative flex overflow-hidden py-10 group">
            {/* Enhanced fade edges with gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex items-center gap-3"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
            >
                {duplicatedIcons.map((icon, idx) => (
                    <TechIconItem key={`${icon.slug}-${idx}`} {...icon} />
                ))}
            </motion.div>
        </div>
    );
}

export default function TechMarquee() {
    // Split icons into two rows
    const firstRowIcons = TECH_STACK_ICONS.slice(0, Math.ceil(TECH_STACK_ICONS.length / 2));
    const secondRowIcons = TECH_STACK_ICONS.slice(Math.ceil(TECH_STACK_ICONS.length / 2));

    return (
        <div className="mb-20">
            {/* Section header with enhanced styling */}
            <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="inline-flex items-center justify-center gap-2 mb-4">
                    <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        Tech Arsenal
                    </h3>
                    <div className="h-1 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                </div>
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                    Technologies I Craft With
                </p>
            </motion.div>

            {/* Marquee container with refined styling */}
            <div className="relative -mx-4 md:-mx-8 lg:-mx-16 bg-gradient-to-b from-slate-50/50 to-white/30 rounded-3xl px-4 md:px-8 lg:px-16 py-8 backdrop-blur-sm border border-slate-200/50">
                <MarqueeRow icons={firstRowIcons} direction="left" speed={40} />
                <MarqueeRow icons={secondRowIcons} direction="right" speed={45} />
            </div>
        </div>
    );
}
