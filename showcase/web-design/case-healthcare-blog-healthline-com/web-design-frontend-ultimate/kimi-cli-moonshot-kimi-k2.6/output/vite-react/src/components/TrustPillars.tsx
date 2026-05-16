import { siteConfig } from "../config/site";
import { PenTool, ArrowRightCircle, BadgeCheck, RefreshCw } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  PenTool: <PenTool className="w-6 h-6" />,
  ArrowRightCircle: <ArrowRightCircle className="w-6 h-6" />,
  BadgeCheck: <BadgeCheck className="w-6 h-6" />,
  RefreshCw: <RefreshCw className="w-6 h-6" />,
};

export default function TrustPillars() {
  return (
    <section className="bg-white py-14 lg:py-20 border-y border-warm-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal font-display mb-3">
            {siteConfig.trustPillars.heading}
          </h2>
          <div className="w-16 h-1 bg-teal-500 rounded-full mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.trustPillars.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group p-6 rounded-2xl bg-warm-50 border border-warm-200 hover:border-teal-300 hover:shadow-lg transition-all text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                {iconMap[pillar.icon]}
              </div>
              <h3 className="text-base font-bold text-charcoal mb-2 font-display">
                {pillar.title}
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
