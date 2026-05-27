import { siteConfig } from "../config/site";
import { Palette, FolderOpen, MessageSquare } from "lucide-react";

const toolIcons: Record<string, React.ReactNode> = {
  "Copy to Figma": <Palette className="w-6 h-6" />,
  "Save to collections": <FolderOpen className="w-6 h-6" />,
  "Leave comments": <MessageSquare className="w-6 h-6" />,
};

const toolGradients: Record<string, string> = {
  "Copy to Figma": "from-purple-50 to-indigo-50",
  "Save to collections": "from-emerald-50 to-teal-50",
  "Leave comments": "from-amber-50 to-orange-50",
};

export default function FeaturesTools() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141414]">
            {siteConfig.tools.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {siteConfig.tools.items.map((tool, i) => (
            <div
              key={tool.title}
              className="group relative bg-white rounded-2xl md:rounded-3xl border border-gray-100 p-6 md:p-8 hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-300"
              style={{ animation: `fade-in-up 0.5s ease-out ${i * 100}ms both` }}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${toolGradients[tool.title]} flex items-center justify-center text-[#141414] mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                {toolIcons[tool.title]}
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-[#141414] mb-2">
                {tool.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{tool.description}</p>

              {/* Visual preview placeholder */}
              <div className="mt-6 aspect-[4/3] rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                    {toolIcons[tool.title]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
