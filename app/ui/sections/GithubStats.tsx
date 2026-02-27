"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { ExternalLink } from "lucide-react";
import { GITHUB_CONTENT } from "@/app/data/github";

export default function GithubStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const username = GITHUB_CONTENT.username;

  return (
    <section id="github" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#f7f6f3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#37352f]">
            {GITHUB_CONTENT.title.text} <span className="italic font-serif">{GITHUB_CONTENT.title.highlight}</span>
          </h2>
          <p className="text-xl text-[#787774] max-w-2xl mx-auto mb-8">
            {GITHUB_CONTENT.description}
          </p>
          <motion.a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#37352f] text-white rounded-full font-medium hover:bg-black transition-colors"
          >
            {GITHUB_CONTENT.buttonLabel} <ExternalLink size={18} />
          </motion.a>
        </motion.div>

        <div className="space-y-12">
          {/* Contribution Calendar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl border border-[#e9e9e7] overflow-hidden flex flex-col items-center shadow-sm"
          >
            <div className="w-full overflow-x-auto flex justify-center py-4">
              <GitHubCalendar
                username={username}
                blockSize={14}
                blockMargin={5}
                fontSize={14}
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
