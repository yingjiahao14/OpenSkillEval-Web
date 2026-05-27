import { useState, useEffect } from "react";
import { ArrowRight, Play, CheckCircle2, Zap, Monitor, Users, MessageCircle, Award, Globe, Film } from "lucide-react";
import { siteConfig } from "../config/site";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CountdownBanner } from "../components/CountdownBanner";
import { CourseCard } from "../components/CourseCard";
import { Carousel } from "../components/Carousel";

const valueIcons = [
  Zap,
  Monitor,
  Users,
  MessageCircle,
  Award,
  Globe,
  CheckCircle2,
  Film,
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setHeroIndex((p) => (p + 1) % siteConfig.specializations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const hero = siteConfig.specializations[heroIndex];

  return (
    <div className="min-h-screen bg-surface grain">
      <CountdownBanner />
      <Header activePage="home" />

      <main>
        {/* Hero Carousel */}
        <section className="relative bg-ink text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-teal rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-700 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
                  FREE WITH Plus membership
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  {hero.title}
                </h1>
                <p className="text-lg text-white/70 mb-6 max-w-lg">
                  {hero.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-white/60">
                  <span>{hero.students} students</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>
                    {hero.rating} ({hero.reviews} reviews)
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="line-through">{hero.originalPrice}</span>
                  <span className="text-accent-teal font-bold text-lg">
                    {hero.salePrice}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="plus.html"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors btn-press"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">
                    <Play className="w-4 h-4" />
                    Watch Preview
                  </button>
                </div>
              </div>

              <div
                className={`relative transition-all duration-700 delay-200 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow-2xl">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 rounded-2xl bg-brand/20 flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 text-brand" />
                      </div>
                      <p className="text-white/50 text-sm">
                        Course Preview
                      </p>
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white text-ink px-4 py-3 rounded-xl shadow-xl">
                  <div className="text-xs text-muted">Discount</div>
                  <div className="font-bold text-brand text-xl">99% OFF</div>
                </div>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-10">
              {siteConfig.specializations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === heroIndex ? "bg-brand w-8" : "bg-white/30 w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
                  Best Seller Courses
                </h2>
                <p className="text-muted">
                  Join hundreds of thousands of students already learning
                </p>
              </div>
              <a
                href="courses.html"
                className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
              >
                View all <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <Carousel itemsPerView={3} gap={20}>
              {siteConfig.bestSellers.map((course, i) => (
                <CourseCard key={i} {...course} />
              ))}
            </Carousel>
          </div>
        </section>

        {/* New Courses */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
                  New Courses
                </h2>
                <p className="text-muted">
                  Fresh content added every week
                </p>
              </div>
              <a
                href="courses.html"
                className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
              >
                Explore all <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.newCourses.map((course, i) => (
                <CourseCard key={i} {...course} />
              ))}
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">
                What to expect from a CreativeHub course
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Designed by creative professionals, for creative professionals.
                Every course is a step toward mastering your craft.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.valuePropositions.map((vp, i) => {
                const Icon = valueIcons[i] || CheckCircle2;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-6 border border-border card-lift"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <h3 className="font-semibold text-ink mb-2">{vp.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {vp.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 md:py-20 bg-ink text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Ready to unlock your creativity?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Join millions of creatives and start learning today. Your first
              course is just a click away.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="plus.html"
                className="px-8 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors btn-press"
              >
                Start Learning for Free
              </a>
              <a
                href="courses.html"
                className="px-8 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                Browse Courses
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
