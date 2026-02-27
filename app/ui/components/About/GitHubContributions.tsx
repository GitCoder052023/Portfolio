"use client";

import { GitHubCalendar } from 'react-github-calendar';
import { motion } from "framer-motion";

export default function GitHubContributions() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full bg-white p-6 rounded-xl border border-[#e9e9e7] overflow-hidden"
    >
      <div className="flex justify-center">
        <GitHubCalendar
          username="GitCoder052023"
          blockSize={14}
          blockMargin={4}
          fontSize={14}
          showWeekdayLabels={true}
          showColorLegend={true}
          colorScheme="light"
          theme={{
            light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
            dark: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
          }}
        />
      </div>
    </motion.div>
  );
}