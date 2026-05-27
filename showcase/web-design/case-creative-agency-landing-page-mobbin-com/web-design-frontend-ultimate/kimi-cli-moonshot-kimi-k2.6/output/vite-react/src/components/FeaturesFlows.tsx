import { useState } from "react";
import { siteConfig } from "../config/site";
import { Play, MousePointer } from "lucide-react";

export default function FeaturesFlows() {
  const [mode, setMode] = useState<"videos" | "prototype">("videos");

  const activeMode = siteConfig.flows.modes.find((m) => m.key === mode)!;

  return (
    <section className="py-20 md:py-28 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141414]">
            {siteConfig.flows.title}
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex p-1 bg-white rounded-full border border-gray-200 shadow-sm">
            <button
              onClick={() => setMode("videos")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                mode === "videos"
                  ? "bg-[#141414] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Play className="w-4 h-4" />
              Videos
            </button>
            <button
              onClick={() => setMode("prototype")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                mode === "prototype"
                  ? "bg-[#141414] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <MousePointer className="w-4 h-4" />
              Prototype mode
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div
            key={mode}
            className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            style={{ animation: "fade-in-up 0.4s ease-out both" }}
          >
            {/* Visual preview */}
            <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
              {mode === "videos" ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-[#4f46e5] rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/25 hover:scale-105 transition-transform cursor-pointer">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Click to play flow video</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-[#141414] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                    <MousePointer className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Interactive hotspot preview</p>
                </div>
              )}

              {/* Decorative phone frames */}
              <div className="absolute left-4 md:left-12 bottom-0 w-24 md:w-40 aspect-[9/16] bg-gray-200 rounded-t-xl md:rounded-t-2xl opacity-40" />
              <div className="absolute right-4 md:right-12 bottom-0 w-24 md:w-40 aspect-[9/16] bg-gray-200 rounded-t-xl md:rounded-t-2xl opacity-40" />
            </div>

            {/* Description */}
            <div className="p-6 md:p-8 text-center">
              <h3 className="font-display text-xl md:text-2xl font-semibold text-[#141414] mb-2">
                {activeMode.title}
              </h3>
              <p className="text-gray-500 text-base max-w-lg mx-auto">
                {activeMode.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
