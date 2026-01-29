"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroProfile() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-8"
        >
            <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-32 h-32 mx-auto mb-8"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                        <Image
                            src="https://img.genillu.com/gen/dBCBh5E8lS1T.png"
                            alt="Hamdan Khubaib"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                            unoptimized
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
