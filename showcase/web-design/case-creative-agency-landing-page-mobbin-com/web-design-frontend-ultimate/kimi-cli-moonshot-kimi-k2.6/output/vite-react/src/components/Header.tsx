import { useState } from "react";
import { siteConfig } from "../config/site";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#141414] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">ScreenVault</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-[#141414] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-[#141414] transition-colors"
            >
              Log in
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#4f46e5] rounded-full hover:bg-[#4338ca] transition-colors"
            >
              Join for free
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {siteConfig.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block text-sm font-medium text-gray-600 hover:text-[#141414] transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#"
            className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#4f46e5] rounded-full hover:bg-[#4338ca] transition-colors mt-2"
          >
            Join for free
          </a>
        </div>
      )}
    </header>
  );
}
