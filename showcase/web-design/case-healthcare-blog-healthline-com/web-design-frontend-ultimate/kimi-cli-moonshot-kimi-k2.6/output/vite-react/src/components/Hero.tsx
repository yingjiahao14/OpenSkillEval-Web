import { siteConfig } from "../config/site";
import { ArrowRight, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-warm-50 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #02838d 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" />
                {siteConfig.hero.category}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-coral-100 text-coral-600 text-xs font-bold uppercase tracking-wider">
                {siteConfig.hero.badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold leading-[1.15] text-charcoal mb-5 font-display">
              {siteConfig.hero.title}
            </h1>

            <p className="text-base lg:text-lg text-charcoal-muted leading-relaxed mb-8 max-w-lg">
              {siteConfig.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20"
              >
                Read Article
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-charcoal font-semibold text-sm border border-warm-300 hover:border-teal-300 hover:text-teal-600 transition-colors"
              >
                View Challenge
              </a>
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-warm-300 shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-teal-100 via-teal-50 to-warm-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/25">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <p className="text-charcoal font-display font-bold text-xl">Day 12</p>
                  <p className="text-charcoal-muted text-sm mt-1">Resistance Band Workout</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-700 text-xs font-bold">WS</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">WellSource Editorial</p>
                    <p className="text-xs text-charcoal-muted">Medically reviewed by Dr. Sarah Chen</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-charcoal-muted">
                  <span>10 min read</span>
                  <span>•</span>
                  <span>Updated today</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-coral-400/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
