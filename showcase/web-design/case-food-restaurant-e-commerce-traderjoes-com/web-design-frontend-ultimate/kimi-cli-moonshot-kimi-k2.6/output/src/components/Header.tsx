import { useState } from "react"
import { Menu, X, ShoppingBasket } from "lucide-react"

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Our Stores", href: "#stores" },
  { label: "Recipes", href: "#recipes" },
  { label: "About Us", href: "#about" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#FEFAE0]/90 backdrop-blur-md border-b border-[#2D6A4F]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 text-[#2D6A4F]">
            <ShoppingBasket className="w-7 h-7" />
            <span className="font-extrabold text-xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Fresh Pantry
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-[#2D6A4F]/80 hover:text-[#2D6A4F] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-[#2D6A4F]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-2 border-t border-[#2D6A4F]/10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-semibold text-[#2D6A4F]/80 hover:text-[#2D6A4F]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
