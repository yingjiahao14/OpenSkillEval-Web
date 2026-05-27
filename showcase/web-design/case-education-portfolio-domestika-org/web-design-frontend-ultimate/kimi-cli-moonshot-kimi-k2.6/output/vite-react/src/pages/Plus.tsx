import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Plus,
  Award,
  Clock,
  Tag,
  Star,
} from "lucide-react";
import { siteConfig } from "../config/site";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";

const benefitIcons = [
  BookOpen,
  Plus,
  Award,
  Award,
  Clock,
  Tag,
];

const plusCatalogCourses = [
  ...siteConfig.bestSellers.slice(0, 3),
  ...siteConfig.newCourses.slice(0, 3),
  {
    title: "Character Design from Scratch",
    instructor: "Lena Vogt",
    students: "67,300",
    rating: "99%",
    reviews: "3.4K",
    price: "FREE",
    originalPrice: null,
    badge: "Plus",
  },
  {
    title: "Architectural Visualization",
    instructor: "Tom Richards",
    students: "12,100",
    rating: "98%",
    reviews: "560",
    price: "FREE",
    originalPrice: null,
    badge: "Plus",
  },
  {
    title: "Food Photography Essentials",
    instructor: "Nina Patel",
    students: "28,500",
    rating: "100%",
    reviews: "1.1K",
    price: "FREE",
    originalPrice: null,
    badge: "Plus",
  },
];

export default function PlusPage() {
  const [billing, setBilling] = useState<"yearly" | "monthly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [catalogIndex, setCatalogIndex] = useState(0);
  const [creditsIndex, setCreditsIndex] = useState(0);

  const pricing = siteConfig.pricing[billing];
  const catalogPerView = 3;
  const catalogMax = Math.max(0, plusCatalogCourses.length - catalogPerView);
  const creditsPerView = 3;
  const creditsMax = Math.max(
    0,
    siteConfig.plusBenefits.length - creditsPerView
  );

  const scrollCatalog = (dir: number) => {
    setCatalogIndex((p) => Math.max(0, Math.min(p + dir, catalogMax)));
  };
  const scrollCredits = (dir: number) => {
    setCreditsIndex((p) => Math.max(0, Math.min(p + dir, creditsMax)));
  };

  return (
    <div className="min-h-screen bg-surface grain">
      <Header activePage="plus" />

      <main>
        {/* Hero CTA */}
        <section className="relative bg-ink text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-brand rounded-full blur-[180px] -translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-6">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              Most popular plan
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Unlock your creativity with{" "}
              <span className="text-brand">Plus</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Get unlimited access to 1,000+ courses, earn certificates, and
              receive credits to keep courses forever.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors btn-press text-lg"
            >
              Start Your Free Trial
            </a>
          </div>
        </section>

        {/* Pricing Toggle */}
        <section id="pricing" className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
                Choose your plan
              </h2>
              <p className="text-muted">
                Flexible options to fit your creative journey
              </p>
            </div>

            {/* Toggle */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setBilling("yearly")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    billing === "yearly"
                      ? "bg-white text-ink shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setBilling("monthly")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    billing === "monthly"
                      ? "bg-white text-ink shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-surface rounded-2xl border border-border p-8 md:p-10 text-center max-w-lg mx-auto">
              <div className="mb-6">
                <div className="text-5xl font-bold text-ink mb-2">
                  {pricing.pricePerMonth}
                </div>
                <div className="text-muted text-sm">
                  Billed as {pricing.billedAs}
                </div>
              </div>

              {pricing.savings && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-6">
                  {pricing.savings}
                </div>
              )}

              <div className="text-sm text-muted mb-6">
                {pricing.credits}
              </div>

              <button className="w-full py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors btn-press mb-4">
                Subscribe Now
              </button>

              <p className="text-xs text-muted">{siteConfig.pricing.terms}</p>
            </div>
          </div>
        </section>

        {/* Course Catalog Carousel */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
                  Included in Plus
                </h2>
                <p className="text-muted">
                  Watch these courses and 1,000+ more for free
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCatalog(-1)}
                  disabled={catalogIndex === 0}
                  className="w-10 h-10 rounded-full bg-white shadow border border-border flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollCatalog(1)}
                  disabled={catalogIndex >= catalogMax}
                  className="w-10 h-10 rounded-full bg-white shadow border border-border flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className="flex gap-5 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${catalogIndex * (100 / 3 + 1.5)}%)`,
                }}
              >
                {plusCatalogCourses.map((course, i) => (
                  <div
                    key={i}
                    className="shrink-0"
                    style={{ width: "calc((100% - 40px) / 3)" }}
                  >
                    <CourseCard {...course} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Credits Features Carousel */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
                  Plus Benefits
                </h2>
                <p className="text-muted">
                  Everything you get with your subscription
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCredits(-1)}
                  disabled={creditsIndex === 0}
                  className="w-10 h-10 rounded-full bg-white shadow border border-border flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollCredits(1)}
                  disabled={creditsIndex >= creditsMax}
                  className="w-10 h-10 rounded-full bg-white shadow border border-border flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className="flex gap-5 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${creditsIndex * (100 / 3 + 1.5)}%)`,
                }}
              >
                {siteConfig.plusBenefits.map((benefit, i) => {
                  const Icon = benefitIcons[i] || Check;
                  return (
                    <div
                      key={i}
                      className="shrink-0 bg-surface rounded-xl p-6 border border-border"
                      style={{ width: "calc((100% - 40px) / 3)" }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-brand" />
                      </div>
                      <h3 className="font-semibold text-ink mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">
                  Earn a certificate with every course
                </h2>
                <p className="text-muted mb-6 leading-relaxed">
                  Complete any course and instantly receive a personalized
                  certificate signed by your teacher. Download as PDF or share
                  online to showcase your skills.
                </p>
                <ul className="space-y-3">
                  {[
                    "Personalized with your name",
                    "QR code linking to your project",
                    "Teacher's authentic signature",
                    "Share on LinkedIn & portfolio",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-ink"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-dashed border-border flex items-center justify-center">
                  <div className="text-center">
                    <Award className="w-12 h-12 text-brand/30 mx-auto mb-3" />
                    <p className="text-sm text-muted">Certificate Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink text-center mb-10">
              Compare plans
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-4 text-sm font-semibold text-muted">
                      Feature
                    </th>
                    <th className="pb-4 text-sm font-semibold text-ink text-center">
                      Free
                    </th>
                    <th className="pb-4 text-sm font-semibold text-brand text-center">
                      Plus
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Watch 1,000+ courses", false, true],
                    ["100+ new courses weekly", false, true],
                    ["Course credits", false, true],
                    ["Certificates", false, true],
                    ["Exclusive discounts", false, true],
                    ["Buy individual courses", true, true],
                  ].map(([feature, free, plus]) => (
                    <tr key={String(feature)} className="border-b border-border">
                      <td className="py-4 text-sm text-ink">{String(feature)}</td>
                      <td className="py-4 text-center">
                        {free ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="py-4 text-center">
                        {plus ? (
                          <Check className="w-5 h-5 text-brand mx-auto" />
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {siteConfig.plusFaq.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-ink text-sm">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted shrink-0 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-4 text-sm text-muted leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-ink text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Start creating today
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Join Plus and get unlimited access to the world's best creative
              courses.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors btn-press text-lg"
            >
              Get Plus Now
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
