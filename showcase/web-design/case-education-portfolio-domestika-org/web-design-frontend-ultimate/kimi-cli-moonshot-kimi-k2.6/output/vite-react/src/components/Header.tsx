import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { siteConfig } from "../config/site";

export function Header({ activePage = "home" }: { activePage?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const page = href.replace(".html", "");
    return activePage === page;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="index.html" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <span className="text-white font-bold text-sm">CH</span>
            </div>
            <span className="font-display font-bold text-xl text-ink tracking-tight">
              CreativeHub
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-brand bg-brand/5"
                    : "text-ink hover:text-brand hover:bg-gray-50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 rounded-md hover:bg-gray-50 text-muted hover:text-ink transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <a
              href="login.html"
              className="px-4 py-2 text-sm font-medium text-ink hover:text-brand transition-colors"
            >
              Log in
            </a>
            <a
              href="plus.html"
              className="px-4 py-2 text-sm font-medium bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors btn-press"
            >
              Join for Free
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          {siteConfig.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive(item.href)
                  ? "text-brand bg-brand/5"
                  : "text-ink hover:bg-gray-50"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t flex flex-col gap-2">
            <a
              href="login.html"
              className="px-3 py-2 text-sm font-medium text-ink"
              onClick={() => setMobileOpen(false)}
            >
              Log in
            </a>
            <a
              href="plus.html"
              className="px-3 py-2 text-sm font-medium bg-brand text-white rounded-lg text-center"
              onClick={() => setMobileOpen(false)}
            >
              Join for Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
