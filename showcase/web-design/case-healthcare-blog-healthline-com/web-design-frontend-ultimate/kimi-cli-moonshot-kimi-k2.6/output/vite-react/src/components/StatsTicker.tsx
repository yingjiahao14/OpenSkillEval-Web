import { siteConfig } from "../config/site";
import { ShieldCheck, Users, Calendar, Globe } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-teal-500" />,
  Users: <Users className="w-4 h-4 text-teal-500" />,
  Calendar: <Calendar className="w-4 h-4 text-teal-500" />,
  Globe: <Globe className="w-4 h-4 text-teal-500" />,
};

export default function StatsTicker() {
  const stats = siteConfig.credibilityStats;
  const doubled = [...stats, ...stats, ...stats, ...stats];

  return (
    <section className="bg-teal-600 text-white overflow-hidden py-2.5">
      <div className="relative">
        <div className="flex animate-ticker whitespace-nowrap">
          {doubled.map((stat, i) => (
            <div
              key={`${stat.label}-${i}`}
              className="flex items-center gap-2 px-8"
            >
              {iconMap[stat.icon]}
              <span className="text-sm font-semibold tracking-wide">{stat.label}</span>
              <span className="text-teal-300 mx-2">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
