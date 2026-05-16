import * as React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "../config/site";

interface NavbarProps {
  currentPage?: string;
}

export function Navbar({ currentPage = "home" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (currentPage === "home" && href === "index.html") return true;
    if (currentPage === "the-workout" && href === "the-workout.html") return true;
    if (currentPage === "instructors" && href === "instructors.html") return true;
    if (currentPage === "ride-faq" && href === "ride-faq.html") return true;
    if (currentPage === "digital-platform" && href === "digital-platform.html") return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#141414]/90 backdrop-blur-md border-b border-[#2a2a2a]">
      <div className="container-custom mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="index.html" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#ff0000] flex items-center justify-center">
              <span className="text-white font-bold text-sm">RR</span>
            </div>
            <span className="font-[Oswald] text-xl md:text-2xl font-bold tracking-wide uppercase text-white group-hover:text-[#ff0000] transition-colors">
              RedRoom
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {siteConfig.nav.primary.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-[Oswald] text-sm tracking-wider uppercase transition-colors ${
                  isActive(item.href)
                    ? "text-[#ff0000]"
                    : "text-white/80 hover:text-[#ff0000]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Utility */}
          <div className="hidden lg:flex items-center gap-4">
            {siteConfig.nav.utility.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-[Oswald] text-sm tracking-wider uppercase px-4 py-2 bg-[#ff0000] text-white hover:bg-[#cc0000] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#141414] border-t border-[#2a2a2a]">
          <nav className="container-custom mx-auto px-4 py-6 flex flex-col gap-4">
            {siteConfig.nav.primary.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`font-[Oswald] text-lg tracking-wider uppercase py-2 ${
                  isActive(item.href)
                    ? "text-[#ff0000]"
                    : "text-white/80 hover:text-[#ff0000]"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-[#2a2a2a]">
              {siteConfig.nav.utility.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-[Oswald] text-lg tracking-wider uppercase px-4 py-3 bg-[#ff0000] text-white text-center"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
