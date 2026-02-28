"use client";

import { motion } from "framer-motion";
import ActivityCalendar, { ThemeInput } from "react-activity-calendar";
import { ExternalLink, Loader2 } from "lucide-react";
import { GITHUB_CONTENT } from "@/app/data/github";
import Section from "@/app/ui/components/Shared/Section";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function GithubStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const username = GITHUB_CONTENT.username;

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch("/api/github-contributions");
        if (!res.ok) {
          throw new Error("Failed to fetch contributions data");
        }
        const data = await res.json();
        setContributions(data.contributions || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    if (isInView) {
      fetchContributions();
    }
  }, [isInView]);

  const customTheme: ThemeInput = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  };

  return (
    <Section id="github" className="bg-[#f7f6f3]">
      <div ref={ref}>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#37352f]">
            {GITHUB_CONTENT.title.text}{" "}
            <span className="italic font-serif">
              {GITHUB_CONTENT.title.highlight}
            </span>
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
        </div>

        <div className="space-y-12">
          {/* Contribution Calendar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl border border-[#e9e9e7] overflow-hidden flex flex-col items-center shadow-sm min-h-[220px] justify-center"
          >
            <div className="w-full overflow-x-auto flex justify-center py-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center text-[#787774] gap-3">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <p>Loading GitHub contributions...</p>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center">
                  <p>Unable to load contributions.</p>
                  <p className="text-sm">{error}</p>
                </div>
              ) : contributions.length > 0 ? (
                <ActivityCalendar
                  data={contributions}
                  blockSize={14}
                  blockMargin={5}
                  fontSize={14}
                  theme={customTheme}
                  labels={{
                    totalCount: `{{count}} contributions in the last year`,
                  }}
                />
              ) : (
                <p className="text-[#787774]">No contribution data found.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
