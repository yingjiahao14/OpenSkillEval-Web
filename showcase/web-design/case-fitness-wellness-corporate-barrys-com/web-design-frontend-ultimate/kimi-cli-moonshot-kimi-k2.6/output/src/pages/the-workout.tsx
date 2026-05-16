import * as React from "react";
import { useState } from "react";
import { ArrowRight, Dumbbell, Wind } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { siteConfig } from "../config/site";

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0000] via-[#141414] to-[#141414]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ff0000]/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 container-custom mx-auto px-4 md:px-6 text-center">
        <h1 className="font-[Oswald] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase text-white leading-[0.95] mb-6 animate-slide-up">
          {siteConfig.workout.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-[#a1a1a1] animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {siteConfig.workout.hero.subtitle}
        </p>
      </div>
    </section>
  );
}

function MethodOverview() {
  return (
    <section className="section-padding bg-[#141414]">
      <div className="container-custom mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[Oswald] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white leading-[0.95] mb-8">
            {siteConfig.workout.method.heading}
          </h2>
          <p className="text-[#a1a1a1] text-lg md:text-xl leading-relaxed">
            {siteConfig.workout.method.body}
          </p>
        </div>
      </div>
    </section>
  );
}

function WeeklySchedule() {
  return (
    <section className="section-padding bg-[#0a0a0a]">
      <div className="container-custom mx-auto px-4 md:px-6">
        <h2 className="font-[Oswald] text-3xl md:text-4xl font-bold tracking-wide uppercase text-white text-center mb-12">
          Weekly Class Schedule
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[#ff0000]">
                  <th className="text-left py-4 px-4 md:px-6 font-[Oswald] text-sm tracking-wider uppercase text-[#a1a1a1]">
                    Day
                  </th>
                  <th className="text-left py-4 px-4 md:px-6 font-[Oswald] text-sm tracking-wider uppercase text-[#a1a1a1]">
                    Muscle Group Focus
                  </th>
                </tr>
              </thead>
              <tbody>
                {siteConfig.workout.schedule.map((item, idx) => (
                  <tr
                    key={item.day}
                    className={`border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors ${
                      idx % 2 === 0 ? "bg-[#141414]" : "bg-[#0f0f0f]"
                    }`}
                  >
                    <td className="py-4 px-4 md:px-6 font-[Oswald] text-lg md:text-xl uppercase tracking-wide text-white">
                      {item.day}
                    </td>
                    <td className="py-4 px-4 md:px-6 text-[#a1a1a1]">
                      {item.focus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloorTreadmillToggle() {
  const [active, setActive] = useState<"floor" | "treadmill">("floor");

  return (
    <section className="section-padding bg-[#141414]">
      <div className="container-custom mx-auto px-4 md:px-6">
        <h2 className="font-[Oswald] text-3xl md:text-4xl font-bold tracking-wide uppercase text-white text-center mb-12">
          {siteConfig.workout.toggle.heading}
        </h2>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#1a1a1a] border border-[#2a2a2a]">
            <button
              onClick={() => setActive("floor")}
              className={`px-8 py-4 font-[Oswald] text-sm tracking-wider uppercase transition-all ${
                active === "floor"
                  ? "bg-[#ff0000] text-white"
                  : "text-[#a1a1a1] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <Dumbbell size={16} />
                Floor
              </span>
            </button>
            <button
              onClick={() => setActive("treadmill")}
              className={`px-8 py-4 font-[Oswald] text-sm tracking-wider uppercase transition-all ${
                active === "treadmill"
                  ? "bg-[#ff0000] text-white"
                  : "text-[#a1a1a1] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <Wind size={16} />
                Treadmill
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div
            className={`p-8 md:p-12 bg-[#1a1a1a] border border-[#2a2a2a] transition-all duration-300 ${
              active === "floor" ? "opacity-100 translate-y-0" : "hidden"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#ff0000]/10 flex items-center justify-center">
                <Dumbbell size={24} className="text-[#ff0000]" />
              </div>
              <h3 className="font-[Oswald] text-2xl md:text-3xl font-bold tracking-wide uppercase text-white">
                {siteConfig.workout.toggle.floor.title}
              </h3>
            </div>
            <p className="text-[#a1a1a1] text-lg leading-relaxed">
              {siteConfig.workout.toggle.floor.description}
            </p>
          </div>

          <div
            className={`p-8 md:p-12 bg-[#1a1a1a] border border-[#2a2a2a] transition-all duration-300 ${
              active === "treadmill" ? "opacity-100 translate-y-0" : "hidden"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#ff0000]/10 flex items-center justify-center">
                <Wind size={24} className="text-[#ff0000]" />
              </div>
              <h3 className="font-[Oswald] text-2xl md:text-3xl font-bold tracking-wide uppercase text-white">
                {siteConfig.workout.toggle.treadmill.title}
              </h3>
            </div>
            <p className="text-[#a1a1a1] text-lg leading-relaxed">
              {siteConfig.workout.toggle.treadmill.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudioExperience() {
  return (
    <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#ff0000]/5 rounded-full blur-[100px] -translate-y-1/2" />
      
      <div className="container-custom mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <h2 className="font-[Oswald] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white leading-[0.95] mb-6">
            {siteConfig.workout.studio.heading}
          </h2>
          <p className="text-[#a1a1a1] text-lg leading-relaxed">
            {siteConfig.workout.studio.body}
          </p>
        </div>
      </div>
    </section>
  );
}

function CTABook() {
  return (
    <section className="section-padding bg-[#ff0000] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>
      </div>

      <div className="container-custom mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 className="font-[Oswald] text-4xl md:text-5xl font-bold tracking-tight uppercase text-white mb-4">
          {siteConfig.workout.cta.heading}
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          {siteConfig.workout.cta.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={siteConfig.workout.cta.primary.href} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#ff0000] font-[Oswald] text-lg font-bold uppercase tracking-wider hover:bg-[#f0f0f0] transition-colors">
            {siteConfig.workout.cta.primary.text}
            <ArrowRight size={20} />
          </a>
          <a href={siteConfig.workout.cta.secondary.href} className="btn-outline border-white text-white hover:bg-white hover:text-[#ff0000]">
            {siteConfig.workout.cta.secondary.text}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function TheWorkoutPage() {
  return (
    <div className="grain">
      <Navbar currentPage="the-workout" />
      <main>
        <Hero />
        <MethodOverview />
        <WeeklySchedule />
        <FloorTreadmillToggle />
        <StudioExperience />
        <CTABook />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
