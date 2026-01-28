import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Hamdan Khubaib | Full-Stack Developer & Creator",
  description: "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
  openGraph: {
    title: "Hamdan Khubaib | Full-Stack Developer & Creator",
    description: "Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.",
    url: "https://hamdankhubaib.in",
  },
};

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