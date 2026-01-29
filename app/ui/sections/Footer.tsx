"use client";

import { motion } from "framer-motion";
import FooterSocials from "@/app/ui/components/Footer/FooterSocials";
import FooterNav from "@/app/ui/components/Footer/FooterNav";
import FooterCopyright from "@/app/ui/components/Footer/FooterCopyright";

export default function Footer() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f7f6f3] border-t border-[#e9e9e7]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <FooterSocials />
          <FooterNav />
          <FooterCopyright />
        </motion.div>
      </div>
    </footer>
  );
}
