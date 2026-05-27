import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "../config/site";

function FooterSection({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b md:border-b-0 border-border">
      <button
        className="w-full md:w-auto flex items-center justify-between md:justify-start md:pointer-events-none py-3 md:py-0 text-sm font-semibold text-ink mb-0 md:mb-3"
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 md:hidden transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`footer-section-content ${open ? "open" : ""}`}
      >
        <div className="pb-3 md:pb-0 space-y-2">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="block text-sm text-muted hover:text-brand transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="index.html" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="font-display font-bold text-xl text-ink tracking-tight">
                CreativeHub
              </span>
            </a>
            <p className="text-sm text-muted mb-4 max-w-xs">
              The largest creative learning community. Learn from the best
              professionals at your own pace.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="px-3 py-1.5 text-xs font-medium bg-ink text-white rounded-md hover:bg-ink/80 transition-colors"
              >
                Google Play
              </a>
              <a
                href="#"
                className="px-3 py-1.5 text-xs font-medium bg-ink text-white rounded-md hover:bg-ink/80 transition-colors"
              >
                App Store
              </a>
            </div>
          </div>

          <FooterSection title="Categories" links={siteConfig.footer.categories.slice(0, 8)} />
          <FooterSection title="Areas" links={siteConfig.footer.areas.slice(0, 8)} />
          <FooterSection title="Software" links={siteConfig.footer.software} />
          <FooterSection
            title="Company"
            links={[
              ...siteConfig.footer.information,
              ...siteConfig.footer.support,
            ]}
          />
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-muted">
            {siteConfig.footer.legal.map((item) => (
              <a key={item} href="#" className="hover:text-brand transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-muted">
            {siteConfig.footer.languages.slice(0, 5).map((lang) => (
              <a key={lang} href="#" className="hover:text-brand transition-colors">
                {lang}
              </a>
            ))}
            <span>+{siteConfig.footer.languages.length - 5} more</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
