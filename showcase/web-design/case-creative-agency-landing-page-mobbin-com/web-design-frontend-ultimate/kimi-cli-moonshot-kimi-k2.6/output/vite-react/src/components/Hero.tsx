import { siteConfig } from "../config/site";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#141414] leading-[1.1] text-balance">
            {siteConfig.hero.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto text-balance">
            {siteConfig.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={siteConfig.hero.cta.href}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#4f46e5] rounded-full hover:bg-[#4338ca] transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
            >
              {siteConfig.hero.cta.text}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.hero.secondaryCta.href}
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-[#141414] bg-gray-100 rounded-full hover:bg-gray-200 transition-colors active:scale-[0.98]"
            >
              {siteConfig.hero.secondaryCta.text}
            </a>
          </div>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
}
