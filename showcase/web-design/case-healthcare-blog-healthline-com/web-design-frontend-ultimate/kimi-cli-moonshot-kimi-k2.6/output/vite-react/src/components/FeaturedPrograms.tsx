import { siteConfig } from "../config/site";
import { ArrowRight, BookOpen } from "lucide-react";

export default function FeaturedPrograms() {
  return (
    <section className="bg-warm-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-charcoal font-display">
            {siteConfig.featuredPrograms.heading}
          </h2>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
          >
            {siteConfig.featuredPrograms.link}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {siteConfig.featuredPrograms.programs.map((program) => (
            <a
              key={program.title}
              href="#"
              className="group block bg-white rounded-xl border border-warm-200 p-6 hover:border-teal-300 hover:shadow-lg transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="inline-block px-2 py-0.5 rounded-md bg-warm-100 text-charcoal-muted text-[10px] font-bold uppercase tracking-wide mb-2">
                {program.tag}
              </span>
              <h3 className="text-sm font-semibold text-charcoal leading-snug group-hover:text-teal-600 transition-colors mb-3">
                {program.title}
              </h3>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-coral-500 group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600"
          >
            {siteConfig.featuredPrograms.link}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
