import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../config/site";

function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

function StatItem({
  value,
  label,
  delay,
}: {
  value: number;
  label: string;
  delay: number;
}) {
  const { count, ref } = useCountUp(value, 2200);

  return (
    <div ref={ref} className="text-center" style={{ animationDelay: `${delay}ms` }}>
      <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#141414] tracking-tight tabular-nums">
        {formatNumber(count)}
      </div>
      <div className="mt-2 text-sm md:text-base font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 md:py-28 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-14 md:mb-20">
          A growing library of
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-8">
          {siteConfig.stats.map((stat, i) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
