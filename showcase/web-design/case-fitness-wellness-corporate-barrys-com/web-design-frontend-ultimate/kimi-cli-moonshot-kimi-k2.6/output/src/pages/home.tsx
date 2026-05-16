import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { siteConfig } from "../config/site";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0000] via-[#141414] to-[#141414]" />
      
      {/* Red glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ff0000]/10 rounded-full blur-[120px]" />

      <div className="relative z-10 container-custom mx-auto px-4 md:px-6 text-center">
        <h1 className="font-[Oswald] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase text-white leading-[0.95] mb-8 animate-slide-up">
          {siteConfig.home.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-[#a1a1a1] max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {siteConfig.home.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <a href={siteConfig.home.hero.ctaPrimary.href} className="btn-primary">
            {siteConfig.home.hero.ctaPrimary.text}
          </a>
          <a href={siteConfig.home.hero.ctaSecondary.href} className="btn-outline">
            {siteConfig.home.hero.ctaSecondary.text}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function TopBar() {
  return (
    <div className="bg-[#ff0000] py-3">
      <div className="container-custom mx-auto px-4 md:px-6 flex items-center justify-center gap-4">
        <span className="text-white text-sm md:text-base font-medium">
          {siteConfig.home.topBar.text}
        </span>
        <a
          href={siteConfig.home.topBar.cta.href}
          className="text-white text-sm font-bold underline underline-offset-4 hover:no-underline"
        >
          {siteConfig.home.topBar.cta.text}
        </a>
      </div>
    </div>
  );
}

function CommunityPromo() {
  return (
    <section className="section-padding bg-[#141414]">
      <div className="container-custom mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[Oswald] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white leading-[0.95] mb-6">
              {siteConfig.home.community.heading}
            </h2>
            <p className="text-[#a1a1a1] text-lg leading-relaxed mb-8">
              {siteConfig.home.community.body}
            </p>
            <a href={siteConfig.home.community.cta.href} className="btn-primary inline-flex">
              {siteConfig.home.community.cta.text}
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-[#ff0000]/20 to-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-[#ff0000]/10 rounded-full flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <p className="text-[#a1a1a1] text-sm uppercase tracking-wider">Community</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#ff0000]/5 border border-[#ff0000]/20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TwoWays() {
  return (
    <section className="section-padding bg-[#0a0a0a]">
      <div className="container-custom mx-auto px-4 md:px-6">
        <h2 className="font-[Oswald] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white text-center mb-16">
          {siteConfig.home.twoWays.heading}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {siteConfig.home.twoWays.options.map((option) => (
            <div
              key={option.title}
              className="group relative p-8 md:p-12 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#ff0000]/50 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff0000] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="font-[Oswald] text-2xl md:text-3xl font-bold tracking-wide uppercase text-white mb-4">
                {option.title}
              </h3>
              <p className="text-[#a1a1a1] leading-relaxed">
                {option.description}
              </p>
              <div className="mt-8">
                <a href="#" className="inline-flex items-center gap-2 text-[#ff0000] font-[Oswald] uppercase tracking-wider text-sm hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioExperience() {
  return (
    <section className="section-padding bg-[#141414] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#ff0000]/5 rounded-full blur-[100px] -translate-y-1/2" />
      
      <div className="container-custom mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <h2 className="font-[Oswald] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white leading-[0.95] mb-6">
            {siteConfig.home.studio.heading}
          </h2>
          <p className="text-[#a1a1a1] text-lg leading-relaxed mb-10">
            {siteConfig.home.studio.body}
          </p>
          <a href="#" className="btn-primary inline-flex">
            {siteConfig.home.studio.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function FreeTrialCTA() {
  return (
    <section className="section-padding bg-[#ff0000] relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-custom mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 className="font-[Oswald] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white leading-[0.95] mb-8">
          {siteConfig.home.freeTrial.heading}
        </h2>
        <a
          href={siteConfig.home.freeTrial.cta.href}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#ff0000] font-[Oswald] text-lg font-bold uppercase tracking-wider hover:bg-[#f0f0f0] transition-colors"
        >
          {siteConfig.home.freeTrial.cta.text}
          <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
}

function LifestyleCarousel() {
  const [current, setCurrent] = useState(0);
  const slides = siteConfig.home.carousel.slides;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-padding bg-[#0a0a0a]">
      <div className="container-custom mx-auto px-4 md:px-6">
        <h2 className="font-[Oswald] text-3xl md:text-4xl font-bold tracking-wide uppercase text-white text-center mb-12">
          The RedRoom Life
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Carousel container */}
          <div className="relative aspect-[16/9] bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  idx === current ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                }`}
              >
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-[#ff0000]/10 rounded-full flex items-center justify-center">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <p className="text-[#a1a1a1] uppercase tracking-wider text-sm">{slide.alt}</p>
                </div>
              </div>
            ))}

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#141414]/80 border border-[#2a2a2a] flex items-center justify-center text-white hover:bg-[#ff0000] hover:border-[#ff0000] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#141414]/80 border border-[#2a2a2a] flex items-center justify-center text-white hover:bg-[#ff0000] hover:border-[#ff0000] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === current ? "bg-[#ff0000] w-6" : "bg-[#2a2a2a] hover:bg-[#a1a1a1]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="grain">
      <TopBar />
      <Navbar currentPage="home" />
      <main>
        <Hero />
        <CommunityPromo />
        <TwoWays />
        <StudioExperience />
        <FreeTrialCTA />
        <LifestyleCarousel />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
