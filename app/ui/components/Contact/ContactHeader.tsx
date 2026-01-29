"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface ContactHeaderProps {
    isInView: boolean;
}

export default function ContactHeader({ isInView }: ContactHeaderProps) {
    return (
        <div className="text-center mb-16">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
            >
                <div className="w-16 h-16 rounded-2xl bg-[#f7f6f3] border border-[#e9e9e7] flex items-center justify-center mx-auto">
                    <MessageCircle className="w-8 h-8 text-[#37352f]" />
                </div>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#37352f]">
                Let's Build Together
            </h2>
            <p className="text-xl text-[#787774] max-w-2xl mx-auto leading-relaxed">
                Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together.
            </p>
        </div>
    );
}
