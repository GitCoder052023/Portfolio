"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { CONTACT_METHODS } from "../../data/contact";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
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

          {/* Contact Methods Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {CONTACT_METHODS.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group bg-white p-6 rounded-xl border border-[#e9e9e7] hover:border-[#d4d4d1] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#f7f6f3] border border-[#e9e9e7] flex items-center justify-center flex-shrink-0 group-hover:border-[#d4d4d1] transition-colors">
                      <Icon className="w-6 h-6 text-[#37352f]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#787774] mb-1">{method.label}</div>
                      <div className="text-[#37352f] font-medium truncate group-hover:text-[#2e2d29] transition-colors">
                        {method.value}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#787774] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-[#f7f6f3] p-8 md:p-12 rounded-2xl border border-[#e9e9e7] text-center"
          >
            <h3 className="text-2xl font-bold text-[#37352f] mb-4">
              Ready to Start a Project?
            </h3>
            <p className="text-lg text-[#787774] mb-6 max-w-2xl mx-auto">
              Whether you're looking for a full-stack developer, need help with a project, or want to discuss potential collaborations, I'm always open to new opportunities.
            </p>
            <motion.a
              href="mailto:your.email@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#37352f] text-white rounded-lg hover:bg-[#2e2d29] transition-colors duration-200 font-medium text-lg"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

