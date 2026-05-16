import { useRef } from "react";
import { siteConfig } from "../config/site";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HealthTopics() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-warm-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-charcoal font-display">
              Explore Health Topics
            </h2>
            <p className="text-charcoal-muted text-sm mt-1">
              Browse conditions and wellness areas
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-full bg-white border border-warm-300 text-charcoal-muted hover:text-teal-600 hover:border-teal-300 transition-colors shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-full bg-white border border-warm-300 text-charcoal-muted hover:text-teal-600 hover:border-teal-300 transition-colors shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <a
              href="#"
              className="hidden sm:inline-flex ml-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
            >
              View all
            </a>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {siteConfig.healthTopics.map((topic) => (
            <a
              key={topic.name}
              href="#"
              className="flex-shrink-0 group text-center"
            >
              <div
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-105 shadow-md"
                style={{ backgroundColor: topic.color }}
              >
                <span className="text-white font-bold text-xl sm:text-2xl font-display">
                  {topic.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-semibold text-charcoal group-hover:text-teal-600 transition-colors">
                {topic.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
