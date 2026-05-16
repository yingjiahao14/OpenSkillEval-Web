import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { Bot, Store, Shield, CreditCard, Search, ShoppingBag, Clock } from "lucide-react";

const sidebarItems = [
  { label: "Overview", href: "#overview" },
  { label: "Protocol Overview", href: "#protocol-overview" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Product Discovery", href: "#product-discovery" },
  { label: "Checkout Flow", href: "#checkout-flow" },
];

export function AgentsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />

      <div className="flex">
        <Sidebar items={sidebarItems} activeHref="#overview" />

        <main className="min-w-0 flex-1">
          {/* Hero */}
          <section id="overview" className="section-padding border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-4xl px-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                  <Bot size={22} />
                </span>
                <span className="rounded-full bg-[var(--color-accent-dim)] px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
                  New
                </span>
              </div>
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
                {siteConfig.agentsPage.hero.title}
              </h1>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                {siteConfig.agentsPage.hero.subtitle}
              </p>
              <a
                href="#how-it-works"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-primary)] transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent-dim)]"
              >
                {siteConfig.agentsPage.hero.cta}
              </a>
            </div>
          </section>

          {/* Protocol Overview */}
          <section id="protocol-overview" className="section-padding border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                {siteConfig.agentsPage.protocolOverview.title}
              </h2>
              <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                {siteConfig.agentsPage.protocolOverview.description}
              </p>

              {/* Protocol Actors Diagram */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {siteConfig.agentsPage.protocolActors.map((actor) => (
                  <div
                    key={actor.title}
                    className="glass-card p-6 text-center transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {actor.title === "Agent" && <Bot size={24} />}
                      {actor.title === "Merchant" && <Store size={24} />}
                      {actor.title === "CP" && <Shield size={24} />}
                      {actor.title === "PSP" && <CreditCard size={24} />}
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {actor.title}
                    </h3>
                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                      {actor.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Connection arrows visualization */}
              <div className="mt-6 flex items-center justify-center gap-2 text-[var(--color-text-muted)]">
                <div className="hidden lg:flex items-center gap-2">
                  <span className="h-px w-8 bg-[var(--color-border)]" />
                  <span className="text-xs">UCP Protocol</span>
                  <span className="h-px w-8 bg-[var(--color-border)]" />
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="section-padding border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                {siteConfig.agentsPage.howItWorks.title}
              </h2>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                {siteConfig.agentsPage.howItWorks.description}
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {siteConfig.agentsPage.howItWorks.items.map((item) => (
                  <div
                    key={item.title}
                    className="glass-card p-8 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {item.title === "Discovery" ? <Search size={20} /> : <ShoppingBag size={20} />}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Product Discovery */}
          <section id="product-discovery" className="section-padding border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                {siteConfig.agentsPage.productDiscovery.title}
              </h2>
              <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                {siteConfig.agentsPage.productDiscovery.description}
              </p>
              <div className="mt-8 glass-card p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                    <Search size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      Catalog MCP Server
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Query products, apply filters, and retrieve variant details for checkout sessions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Checkout Flow */}
          <section id="checkout-flow" className="section-padding border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-4xl px-6">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                  {siteConfig.agentsPage.checkoutFlow.title}
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                  <Clock size={12} />
                  {siteConfig.agentsPage.checkoutFlow.status}
                </span>
              </div>
              <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                {siteConfig.agentsPage.checkoutFlow.description}
              </p>
              <div className="mt-8 glass-card p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      Checkout MCP Server
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Create and update carts and checkouts. Refer buyers to merchant storefronts with full attribution control.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
