import { useState } from "react";
import { PanelLeftClose, PanelLeft, ChevronRight } from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface SidebarProps {
  items: SidebarItem[];
  activeHref?: string;
}

export function Sidebar({ items, activeHref }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-4rem)] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg-secondary)] transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } hidden md:block`}
    >
      <div className="flex h-full flex-col">
        {/* Collapse toggle */}
        <div className="flex items-center justify-end border-b border-[var(--color-border)] p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-md p-1.5 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {items.map((item) => (
            <div key={item.label} className="px-2">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.label)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      collapsed
                        ? "justify-center"
                        : "justify-between"
                    } ${
                      activeHref?.startsWith(item.href)
                        ? "bg-[var(--color-accent-dim)] text-[var(--color-accent)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    <span className={collapsed ? "hidden" : "block truncate"}>{item.label}</span>
                    {!collapsed && (
                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform ${openSections[item.label] ? "rotate-90" : ""}`}
                      />
                    )}
                  </button>
                  {!collapsed && openSections[item.label] && item.children && (
                    <div className="mt-1 ml-4 border-l border-[var(--color-border)] pl-3">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                            activeHref === child.href
                              ? "text-[var(--color-accent)]"
                              : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                          }`}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.href}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    collapsed ? "justify-center" : ""
                  } ${
                    activeHref === item.href
                      ? "bg-[var(--color-accent-dim)] text-[var(--color-accent)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <span className={collapsed ? "hidden" : "block truncate"}>{item.label}</span>
                  {collapsed && <span className="h-2 w-2 rounded-full bg-[var(--color-text-muted)]" />}
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
