import { useState, useEffect } from "react";
import { promoBanners } from "../data/cryptoData";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";

export default function PromoBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promoBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + promoBanners.length) % promoBanners.length);
  const next = () => setCurrent((c) => (c + 1) % promoBanners.length);

  return (
    <div className="bg-gradient-to-r from-[#3861FB] to-[#5B7FFF] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3 min-w-0">
            <Megaphone className="w-4 h-4 shrink-0 opacity-90" />
            <div className="relative overflow-hidden h-5 flex-1">
              {promoBanners.map((text, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex items-center transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${(i - current) * 100}%)`,
                  }}
                >
                  <span className="text-sm font-medium truncate">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-4">
            <button
              onClick={prev}
              className="p-1 rounded hover:bg-white/10 transition-colors"
              aria-label="Previous announcement"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={next}
              className="p-1 rounded hover:bg-white/10 transition-colors"
              aria-label="Next announcement"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
