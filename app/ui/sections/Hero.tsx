"use client";

import HeroBackground from "@/app/ui/components/Hero/HeroBackground";
import HeroProfile from "@/app/ui/components/Hero/HeroProfile";
import HeroContent from "@/app/ui/components/Hero/HeroContent";
import HeroActions from "@/app/ui/components/Hero/HeroActions";
import HeroScrollIndicator from "@/app/ui/components/Hero/HeroScrollIndicator";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative overflow-hidden">
      <HeroBackground />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <HeroProfile />
        <HeroContent />
        <HeroActions />
        <HeroScrollIndicator />
      </div>
    </section>
  );
}
