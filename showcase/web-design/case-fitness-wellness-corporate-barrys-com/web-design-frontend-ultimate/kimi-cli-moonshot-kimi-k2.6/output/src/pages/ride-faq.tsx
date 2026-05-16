import * as React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
          {siteConfig.rideFaq.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-[#a1a1a1] animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {siteConfig.rideFaq.hero.subtitle}
        </p>
      </div>
    </section>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section-padding bg-[#141414]">
      <div className="container-custom mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {siteConfig.rideFaq.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border-b border-[#2a2a2a] last:border-b-0"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="font-[Oswald] text-lg md:text-xl font-bold tracking-wide uppercase text-white group-hover:text-[#ff0000] transition-colors pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-[#ff0000] shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-[#a1a1a1] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RideFAQPage() {
  return (
    <div className="grain">
      <Navbar currentPage="ride-faq" />
      <main>
        <Hero />
        <FAQAccordion />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
