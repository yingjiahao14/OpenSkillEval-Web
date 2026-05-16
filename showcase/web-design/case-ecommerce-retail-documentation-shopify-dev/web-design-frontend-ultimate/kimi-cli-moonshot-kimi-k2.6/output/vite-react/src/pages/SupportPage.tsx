import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageCircle, HelpCircle, Briefcase, Puzzle, Paintbrush, DollarSign, Mail } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Partner Program": <Briefcase size={20} />,
  Apps: <Puzzle size={20} />,
  Themes: <Paintbrush size={20} />,
  Payout: <DollarSign size={20} />,
};

export function SupportPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="section-padding border-b border-[var(--color-border)]">
          <div className="container-max mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                <MessageCircle size={28} />
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
                {siteConfig.supportPage.hero.title}
              </h1>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                {siteConfig.supportPage.hero.subtitle}
              </p>
              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-bg-primary)] transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent-dim)]"
              >
                {siteConfig.supportPage.hero.cta}
              </a>
            </div>
          </div>
        </section>

        {/* Additional Support */}
        <section className="section-padding border-b border-[var(--color-border)]">
          <div className="container-max mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center gap-3">
                <HelpCircle size={22} className="text-[var(--color-accent)]" />
                <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                  {siteConfig.supportPage.additionalSupport.title}
                </h2>
              </div>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                {siteConfig.supportPage.additionalSupport.description}
              </p>
            </div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="section-padding border-b border-[var(--color-border)]">
          <div className="container-max mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                Support Categories
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {siteConfig.supportPage.supportCategories.map((cat) => (
                  <div
                    key={cat.title}
                    className="glass-card p-6 text-center transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {categoryIcons[cat.title]}
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                      {cat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* General Queries */}
        <section className="section-padding border-b border-[var(--color-border)]">
          <div className="container-max mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <div className="glass-card p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                    <Mail size={24} />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                    {siteConfig.supportPage.generalQueries.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-[var(--color-text-secondary)]">
                    {siteConfig.supportPage.generalQueries.description}
                  </p>
                  <a
                    href="#"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] px-5 py-2.5 text-sm font-semibold text-[var(--color-accent)] transition-all hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)]"
                  >
                    {siteConfig.supportPage.generalQueries.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
