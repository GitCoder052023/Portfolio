"use client";

import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  maxWidth?: string;
  py?: string;
}

export default function Section({ 
  id, 
  className = "", 
  children, 
  maxWidth = "max-w-6xl",
  py = "py-32"
}: SectionProps) {
  return (
    <section id={id} className={`${py} px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className={`${maxWidth} mx-auto`}>
        {children}
      </div>
    </section>
  );
}
