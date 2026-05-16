import { siteConfig } from "../config/site";
import { Play, ArrowRight, Clock } from "lucide-react";

export default function LatestVideos() {
  return (
    <section className="bg-white py-12 lg:py-16 border-t border-warm-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-charcoal font-display">
              {siteConfig.latestVideos.heading}
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
          >
            {siteConfig.latestVideos.link}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {siteConfig.latestVideos.videos.map((video) => (
            <a
              key={video.title}
              href="#"
              className="group block rounded-xl overflow-hidden border border-warm-200 hover:border-teal-300 hover:shadow-lg transition-all bg-white"
            >
              <div className="relative aspect-video bg-gradient-to-br from-charcoal to-charcoal-light flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-teal-600 ml-0.5" fill="currentColor" />
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-charcoal leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
                  {video.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600"
          >
            {siteConfig.latestVideos.link}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
