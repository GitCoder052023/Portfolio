import type { Metadata } from "next";
import Hero from "@/app/ui/sections/Hero";
import About from "@/app/ui/sections/About";
import TechMarquee from "@/app/ui/components/About/TechMarquee";
import Projects from "@/app/ui/sections/Projects";
import GithubStats from "@/app/ui/sections/GithubStats";
import Contact from "@/app/ui/sections/Contact";
import Footer from "@/app/ui/sections/Footer";
import SmoothScroll from "@/app/ui/utils/SmoothScroll";
import Navbar from "@/app/ui/ui/Navbar";
import { HOME_METADATA } from "@/app/config/seo";

export const metadata: Metadata = HOME_METADATA;

export default function Home() {
  return (
    <SmoothScroll>
      <header className="mb-14">
        <Navbar />
      </header>
      <main className="min-h-screen">
        <Hero />
        <About />
        <TechMarquee />
        <Projects />
        <GithubStats />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}