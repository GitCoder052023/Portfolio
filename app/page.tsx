import Hero from "./components/Hero";
import About from "./components/About";
import ExamBazar from "./components/ExamBazar";
import StreamNet from "./components/StreamNet";
import Goals from "./components/Goals";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <ExamBazar />
        <StreamNet />
        <Goals />
        <Footer />
      </main>
    </SmoothScroll>
  );
}