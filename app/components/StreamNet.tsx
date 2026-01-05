"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ExternalLink, MessageSquare, Shield, Sparkles } from "lucide-react";

export default function StreamNet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: MessageSquare,
      title: "Real-time Messaging",
      description: "Instant communication within local networks",
    },
    {
      icon: Shield,
      title: "Secure & Encrypted",
      description: "End-to-end encryption for safe conversations",
    },
    {
      icon: Sparkles,
      title: "AI-Assisted",
      description: "Powered by ChatLLaMA for intelligent conversations",
    },
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#f7f6f3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <span className="text-sm font-semibold text-[#787774] uppercase tracking-wider">
              Featured Project
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-4 text-[#37352f]">
              StreamNet
            </h2>
            <p className="text-lg text-[#787774] max-w-3xl">
              A secure, real-time chat application designed for local network communication, with integrated AI capabilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <p className="text-lg leading-relaxed text-[#787774]">
                Secure real-time chat application for local networks with AI-powered conversations using ChatLLaMA.
              </p>

              <div className="grid gap-4 mt-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[#e9e9e7] hover:border-[#d4d4d1] transition-colors"
                    >
                      <div className="p-2 bg-[#f7f6f3] rounded-lg">
                        <Icon className="w-5 h-5 text-[#37352f]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#37352f] mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-[#787774]">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.a
                href="https://github.com/GitCoder052023/StreamNet"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#37352f] text-white rounded-lg hover:bg-[#2e2d29] transition-colors duration-200 font-medium mt-4"
              >
                View on GitHub
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl overflow-hidden flex items-center justify-center order-1 lg:order-2"
            >
              <Image
                src="https://api.dicebear.com/7.x/shapes/svg?seed=StreamNet&backgroundColor=b6e3f4,c0aede,d1d4f9"
                alt="StreamNet - Secure Real-time Chat Application with AI"
                width={300}
                height={300}
                className="w-full h-full object-contain p-8"
                unoptimized
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

