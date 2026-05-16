import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Paintbrush,
  FileCode,
  Settings,
  Store,
  Puzzle,
  Globe,
  UserCircle,
  Code2,
  Zap,
  Cloud,
  Smartphone,
  ShoppingCart,
  UserCog,
  CreditCard,
} from "lucide-react";

export function StorefrontsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="section-padding border-b border-[var(--color-border)]">
          <div className="container-max mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl lg:text-6xl">
                {siteConfig.storefrontsPage.hero.title}
              </h1>
              <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
                {siteConfig.storefrontsPage.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Themes */}
        <section className="section-padding border-b border-[var(--color-border)]">
          <div className="container-max mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                {siteConfig.storefrontsPage.themes.title}
              </h2>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                {siteConfig.storefrontsPage.themes.description}
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {siteConfig.storefrontsPage.themes.items.map((item) => (
                  <div
                    key={item.title}
                    className="glass-card p-8 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      <Paintbrush size={20} />
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
          </div>
        </section>

        {/* Theming System */}
        <section className="section-padding border-b border-[var(--color-border)]">
          <div className="container-max mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                {siteConfig.storefrontsPage.themingSystem.title}
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {siteConfig.storefrontsPage.themingSystem.items.map((item) => (
                  <div
                    key={item.title}
                    className="glass-card p-6 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {item.title.includes("Liquid") && <FileCode size={18} />}
                      {item.title.includes("No-code") && <Settings size={18} />}
                      {item.title.includes("Theme Store") && <Store size={18} />}
                      {item.title.includes("extensions") && <Puzzle size={18} />}
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Headless APIs */}
        <section className="section-padding border-b border-[var(--color-border)]">
          <div className="container-max mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                Headless APIs
              </h2>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                Full-stack control with advanced commerce APIs. Go headless with composable APIs or use Hydrogen, the official headless framework.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {siteConfig.storefrontsPage.headlessApis.map((api) => (
                  <div
                    key={api.title}
                    className="glass-card p-6 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {api.title.includes("Storefront") && <Globe size={18} />}
                      {api.title.includes("Customer") && <UserCircle size={18} />}
                      {api.title.includes("Web Components") && <Code2 size={18} />}
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {api.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {api.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Headless Dev Tools */}
        <section className="section-padding border-b border-[var(--color-border)]">
          <div className="container-max mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                Headless Dev Tools
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {siteConfig.storefrontsPage.headlessDevTools.map((tool) => (
                  <div
                    key={tool.title}
                    className="glass-card p-8 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {tool.title === "Hydrogen" ? <Zap size={20} /> : <Cloud size={20} />}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                      {tool.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Commerce */}
        <section className="section-padding border-b border-[var(--color-border)]">
          <div className="container-max mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                Mobile Commerce
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {siteConfig.storefrontsPage.mobileCommerce.map((item) => (
                  <div
                    key={item.title}
                    className="glass-card p-8 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {item.title.includes("SDKs") ? <Smartphone size={20} /> : <ShoppingCart size={20} />}
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
          </div>
        </section>

        {/* Platform Extensions */}
        <section className="section-padding border-b border-[var(--color-border)]">
          <div className="container-max mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                Platform Extensions
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {siteConfig.storefrontsPage.platformExtensions.map((ext) => (
                  <div
                    key={ext.title}
                    className="glass-card p-8 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {ext.title.includes("Customer") ? <UserCog size={20} /> : <CreditCard size={20} />}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                      {ext.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {ext.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
