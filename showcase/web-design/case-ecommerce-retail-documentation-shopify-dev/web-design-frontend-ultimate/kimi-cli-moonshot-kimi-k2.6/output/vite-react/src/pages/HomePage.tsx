import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CodeBlock } from "@/components/CodeBlock";
import { ChevronDown, Terminal, ShoppingBag, Bot, Store, Rocket, Users } from "lucide-react";

const managerIcons: Record<string, React.ReactNode> = {
  npm: <Terminal size={14} />,
  yarn: <Terminal size={14} />,
  pnpm: <Terminal size={14} />,
};

export function HomePage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>("apps");
  const [activeTab, setActiveTab] = useState<"npm" | "yarn" | "pnpm">("npm");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="container-max mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] md:text-6xl lg:text-7xl">
                {siteConfig.hero.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
                {siteConfig.hero.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {siteConfig.hero.ctas.map((cta) => (
                  <a
                    key={cta.text}
                    href={cta.href}
                    className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-primary)] transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent-dim)]"
                  >
                    {cta.text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Subtle background pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-text-primary) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </section>

        {/* Product Cards */}
        <section className="section-padding border-t border-[var(--color-border)]">
          <div className="container-max mx-auto">
            <div className="grid gap-6 md:grid-cols-3">
              {siteConfig.productCards.map((card) => (
                <a
                  key={card.id}
                  href={card.href}
                  className="glass-card group p-8 transition-all duration-300 hover:border-[var(--color-accent-border)] hover:shadow-lg hover:shadow-[var(--color-accent-dim)]"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                    {card.id === "apps" && <ShoppingBag size={20} />}
                    {card.id === "storefronts" && <Store size={20} />}
                    {card.id === "agents" && <Bot size={20} />}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {card.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-colors group-hover:text-[var(--color-accent-hover)]">
                    {card.cta}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CLI Setup */}
        <section className="section-padding border-t border-[var(--color-border)]">
          <div className="container-max mx-auto">
            <div className="mx-auto max-w-3xl">
              <div className="mb-10 text-center">
                <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl">
                  {siteConfig.cliSetup.title}
                </h2>
                <p className="mt-4 text-[var(--color-text-secondary)]">
                  {siteConfig.cliSetup.subtitle}
                </p>
              </div>

              {/* Package manager tabs */}
              <div className="mb-6 flex gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-1">
                {(["npm", "yarn", "pnpm"] as const).map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setActiveTab(pm)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                      activeTab === pm
                        ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {managerIcons[pm]}
                    {pm}
                  </button>
                ))}
              </div>

              {/* Install command */}
              <CodeBlock code={siteConfig.cliSetup.installCommands[activeTab]} />

              {/* Accordions */}
              <div className="mt-8 space-y-3">
                {siteConfig.cliSetup.accordions.map((acc) => (
                  <div
                    key={acc.id}
                    className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
                  >
                    <button
                      onClick={() => toggleAccordion(acc.id)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[var(--color-surface)]"
                    >
                      <span className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                        {acc.label}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 ${
                          openAccordion === acc.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openAccordion === acc.id && (
                      <div className="border-t border-[var(--color-border)] px-5 py-4">
                        <ol className="space-y-3">
                          {acc.steps.map((step, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
                            >
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-dim)] text-xs font-semibold text-[var(--color-accent)]">
                                {idx + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                        <div className="mt-4">
                          <CodeBlock code={acc.initCommand} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Launch CTA */}
        <section className="section-padding border-t border-[var(--color-border)]">
          <div className="container-max mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              {siteConfig.launchCta.map((item) => (
                <div
                  key={item.title}
                  className="glass-card p-8 transition-all duration-300 hover:border-[var(--color-accent-border)]"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                    <Rocket size={20} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {item.description}
                  </p>
                  <a
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                  >
                    {item.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="section-padding border-t border-[var(--color-border)]">
          <div className="container-max mx-auto">
            <div className="mb-10 text-center">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                Community Resources
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {siteConfig.community.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="glass-card group p-6 transition-all duration-300 hover:border-[var(--color-accent-border)]"
                >
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                    <Users size={16} />
                  </div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {item.label}
                  </h4>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">{item.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
