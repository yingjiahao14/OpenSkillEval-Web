import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: ReactNode[];
  itemsPerView?: number;
  gap?: number;
  showDots?: boolean;
  className?: string;
}

export function Carousel({
  children,
  itemsPerView = 3,
  gap = 16,
  showDots = false,
  className = "",
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = children.length;
  const maxIndex = Math.max(0, total - itemsPerView);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${current * (100 / itemsPerView + gap / 10)}%)`;
    }
  }, [current, itemsPerView, gap]);

  const goNext = () => setCurrent((p) => Math.min(p + 1, maxIndex));
  const goPrev = () => setCurrent((p) => Math.max(p - 1, 0));

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ gap }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{
                width: `calc((100% - ${(itemsPerView - 1) * gap}px) / ${itemsPerView})`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {total > itemsPerView && (
        <>
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-border flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            disabled={current >= maxIndex}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-border flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-brand w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
