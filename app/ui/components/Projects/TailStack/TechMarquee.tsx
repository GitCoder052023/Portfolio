"use client";

import { motion } from "framer-motion";

// All the tech icons for the marquee - comprehensive list
const TECH_STACK_ICONS = [
    // Frontend
    { name: "React", slug: "react" },
    { name: "TypeScript", slug: "typescript" },
    { name: "JavaScript", slug: "javascript" },
    { name: "Next.js", slug: "nextdotjs" },
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "HTML5", slug: "html5" },
    { name: "CSS3", slug: "css3" },
    { name: "Vite", slug: "vite" },
    // Backend & Database
    { name: "Node.js", slug: "nodedotjs" },
    { name: "Express", slug: "express" },
    { name: "MongoDB", slug: "mongodb" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Supabase", slug: "supabase" },
    { name: "Redis", slug: "redis" },
    { name: "Prisma", slug: "prisma" },
    { name: "Mongoose", slug: "mongoose" },
    // Auth
    { name: "Clerk", slug: "clerk" },
    { name: "Zod", slug: "zod" },
    // Async & Queues
    { name: "BullMQ", slug: "bull", iconUrl: "https://docs.bullmq.io/~gitbook/image?url=https%3A%2F%2F1340146492-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LUuDmt_xXMfG66Rn1GA%252Ficon%252FHOq80FSJicAlE4bVptC9%252Fbull.png%3Falt%3Dmedia%26token%3D10a2ba71-db1f-4d5c-8787-3dbedc8dd3ce&width=32&dpr=2&quality=100&sign=929d1d52&sv=2" },
    // Data & Tools
    { name: "Python", slug: "python" },
    { name: "Pandas", slug: "pandas" },
    { name: "NumPy", slug: "numpy" },
    { name: "Git", slug: "git" },
    { name: "Docker", slug: "docker" },
    { name: "GitHub", slug: "github" },
    { name: "VS Code", slug: "visualstudiocode" },
    // DevOps & Deployment
    { name: "Vercel", slug: "vercel" },
    { name: "Render", slug: "render" },
    { name: "Figma", slug: "figma" },
];

interface TechIconItemProps {
    name: string;
    slug: string;
    iconUrl?: string;
}

function TechIconItem({ name, slug, iconUrl }: TechIconItemProps) {
    return (
        <motion.div
            className="group relative flex-shrink-0 mx-6 md:mx-8"
            whileHover={{ scale: 1.2, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-[#f0efed] group-hover:bg-white border border-[#e5e4e2] group-hover:border-[#d4d4d1] group-hover:shadow-lg transition-all duration-300">
                <img
                    src={iconUrl || `https://cdn.simpleicons.org/${slug}/9a9a96`}
                    alt={name}
                    className={`w-6 h-6 md:w-7 md:h-7 opacity-50 group-hover:opacity-100 transition-all duration-300 filter group-hover:brightness-100 ${iconUrl ? 'grayscale group-hover:grayscale-0' : ''}`}
                    loading="lazy"
                    onError={(e) => {
                        // Fallback to a different icon service
                        const target = e.target as HTMLImageElement;
                        target.src = `https://api.iconify.design/simple-icons:${slug}.svg?color=%239a9a96`;
                    }}
                />

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        </motion.div>
    );
}

interface MarqueeRowProps {
    icons: TechIconItemProps[];
    direction?: "left" | "right";
    speed?: number;
}

function MarqueeRow({ icons, direction = "left", speed = 30 }: MarqueeRowProps) {
    // Double the icons for seamless loop
    const duplicatedIcons = [...icons, ...icons];

    return (
        <div className="relative flex overflow-hidden py-4 group">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#f7f6f3] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#f7f6f3] to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex items-center"
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
                style={{
                    // Pause animation on hover for the entire row
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
        <div className="mb-16">
            {/* Section header */}
            <div className="text-center mb-8">
                <h3 className="text-sm font-semibold text-[#9a9996] uppercase tracking-wider mb-2">
                    Tech Arsenal
                </h3>
                <p className="text-xl md:text-2xl font-semibold text-[#37352f]">
                    Technologies I Work With
                </p>
            </div>

            {/* Marquee container */}
            <div className="relative -mx-4 md:-mx-8 lg:-mx-16">
                <MarqueeRow icons={firstRowIcons} direction="left" speed={35} />
                <MarqueeRow icons={secondRowIcons} direction="right" speed={40} />
            </div>
        </div>
    );
}
