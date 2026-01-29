"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target } from "lucide-react";
import { YEARLY_GOALS } from "../../data/goals";

export default function Goals() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="goals" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <Target className="w-12 h-12 text-[#787774] mx-auto" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#37352f]">
              Goals for This Year
            </h2>
            <p className="text-lg text-[#787774] max-w-2xl mx-auto">
              My learning journey and development objectives for 2024
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {YEARLY_GOALS.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <motion.div
                  key={goal.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-8 bg-white rounded-2xl border border-[#e9e9e7] hover:border-[#d4d4d1] transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${goal.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10`} />
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-[#37352f]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#37352f] mb-2">
                      {goal.title}
                    </h3>
                    <p className="text-[#787774] leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

