import { useState, useRef, useEffect } from "react";
import { siteConfig } from "../config/site";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  ShieldCheck,
  Users,
  Calendar,
  Globe,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Calendar: <Calendar className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
};

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-warm-300 shadow-sm">
      {/* Top credibility strip */}
      <div className="hidden lg:flex items-center justify-center gap-8 py-1.5 bg-teal-50 border-b border-teal-100">
        {siteConfig.credibilityStats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-1.5 text-xs text-teal-700 font-medium">
            {iconMap[stat.icon]}
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg font-display">W</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-charcoal font-display">
              WellSource
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {siteConfig.nav.primary.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleEnter(item.label)}
                onMouseLeave={handleLeave}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    openDropdown === item.label
                      ? "text-teal-600 bg-teal-50"
                      : "text-charcoal hover:text-teal-600 hover:bg-warm-100"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-[520px] bg-white rounded-xl shadow-xl border border-warm-300 p-5 z-50">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      {item.items.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="block px-3 py-2 rounded-md text-sm text-charcoal-muted hover:text-teal-600 hover:bg-teal-50 transition-colors"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                    {"extras" in item && item.extras && (
                      <div className="mt-4 pt-4 border-t border-warm-200 flex gap-3">
                        {item.extras.map((extra) => (
                          <a
                            key={extra}
                            href="#"
                            className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full hover:bg-teal-100 transition-colors"
                          >
                            {extra}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 rounded-md hover:bg-warm-100 text-charcoal-muted transition-colors">
              <Search className="w-5 h-5" />
            </button>
            {siteConfig.nav.secondary.map((action) => (
              <a
                key={action}
                href="#"
                className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                  action === "Subscribe"
                    ? "bg-teal-500 text-white hover:bg-teal-600"
                    : "text-charcoal hover:bg-warm-100"
                }`}
              >
                {action}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-warm-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-warm-300 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {siteConfig.nav.primary.map((item) => (
              <div key={item.label}>
                <button
                  className="flex items-center justify-between w-full px-3 py-3 rounded-md text-sm font-medium text-charcoal hover:bg-warm-100"
                  onClick={() =>
                    setMobileDropdown(mobileDropdown === item.label ? null : item.label)
                  }
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileDropdown === item.label && (
                  <div className="pl-4 pb-2 space-y-1">
                    {item.items.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="block px-3 py-2 rounded-md text-sm text-charcoal-muted hover:text-teal-600 hover:bg-teal-50"
                      >
                        {sub}
                      </a>
                    ))}
                    {"extras" in item && item.extras && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.extras.map((extra) => (
                          <span
                            key={extra}
                            className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full"
                          >
                            {extra}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-warm-200 flex gap-3">
              {siteConfig.nav.secondary.map((action) => (
                <a
                  key={action}
                  href="#"
                  className={`flex-1 text-center text-sm font-medium px-4 py-2.5 rounded-md transition-colors ${
                    action === "Subscribe"
                      ? "bg-teal-500 text-white"
                      : "bg-warm-100 text-charcoal"
                  }`}
                >
                  {action}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
