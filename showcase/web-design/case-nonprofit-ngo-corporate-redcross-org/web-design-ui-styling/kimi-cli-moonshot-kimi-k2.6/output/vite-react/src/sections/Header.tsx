import { useState } from 'react'
import { Menu, X, Globe } from 'lucide-react'

interface HeaderProps {
  onDonate: () => void
}

const navLinks = [
  { label: 'About Us', href: '#mission' },
  { label: 'Disaster Relief', href: '#programs' },
  { label: 'Programs & Services', href: '#programs' },
  { label: 'Volunteer', href: '#get-involved' },
  { label: 'Find Local Chapter', href: '#footer' },
]

export default function Header({ onDonate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-200">
      {/* Utility bar */}
      <div className="bg-navy text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-end gap-4">
          <a href="#" className="hover:text-warm-300 transition-colors">Sign In</a>
          <span className="text-warm-400">|</span>
          <a href="#footer" className="hover:text-warm-300 transition-colors">Contact Us</a>
          <span className="text-warm-400">|</span>
          <a href="#" className="hover:text-warm-300 transition-colors flex items-center gap-1">
            <Globe className="w-3 h-3" /> Español
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-navy text-lg tracking-tight hidden sm:block">
              Global Aid Alliance
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-warm-700 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button
              onClick={onDonate}
              className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
            >
              Donate
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-warm-700 hover:text-primary transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-warm-200 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-warm-700 hover:text-primary hover:bg-warm-50 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileOpen(false)
                onDonate()
              }}
              className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-3 rounded-md transition-colors"
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
