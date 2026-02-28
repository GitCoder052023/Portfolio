"use client";

import ContactHeader from "@/app/ui/components/Contact/ContactHeader";
import ContactGrid from "@/app/ui/components/Contact/ContactGrid";
import Section from "@/app/ui/components/Shared/Section";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="contact" className="bg-white">
      <div ref={ref}>
        <ContactHeader isInView={isInView} />
        <ContactGrid isInView={isInView} />
      </div>
    </Section>
  );
}
