# GlobalStone — Global Commercial Real Estate Services

## Overview

Build a 5-page corporate website for **GlobalStone**, a global leader in commercial real estate services and investments. The site targets commercial real estate investors, occupiers, property owners, and corporate clients. It must project authority, sophistication, and scale — think CBRE or JLL-level polish. The tone is **professional, modern, and elegant** throughout.

## Visual & Style Direction

- **Color palette:** Deep navy (#0A1628) as the primary dark tone, paired with white, cool grays, and a refined accent — gold or teal — for CTAs and highlights. Avoid anything playful or startup-ish.
- **Typography:** Use a clean sans-serif (e.g., Inter or similar) for body text and a slightly bolder weight or contrasting serif for headlines to convey gravitas.
- **Imagery mood:** Use placeholder images suggesting skylines, modern office towers, and architectural interiors. Large hero images with subtle overlays set the tone on every page.
- **Spacing & layout:** Generous whitespace, structured grids, and clear visual hierarchy. This is a content-rich site — clarity is paramount.

## Key Priorities

1. **The mega menu navigation** is the most complex interactive element. On desktop, hovering/clicking "Services" must reveal a well-organized dropdown with service categories and property types. On mobile, this collapses into accordion-style navigation. Get this right — it's the primary wayfinding mechanism across all 5 pages.

2. **The "What We Do" tabbed section** on the homepage (vertical tabs switching content panels) is a signature interaction that must feel smooth and polished.

3. **Service detail pages** (Invest/Finance/Value, Plan/Lease/Occupy, Design & Build) each have capabilities grids — these must be scannable, consistent in structure, and link logically back to the services overview.

4. **The homepage is dense** — hero, featured insights, announcement banner, about statement, services preview, newsletter CTA, latest insights, and commitment pillars. Prioritize visual rhythm so it doesn't feel overwhelming.

The site must be fully responsive with no build step required.

---

## Data Sources

1. Read `/app/benchmark/source_brief.md` for all content materials (text, data).
2. Read `/app/benchmark/task_input.json` for structural requirements, data placement, and interaction definitions.

## Output Requirements

1. Output all files to `/app/output/`. `index.html` must be the main entry point.
2. All pages must be openable directly in a browser (no build step needed). Use relative paths for inter-page links.

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Skip all confirmation/approval/user-input steps** — make professional judgments autonomously. Do not pause, ask questions, or wait for replies.
2. **Design decisions** — if `task_input.json` specifies `site.tone`, `site.audience`, etc., use them to choose styles, layouts, and color schemes. Otherwise, make professional judgments.
3. **Priority** — these rules override any interactive-wait instructions in SKILL.md. The skill's workflow, quality standards, and technical specs remain fully effective — only skip interactive waits.