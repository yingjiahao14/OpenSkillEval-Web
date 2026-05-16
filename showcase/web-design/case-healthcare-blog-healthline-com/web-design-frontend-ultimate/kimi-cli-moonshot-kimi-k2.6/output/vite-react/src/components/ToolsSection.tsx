import { siteConfig } from "../config/site";
import {
  Utensils,
  Calculator,
  Pill,
  Search,
  Stethoscope,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const toolIcons: Record<string, React.ReactNode> = {
  "Recipe Hub": <Utensils className="w-5 h-5" />,
  "Macronutrient Calculator": <Calculator className="w-5 h-5" />,
  "Calorie Calculator": <Calculator className="w-5 h-5" />,
  "Drug Directory: A to Z": <Search className="w-5 h-5" />,
  "Pill Identifier": <Pill className="w-5 h-5" />,
  "GLP-1 Resource": <Sparkles className="w-5 h-5" />,
  FindCare: <Stethoscope className="w-5 h-5" />,
};

export default function ToolsSection() {
  const { nutritionHub, drugCare } = siteConfig.tools;

  return (
    <section className="bg-white py-12 lg:py-16 border-y border-warm-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Nutrition Hub */}
          <div className="bg-gradient-to-br from-teal-50 to-warm-50 rounded-2xl p-6 lg:p-8 border border-teal-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Nutrition Hub
              </span>
            </div>

            <h3 className="text-xl lg:text-2xl font-bold text-charcoal mb-2 font-display">
              {nutritionHub.heading}
            </h3>
            <p className="text-charcoal-muted text-sm leading-relaxed mb-6">
              {nutritionHub.body}
            </p>

            <div className="space-y-3 mb-6">
              {nutritionHub.tools.map((tool) => (
                <div
                  key={tool.title}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white border border-warm-200 hover:border-teal-200 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                    {toolIcons[tool.title]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{tool.title}</p>
                    <p className="text-xs text-charcoal-muted">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition-colors"
            >
              {nutritionHub.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Drug & Care Tools */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-coral-500 flex items-center justify-center">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-coral-600">
                Drug & Care Tools
              </span>
            </div>

            <h3 className="text-xl lg:text-2xl font-bold text-charcoal mb-6 font-display">
              Find the right care
            </h3>

            <div className="space-y-4">
              {drugCare.map((tool) => (
                <div
                  key={tool.title}
                  className="p-5 rounded-xl bg-warm-50 border border-warm-200 hover:border-coral-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-coral-50 flex items-center justify-center text-coral-500 shrink-0">
                        {toolIcons[tool.title]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-charcoal mb-1">
                          {tool.title}
                        </p>
                        <p className="text-xs text-charcoal-muted leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-warm-300 text-xs font-semibold text-coral-500 hover:bg-coral-50 hover:border-coral-200 transition-colors"
                    >
                      {tool.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
