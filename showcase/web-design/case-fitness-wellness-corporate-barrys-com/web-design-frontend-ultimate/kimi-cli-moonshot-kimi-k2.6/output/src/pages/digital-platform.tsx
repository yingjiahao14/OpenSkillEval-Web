import * as React from "react";
import { ArrowRight, Play, Clock, Infinity, Calendar, Monitor } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { siteConfig } from "../config/site";

const featureIcons = [Play, Clock, Infinity, Calendar, Monitor];

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0000] via-[#141414] to-[#141414]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ff0000]/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 container-custom mx-auto px-4 md:px-6 text-center">
        <h1 className="font-[Oswald] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase text-white leading-[0.95] mb-6 animate-slide-up">
          {siteConfig.digital.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-[#a1a1a1] max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {siteConfig.digital.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <a href="#" className="btn-primary inline-flex">
            Start Your Free Trial
            <ArrowRight size={18} />
          </a>
          <a href="#" className="btn-outline">
            Explore Workouts
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturesOverview() {
  return (
    <section className="section-padding bg-[#141414]">
      <div className="container-custom mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.digital.features.map((feature, idx) => {
            const Icon = featureIcons[idx] || Play;
            return (
              <div
                key={feature.title}
                className="group p-8 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#ff0000]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#ff0000]/10 flex items-center justify-center mb-6">
                  <Icon size={24} className="text-[#ff0000]" />
                </div>
                <h3 className="font-[Oswald] text-xl font-bold tracking-wide uppercase text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#a1a1a1] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WorkoutTypes() {
  const types = [
    { name: "Treadmill", desc: "Cardio-focused intervals" },
    { name: "Floor", desc: "Strength & resistance" },
    { name: "Full Body", desc: "Complete workout" },
    { name: "Abs & Core", desc: "Core strengthening" },
    { name: "Stretch", desc: "Recovery & mobility" },
  ];

  return (
    <section className="section-padding bg-[#0a0a0a]">
      <div className="container-custom mx-auto px-4 md:px-6">
        <h2 className="font-[Oswald] text-3xl md:text-4xl font-bold tracking-wide uppercase text-white text-center mb-12">
          Workout Types
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {types.map((type) => (
            <div
              key={type.name}
              className="px-8 py-6 bg-[#1a1a1a] border border-[#2a2a2a] text-center hover:border-[#ff0000]/50 transition-all min-w-[160px]"
            >
              <h3 className="font-[Oswald] text-lg font-bold tracking-wide uppercase text-white mb-1">
                {type.name}
              </h3>
              <p className="text-[#a1a1a1] text-sm">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UnlimitedAccess() {
  return (
    <section className="section-padding bg-[#141414] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#ff0000]/5 rounded-full blur-[100px] -translate-y-1/2" />
      
      <div className="container-custom mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-[#ff0000]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Infinity size={32} className="text-[#ff0000]" />
          </div>
          <h2 className="font-[Oswald] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white leading-[0.95] mb-6">
            Unlimited Access
          </h2>
          <p className="text-[#a1a1a1] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            One membership, unlimited streaming. No caps on how many classes you take per week. 
            Stream on your phone, tablet, laptop, or TV — your Red Room, wherever you are.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {["Phone", "Tablet", "Laptop", "TV"].map((device) => (
              <div key={device} className="p-4 bg-[#1a1a1a] border border-[#2a2a2a]">
                <p className="font-[Oswald] text-sm uppercase tracking-wider text-white">{device}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAJoin() {
  return (
    <section className="section-padding bg-[#ff0000] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid3)" />
        </svg>
      </div>

      <div className="container-custom mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 className="font-[Oswald] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white leading-[0.95] mb-8">
          {siteConfig.digital.cta.heading}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={siteConfig.digital.cta.primary.href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#ff0000] font-[Oswald] text-lg font-bold uppercase tracking-wider hover:bg-[#f0f0f0] transition-colors"
          >
            {siteConfig.digital.cta.primary.text}
            <ArrowRight size={20} />
          </a>
          <a
            href={siteConfig.digital.cta.secondary.href}
            className="btn-outline border-white text-white hover:bg-white hover:text-[#ff0000]"
          >
            {siteConfig.digital.cta.secondary.text}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function DigitalPlatformPage() {
  return (
    <div className="grain">
      <Navbar currentPage="digital-platform" />
      <main>
        <Hero />
        <FeaturesOverview />
        <WorkoutTypes />
        <UnlimitedAccess />
        <CTAJoin />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
