import type { Metadata } from "next";
import Hero from "./ui/sections/Hero";
import About from "./ui/sections/About";
import PidifyJs from "./ui/sections/PidifyJs";
import TailStack from "./ui/sections/TailStack";
import Goals from "./ui/sections/Goals";
import Contact from "./ui/sections/Contact";
import Footer from "./ui/sections/Footer";
import SmoothScroll from "./ui/utils/SmoothScroll";
import Navbar from "./ui/ui/Navbar";
import { HOME_METADATA } from "./config/seo";

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