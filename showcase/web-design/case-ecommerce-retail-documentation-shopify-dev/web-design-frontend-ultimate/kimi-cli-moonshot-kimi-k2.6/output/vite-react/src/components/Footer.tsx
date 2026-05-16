import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="container-max mx-auto px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Updates */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Updates
            </h4>
            <ul className="space-y-3">
              {siteConfig.footer.updates.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business growth */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Business growth
            </h4>
            <ul className="space-y-3">
              {siteConfig.footer.business.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Legal
            </h4>
            <ul className="space-y-3">
              {siteConfig.footer.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              CommerceForge
            </h4>
            <ul className="space-y-3">
              {siteConfig.footer.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} CommerceForge. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[var(--color-accent)] text-[10px] font-bold text-[var(--color-bg-primary)]">
              CF
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
