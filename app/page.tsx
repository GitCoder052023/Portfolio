import type { Metadata } from "next";
import Hero from "@/app/ui/sections/Hero";
import About from "@/app/ui/sections/About";
import PidifyJs from "@/app/ui/sections/PidifyJs";
import TailStack from "@/app/ui/sections/TailStack";
import Goals from "@/app/ui/sections/Goals";
import Contact from "@/app/ui/sections/Contact";
import Footer from "@/app/ui/sections/Footer";
import SmoothScroll from "@/app/ui/utils/SmoothScroll";
import Navbar from "@/app/ui/ui/Navbar";
import { HOME_METADATA } from "@/app/config/seo";

export const metadata: Metadata = HOME_METADATA;

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <PidifyJs align="left" />
        <TailStack align="right" />
        <Goals />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}