import { useState } from "react";
import { Menu, X, Search, Moon, Sun } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 backdrop-blur-xl">
      <div className="container-max mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <a href="index.html" className="flex items-center gap-2 text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-display text-sm">
            CF
          </span>
          <span className="font-display">{siteConfig.name}</span>
          <span className="text-[var(--color-text-muted)] font-normal">{siteConfig.tagline}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right utilities */}
        <div className="hidden items-center gap-2 md:flex">
          <button className="rounded-md p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]">
            <Search size={18} />
          </button>
          <button className="rounded-md p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]">
            <Moon size={18} />
          </button>
          <a
            href="#"
            className="ml-2 rounded-md bg-[var(--color-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
          >
            Log in
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-[var(--color-text-muted)] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-2 border-t border-[var(--color-border)] pt-4">
            <button className="rounded-md p-2 text-[var(--color-text-muted)]">
              <Search size={18} />
            </button>
            <button className="rounded-md p-2 text-[var(--color-text-muted)]">
              <Moon size={18} />
            </button>
            <a
              href="#"
              className="ml-auto rounded-md bg-[var(--color-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)] border border-[var(--color-border)]"
            >
              Log in
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
