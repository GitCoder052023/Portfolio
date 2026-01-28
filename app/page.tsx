import type { Metadata } from "next";
import Hero from "./components/Hero";
import About from "./components/About";
import PidifyJs from "./components/PidifyJs";
import TailStack from "./components/TailStack";
import StreamNet from "./components/StreamNet";
import Goals from "./components/Goals";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
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
        <StreamNet align="left" />
        <Goals />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}