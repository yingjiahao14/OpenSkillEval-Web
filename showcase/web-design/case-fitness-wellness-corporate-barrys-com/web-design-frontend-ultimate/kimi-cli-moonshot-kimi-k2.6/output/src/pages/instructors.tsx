import * as React from "react";
import { useState, useMemo } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { siteConfig } from "../config/site";

function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0000] via-[#141414] to-[#141414]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ff0000]/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 container-custom mx-auto px-4 md:px-6 text-center">
        <h1 className="font-[Oswald] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase text-white leading-[0.95] mb-6 animate-slide-up">
          {siteConfig.instructors.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-[#a1a1a1] animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {siteConfig.instructors.hero.subtitle}
        </p>
      </div>
    </section>
  );
}

function InstructorGrid() {
  const [filter, setFilter] = useState("All Locations");

  const filtered = useMemo(() => {
    if (filter === "All Locations") return siteConfig.instructors.list;
    return siteConfig.instructors.list.filter((i) => i.location === filter);
  }, [filter]);

  return (
    <section className="section-padding bg-[#141414]">
      <div className="container-custom mx-auto px-4 md:px-6">
        {/* Filter controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {siteConfig.instructors.filters.map((loc) => (
            <button
              key={loc}
              onClick={() => setFilter(loc)}
              className={`px-5 py-2 font-[Oswald] text-sm tracking-wider uppercase transition-all border ${
                filter === loc
                  ? "bg-[#ff0000] border-[#ff0000] text-white"
                  : "bg-transparent border-[#2a2a2a] text-[#a1a1a1] hover:border-[#ff0000] hover:text-white"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((instructor) => (
            <div
              key={instructor.name}
              className="group bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#ff0000]/50 transition-all duration-300"
            >
              {/* Avatar placeholder */}
              <div className="aspect-square bg-gradient-to-br from-[#ff0000]/10 to-[#1a1a1a] flex items-center justify-center border-b border-[#2a2a2a]">
                <div className="w-20 h-20 bg-[#ff0000]/10 rounded-full flex items-center justify-center">
                  <span className="font-[Oswald] text-2xl font-bold text-[#ff0000]">
                    {instructor.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-[Oswald] text-xl font-bold tracking-wide uppercase text-white mb-2">
                  {instructor.name}
                </h3>
                <div className="flex items-center gap-2 text-[#a1a1a1] text-sm mb-4">
                  <MapPin size={14} className="text-[#ff0000]" />
                  {instructor.location}
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[#ff0000] font-[Oswald] uppercase tracking-wider text-sm hover:gap-3 transition-all"
                >
                  Book a Class <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#a1a1a1]">No instructors found for this location.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function CTAGetStarted() {
  return (
    <section className="section-padding bg-[#0a0a0a]">
      <div className="container-custom mx-auto px-4 md:px-6 text-center">
        <h2 className="font-[Oswald] text-4xl md:text-5xl font-bold tracking-tight uppercase text-white mb-8">
          {siteConfig.instructors.cta.heading}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={siteConfig.instructors.cta.primary.href} className="btn-primary inline-flex">
            {siteConfig.instructors.cta.primary.text}
            <ArrowRight size={18} />
          </a>
          <a href={siteConfig.instructors.cta.secondary.href} className="btn-outline">
            {siteConfig.instructors.cta.secondary.text}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function InstructorsPage() {
  return (
    <div className="grain">
      <Navbar currentPage="instructors" />
      <main>
        <Hero />
        <InstructorGrid />
        <CTAGetStarted />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
