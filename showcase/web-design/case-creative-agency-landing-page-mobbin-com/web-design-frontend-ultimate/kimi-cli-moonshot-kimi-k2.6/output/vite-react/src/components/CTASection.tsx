import { siteConfig } from "../config/site";
import { ArrowRight } from "lucide-react";

const brandInitials: Record<string, string> = {
  Coinbase: "CB",
  Wise: "W",
  Headspace: "H",
  Airbnb: "A",
  Uber: "U",
  Nike: "N",
  Pinterest: "P",
  ChatGPT: "AI",
  Shopify: "S",
  Loom: "L",
  Mailchimp: "M",
  Twitch: "T",
  Spotify: "Sp",
  "Apple TV": "AT",
  Notion: "No",
  Dropbox: "D",
};

const brandColors: Record<string, string> = {
  Coinbase: "bg-blue-500",
  Wise: "bg-green-500",
  Headspace: "bg-orange-400",
  Airbnb: "bg-rose-500",
  Uber: "bg-gray-900",
  Nike: "bg-black",
  Pinterest: "bg-red-600",
  ChatGPT: "bg-emerald-500",
  Shopify: "bg-green-600",
  Loom: "bg-purple-500",
  Mailchimp: "bg-yellow-400",
  Twitch: "bg-violet-500",
  Spotify: "bg-green-500",
  "Apple TV": "bg-gray-800",
  Notion: "bg-gray-900",
  Dropbox: "bg-blue-400",
};

function BrandIcon({ brand }: { brand: string }) {
  return (
    <div
      className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${brandColors[brand] || "bg-gray-300"} flex items-center justify-center text-white text-xs md:text-sm font-bold shadow-sm`}
      title={brand}
    >
      {brandInitials[brand] || brand.slice(0, 2).toUpperCase()}
    </div>
  );
}

function MarqueeBrands({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...siteConfig.cta.brands, ...siteConfig.cta.brands];
  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex items-center gap-4 md:gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((brand, i) => (
          <BrandIcon key={`${brand}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141414] text-balance">
            {siteConfig.cta.title}
          </h2>
          <p className="mt-4 text-gray-500 text-base md:text-lg">
            {siteConfig.cta.subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={siteConfig.cta.cta.href}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#4f46e5] rounded-full hover:bg-[#4338ca] transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
            >
              {siteConfig.cta.cta.text}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.cta.secondaryCta.href}
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-[#141414] bg-gray-100 rounded-full hover:bg-gray-200 transition-colors active:scale-[0.98]"
            >
              {siteConfig.cta.secondaryCta.text}
            </a>
          </div>
        </div>

        {/* Brand marquees */}
        <div className="space-y-4 md:space-y-5">
          <MarqueeBrands />
          <MarqueeBrands reverse />
        </div>
      </div>
    </section>
  );
}
