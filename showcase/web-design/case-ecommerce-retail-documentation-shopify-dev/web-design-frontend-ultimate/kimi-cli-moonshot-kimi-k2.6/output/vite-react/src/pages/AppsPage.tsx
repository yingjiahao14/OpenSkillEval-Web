import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import {
  LayoutGrid,
  Blocks,
  Briefcase,
  ShieldCheck,
  Zap,
  Globe,
  CreditCard,
  Users,
  Workflow,
  Monitor,
  Code2,
  Puzzle,
  FunctionSquare,
  Webhook,
  Database,
  KeyRound,
  BarChart3,
  Tag,
  Package,
  Truck,
  Landmark,
  Building2,
} from "lucide-react";

const sidebarItems = [
  { label: "Overview", href: "#overview" },
  { label: "Dev Tools", href: "#dev-tools" },
  {
    label: "Surfaces",
    href: "#surfaces",
    children: [
      { label: "App Home", href: "#app-home" },
      { label: "Admin", href: "#admin" },
      { label: "Checkout", href: "#checkout" },
      { label: "Customer accounts", href: "#customer-accounts" },
      { label: "Flow", href: "#flow" },
      { label: "Online store", href: "#online-store" },
    ],
  },
  {
    label: "Building Blocks",
    href: "#building-blocks",
    children: [
      { label: "GraphQL", href: "#graphql" },
      { label: "Extensions", href: "#extensions" },
      { label: "Functions", href: "#functions" },
      { label: "Webhooks", href: "#webhooks" },
      { label: "Metafields", href: "#metafields" },
      { label: "Authentication", href: "#authentication" },
    ],
  },
  {
    label: "Use Cases",
    href: "#use-cases",
    children: [
      { label: "Marketing", href: "#marketing" },
      { label: "Discounts", href: "#discounts" },
      { label: "Merchandising", href: "#merchandising" },
      { label: "Orders", href: "#orders" },
      { label: "Payments", href: "#payments" },
      { label: "B2B", href: "#b2b" },
    ],
  },
  { label: "Best Practices", href: "#best-practices" },
];

const surfaceIcons: Record<string, React.ReactNode> = {
  "App Home": <LayoutGrid size={20} />,
  Admin: <Monitor size={20} />,
  Checkout: <CreditCard size={20} />,
  "Customer accounts": <Users size={20} />,
  Flow: <Workflow size={20} />,
  "Online store": <Globe size={20} />,
};

const blockIcons: Record<string, React.ReactNode> = {
  GraphQL: <Code2 size={20} />,
  Extensions: <Puzzle size={20} />,
  Functions: <FunctionSquare size={20} />,
  Webhooks: <Webhook size={20} />,
  Metafields: <Database size={20} />,
  Authentication: <KeyRound size={20} />,
};

const useCaseIcons: Record<string, React.ReactNode> = {
  "Marketing and analytics": <BarChart3 size={20} />,
  Discounts: <Tag size={20} />,
  "Product merchandising": <Package size={20} />,
  "Orders and fulfillment": <Truck size={20} />,
  Payments: <CreditCard size={20} />,
  B2B: <Building2 size={20} />,
};

const bestPracticeIcons: Record<string, React.ReactNode> = {
  Performance: <Zap size={20} />,
  Accessibility: <Users size={20} />,
  Security: <ShieldCheck size={20} />,
  Compliance: <Briefcase size={20} />,
  Localization: <Globe size={20} />,
  "Non-deceptive code": <Blocks size={20} />,
};

export function AppsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />

      <div className="flex">
        <Sidebar items={sidebarItems} activeHref="#overview" />

        <main className="min-w-0 flex-1">
          {/* Hero */}
          <section id="overview" className="section-padding border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-4xl px-6">
              <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
                {siteConfig.appsPage.hero.title}
              </h1>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                {siteConfig.appsPage.hero.subtitle}
              </p>
            </div>
          </section>

          {/* Dev Tools */}
          <section id="dev-tools" className="section-padding border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                {siteConfig.appsPage.devTools.title}
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {siteConfig.appsPage.devTools.items.map((tool) => (
                  <div
                    key={tool.title}
                    className="glass-card p-6 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {tool.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Surfaces Grid */}
          <section id="surfaces" className="section-padding border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                App Surfaces
              </h2>
              <p className="mt-2 text-[var(--color-text-secondary)]">
                Build across every surface from a single app. All UI surfaces share Polaris, CommerceForge's unified design system.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {siteConfig.appsPage.surfaces.map((surface) => (
                  <div
                    key={surface.title}
                    id={surface.title.toLowerCase().replace(/\s+/g, "-")}
                    className="glass-card p-6 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {surfaceIcons[surface.title]}
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {surface.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {surface.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Building Blocks */}
          <section id="building-blocks" className="section-padding border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                Building Blocks
              </h2>
              <p className="mt-2 text-[var(--color-text-secondary)]">
                Read and write store data with APIs, react to events with webhooks, and customize backend behavior with Functions.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {siteConfig.appsPage.buildingBlocks.map((block) => (
                  <div
                    key={block.title}
                    id={block.title.toLowerCase()}
                    className="glass-card p-6 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {blockIcons[block.title]}
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {block.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {block.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section id="use-cases" className="section-padding border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                Use Cases
              </h2>
              <p className="mt-2 text-[var(--color-text-secondary)]">
                Integrate with dedicated APIs for specific commerce workflows.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {siteConfig.appsPage.useCases.map((uc) => (
                  <div
                    key={uc.title}
                    id={uc.title.toLowerCase().replace(/\s+and\s+/g, "-").replace(/\s+/g, "-")}
                    className="glass-card p-6 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {useCaseIcons[uc.title]}
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {uc.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {uc.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="section-padding border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                Best Practices
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {siteConfig.appsPage.bestPractices.map((bp) => (
                  <div
                    key={bp.title}
                    className="glass-card p-6 transition-all hover:border-[var(--color-accent-border)]"
                  >
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                      {bestPracticeIcons[bp.title]}
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {bp.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {bp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
