import { siteConfig } from "../config/site";
import { Quote } from "lucide-react";

function TestimonialCard({
  name,
  company,
  quote,
}: {
  name: string;
  company: string;
  quote: string;
}) {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[400px] bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <Quote className="w-8 h-8 text-[#4f46e5]/20 mb-4" />
      <p className="text-[#141414] text-sm md:text-base leading-relaxed mb-6">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-bold text-gray-500">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#141414]">{name}</p>
          {company && <p className="text-xs text-gray-400">{company}</p>}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof siteConfig.testimonials.items;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-5 ${reverse ? "animate-marquee-slow-reverse" : "animate-marquee-slow"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = siteConfig.testimonials.items.slice(0, 3);
  const row2 = siteConfig.testimonials.items.slice(3, 6);

  return (
    <section className="py-20 md:py-28 bg-[#f5f5f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141414] text-center">
          {siteConfig.testimonials.title}
        </h2>
      </div>

      <div className="space-y-5">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
