import React from "react";
import { siteConfig } from "./config/site";
import { Button } from "./components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import {
  Play,
  Users,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Palette,
  Award,
  Route,
  Menu,
  X,
} from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = React.useState("Featured");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const filteredCourses =
    activeTab === "Featured"
      ? siteConfig.courses.items
      : siteConfig.courses.items.filter((c) =>
          c.category.toLowerCase().includes(activeTab.toLowerCase())
        );

  const scrollTeachers = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

  return (
    <div className="min-h-screen bg-cream grain">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-navy tracking-tight">
                CreativeHub
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#courses"
                className="text-sm font-medium text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Browse
              </a>
              <a
                href="#teachers"
                className="text-sm font-medium text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Teachers
              </a>
              <a
                href="#faq"
                className="text-sm font-medium text-charcoal/70 hover:text-charcoal transition-colors"
              >
                FAQ
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-sm font-medium text-charcoal/70 hover:text-charcoal"
              >
                Sign In
              </Button>
              <Button className="bg-navy text-white hover:bg-navy-light text-sm font-semibold rounded-full px-5">
                Sign Up
              </Button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-charcoal" />
              ) : (
                <Menu className="w-5 h-5 text-charcoal" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-cream border-t border-cream-dark px-4 py-4 space-y-3">
            <a
              href="#courses"
              className="block text-sm font-medium text-charcoal/70"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse
            </a>
            <a
              href="#teachers"
              className="block text-sm font-medium text-charcoal/70"
              onClick={() => setMobileMenuOpen(false)}
            >
              Teachers
            </a>
            <a
              href="#faq"
              className="block text-sm font-medium text-charcoal/70"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 text-sm font-medium"
              >
                Sign In
              </Button>
              <Button className="flex-1 bg-navy text-white text-sm font-semibold rounded-full">
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-accent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              {siteConfig.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              {siteConfig.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <Button className="bg-white text-navy hover:bg-white/90 font-semibold rounded-full px-8 py-6 text-base gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {siteConfig.hero.ctaGoogle.text}
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold rounded-full px-8 py-6 text-base"
              >
                {siteConfig.hero.ctaEmail.text}
              </Button>
            </div>

            <p className="text-xs text-white/50 max-w-lg mx-auto">
              {siteConfig.hero.legal}
            </p>
          </div>

          {/* Category Pills */}
          <div className="mt-12">
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center px-1">
              {siteConfig.hero.categories.map((cat) => (
                <a
                  key={cat}
                  href="#courses"
                  className="shrink-0 px-5 py-2.5 rounded-full bg-white/10 text-white/90 text-sm font-medium hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            {siteConfig.features.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.features.items.map((item, i) => (
              <Card
                key={i}
                className="bg-surface border-cream-dark rounded-2xl hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-green-accent/15 flex items-center justify-center mb-4">
                    {i === 0 && <Play className="w-5 h-5 text-green-accent" />}
                    {i === 1 && <Star className="w-5 h-5 text-green-accent" />}
                    {i === 2 && <Route className="w-5 h-5 text-green-accent" />}
                    {i === 3 && (
                      <Award className="w-5 h-5 text-green-accent" />
                    )}
                  </div>
                  <h3 className="font-bold text-navy mb-1">{item.title}</h3>
                  <p className="text-sm text-charcoal/60">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {siteConfig.stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-10">
            {siteConfig.courses.title}
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {siteConfig.courses.tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-navy text-white"
                    : "bg-surface text-charcoal/70 hover:bg-cream-dark border border-cream-dark"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(filteredCourses.length > 0
              ? filteredCourses
              : siteConfig.courses.items
            ).map((course, i) => (
              <Card
                key={i}
                className="bg-surface border-cream-dark rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-navy text-xs font-semibold backdrop-blur-sm">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-navy text-sm leading-snug mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-charcoal/60 mb-3">
                    {course.instructor}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-charcoal/50">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {course.students.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Feed */}
      <section className="py-16 md:py-24 bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            {siteConfig.creativeFeed.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.creativeFeed.items.map((item, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl p-8 border border-cream-dark hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-accent/10 flex items-center justify-center mb-5">
                  {i === 0 && (
                    <Sparkles className="w-6 h-6 text-purple-accent" />
                  )}
                  {i === 1 && <Users className="w-6 h-6 text-purple-accent" />}
                  {i === 2 && (
                    <Palette className="w-6 h-6 text-purple-accent" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-charcoal/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section id="teachers" className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
                {siteConfig.teachers.title}
              </h2>
              <p className="text-charcoal/60 max-w-xl">
                {siteConfig.teachers.subtitle}
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scrollTeachers("left")}
                className="w-10 h-10 rounded-full border border-cream-dark bg-surface flex items-center justify-center hover:bg-cream-dark transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-charcoal" />
              </button>
              <button
                onClick={() => scrollTeachers("right")}
                className="w-10 h-10 rounded-full border border-cream-dark bg-surface flex items-center justify-center hover:bg-cream-dark transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-charcoal" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
          >
            {siteConfig.teachers.items.map((teacher, i) => (
              <Card
                key={i}
                className="shrink-0 w-64 bg-surface border-cream-dark rounded-2xl overflow-hidden snap-start hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-navy to-purple-accent flex items-center justify-center">
                  <Avatar className="w-20 h-20 border-4 border-white/20">
                    <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                      {initials(teacher.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardContent className="p-5 text-center">
                  <h3 className="font-bold text-navy mb-1">{teacher.name}</h3>
                  <p className="text-sm text-charcoal/60">{teacher.specialty}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {siteConfig.testimonials.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteConfig.testimonials.items.map((t, i) => (
              <Card
                key={i}
                className="bg-white/5 border-white/10 rounded-2xl backdrop-blur-sm"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-green-accent text-navy text-sm font-bold">
                        {initials(t.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-white">{t.name}</span>
                  </div>
                  <p className="text-white/80 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teams */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            {siteConfig.teams.title}
          </h2>
          <p className="text-charcoal/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            {siteConfig.teams.body}
          </p>
          <Button className="bg-navy text-white hover:bg-navy-light font-semibold rounded-full px-8 py-6 text-base">
            {siteConfig.teams.cta.text}
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-surface-alt">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-10">
            {siteConfig.faq.title}
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {siteConfig.faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-surface border border-cream-dark rounded-2xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-navy py-5 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-charcoal/70 leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {siteConfig.footer.columns.slice(0, 5).map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-sm mb-4 text-white/90">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {siteConfig.footer.columns.slice(5).map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-sm mb-4 text-white/90">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-sm">CreativeHub</span>
            </div>
            <p className="text-xs text-white/40 text-center md:text-right">
              {siteConfig.footer.legal}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
