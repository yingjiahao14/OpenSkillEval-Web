import { useState } from "react";
import { siteConfig } from "../config/site";
import { ArrowRight, Clock, Tag } from "lucide-react";

export default function RecommendedReads() {
  const [activeTab, setActiveTab] = useState(siteConfig.recommendedReads.tabs[0]);

  const filtered = siteConfig.recommendedReads.articles.filter(
    (a) => a.category === activeTab
  );

  // Fallback: if no articles for tab, show all (demo data)
  const displayArticles = filtered.length > 0 ? filtered : siteConfig.recommendedReads.articles.slice(0, 4);

  return (
    <section className="bg-warm-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-charcoal font-display">
            Recommended Reads
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {siteConfig.recommendedReads.tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-teal-500 text-white shadow-md shadow-teal-500/20"
                  : "bg-white text-charcoal-muted border border-warm-300 hover:border-teal-300 hover:text-teal-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayArticles.map((article, i) => (
            <a
              key={`${article.title}-${i}`}
              href="#"
              className="group block bg-white rounded-xl border border-warm-200 overflow-hidden hover:border-teal-300 hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-teal-50 to-warm-100 flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                  <span className="text-teal-600 font-bold text-lg font-display">
                    {article.title.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
                    <Tag className="w-3 h-3" />
                    {article.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-charcoal-muted">
                    <Clock className="w-3 h-3" />
                    {5 + i} min
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-charcoal leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-coral-500 group-hover:gap-2 transition-all">
                  Read article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
