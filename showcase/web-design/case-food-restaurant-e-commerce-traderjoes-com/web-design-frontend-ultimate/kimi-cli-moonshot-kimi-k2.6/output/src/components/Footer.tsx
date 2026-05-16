import { ShoppingBasket, ExternalLink } from "lucide-react"

const footerLinks = [
  {
    title: "Shop",
    links: ["Products", "Categories", "Weekly Deals", "Gift Cards"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Sustainability"],
  },
  {
    title: "Support",
    links: ["Contact", "FAQs", "Shipping", "Returns"],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#2D6A4F] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <ShoppingBasket className="w-6 h-6 text-[#F4A261]" />
              <span
                className="font-extrabold text-lg tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Fresh Pantry
              </span>
            </a>
            <p className="text-white/60 text-xs leading-relaxed mb-4">
              Your neighborhood grocery store with unique flavors, quality
              ingredients, and unbeatable prices.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-sm mb-4 text-white/90">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Fresh Pantry. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
