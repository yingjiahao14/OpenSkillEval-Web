import { siteConfig } from "../config/site";
import { TrendingUp, ArrowRight } from "lucide-react";

export default function Trending() {
  return (
    <section className="bg-white border-y border-warm-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-coral-500" />
          <h2 className="text-lg font-bold text-charcoal font-display">Trending Now</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {siteConfig.trending.map((article, i) => (
            <a
              key={i}
              href="#"
              className="group block p-5 rounded-xl bg-warm-50 border border-warm-200 hover:border-teal-300 hover:shadow-md transition-all"
            >
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-700 text-[11px] font-bold uppercase tracking-wide mb-3">
                {article.category}
              </span>
              <h3 className="text-sm font-semibold text-charcoal leading-snug group-hover:text-teal-600 transition-colors mb-3">
                {article.title}
              </h3>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-coral-500 group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
