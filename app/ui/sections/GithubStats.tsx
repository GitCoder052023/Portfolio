"use client";

import { motion, AnimatePresence } from "framer-motion";
import ActivityCalendar, { ThemeInput } from "react-activity-calendar";
import { ExternalLink, Loader2, Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import { GITHUB_CONTENT } from "@/app/data/github";
import Section from "@/app/ui/components/Shared/Section";
import { useRef, useState, useMemo } from "react";
import { useInView } from "framer-motion";
import { useGithubContributions } from "@/app/hooks/useGithubContributions";

const customTheme: ThemeInput = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

export default function GithubStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const startYear = 2023; // As seen in your image
    const result = [];
    for (let y = currentYear; y >= startYear; y--) {
      result.push(y);
    }
    return result;
  }, [currentYear]);

  const [selectedYear, setSelectedYear] = useState<number | "lastYear">(currentYear);
  const { currentYearData, isLoading, error } = useGithubContributions(selectedYear);

  const username = GITHUB_CONTENT.username;

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

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          {/* Main Content Area */}
          <div className="flex-1 w-full space-y-6">
            <motion.div
              layout
              className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e9e9e7] shadow-sm min-h-[300px] flex flex-col justify-center relative overflow-hidden"
            >
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#37352f]">
                  {currentYearData?.total || 0} contributions in {selectedYear === "lastYear" ? "the last year" : selectedYear}
                </h3>
                {isLoading && <Loader2 size={20} className="animate-spin text-[#787774]" />}
              </div>

              <div className="w-full overflow-x-auto custom-scrollbar pb-4">
                <AnimatePresence mode="wait">
                  {error ? (
                    <motion.div 
                      key="error"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-red-500 text-center py-10"
                    >
                      {error}
                    </motion.div>
                  ) : currentYearData ? (
                    <motion.div
                      key={selectedYear}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-center"
                    >
                      <ActivityCalendar
                        data={currentYearData.contributions}
                        blockSize={14}
                        blockMargin={4}
                        fontSize={12}
                        theme={customTheme}
                        hideTotalCount
                        labels={{
                          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                          weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        }}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Activity Overview Placeholder to match your image */}
              <div className="mt-8 pt-8 border-t border-[#f1f1f0] grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium text-[#37352f]">Activity overview</h4>
                  <div className="space-y-3">
                    <div className="flex gap-3 text-sm text-[#787774]">
                      <div className="mt-1"><ChevronRight size={14} /></div>
                      <p>Full commit history available on GitHub profile</p>
                    </div>
                    <div className="flex gap-3 text-sm text-[#787774]">
                      <div className="mt-1"><ChevronRight size={14} /></div>
                      <p>Contributions include commits, pull requests, and issues</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Year Navigation Sidebar */}
          <div className="w-full md:w-32 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all text-center md:text-left ${
                  selectedYear === year 
                    ? "bg-[#0070f3] text-white shadow-md shadow-blue-100" 
                    : "bg-transparent text-[#787774] hover:bg-[#efefee]"
                }`}
              >
                {year}
              </button>
            ))}
            <button
              onClick={() => setSelectedYear("lastYear")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all text-center md:text-left ${
                selectedYear === "lastYear" 
                  ? "bg-[#0070f3] text-white shadow-md shadow-blue-100" 
                  : "bg-transparent text-[#787774] hover:bg-[#efefee]"
              }`}
            >
              Last Year
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
