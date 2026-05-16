import { useState } from "react";
import { siteConfig } from "../config/site";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#3861FB] flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <span className="text-[#0D1421] font-bold text-lg tracking-tight">
                {siteConfig.name}
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {siteConfig.nav.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#58667E] hover:text-[#0D1421] rounded-md hover:bg-[#F8FAFD] transition-colors">
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-[#E5E7EB] py-1 z-50">
                      {item.items.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="block px-4 py-2 text-sm text-[#58667E] hover:text-[#0D1421] hover:bg-[#F8FAFD] transition-colors"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-[#3861FB] hover:bg-[#EFF2F5] rounded-md transition-colors">
              Log In
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-[#3861FB] hover:bg-[#2A4ED0] rounded-md transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-[#58667E] hover:text-[#0D1421]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E5E7EB] bg-white">
          <div className="px-4 py-3 space-y-1">
            {siteConfig.nav.map((item) => (
              <div key={item.label} className="py-1">
                <div className="px-3 py-2 text-sm font-semibold text-[#0D1421]">
                  {item.label}
                </div>
                <div className="pl-4 space-y-1">
                  {item.items.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-3 py-1.5 text-sm text-[#58667E] hover:text-[#0D1421]"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-3 flex gap-3 border-t border-[#E5E7EB] mt-3">
              <button className="flex-1 px-4 py-2 text-sm font-medium text-[#3861FB] border border-[#3861FB] rounded-md">
                Log In
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#3861FB] rounded-md">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
