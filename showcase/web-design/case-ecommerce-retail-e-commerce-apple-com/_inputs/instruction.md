# Orchard — Premium Tech E-Commerce Store

## Overview

Build a 4-page e-commerce website for **Orchard**, a premium technology brand's official online store. Think Apple.com meets clean Scandinavian design — this site should feel effortlessly minimal yet information-rich. The audience is general consumers shopping for laptops, tablets, phones, and accessories. Every pixel should communicate trust, quality, and simplicity.

## Visual Direction

- **Palette:** White and light gray backgrounds (#f5f5f7 range), near-black text (#1d1d1f), blue accent links (#0066cc). Product tiles can use subtle warm or cool gradient backgrounds to differentiate product lines.
- **Typography:** Use a clean sans-serif system stack (SF Pro, Helvetica Neue, or similar). Large, bold headlines (40–56px on desktop), lightweight subheadings, and compact body text. Generous whitespace everywhere.
- **Layout:** Full-width sections stacked vertically. Product cards in horizontal scrollable carousels with visible left/right navigation arrows. Consistent card sizing within each carousel.

## Key Priorities

1. **Carousels are the core UX pattern.** Nearly every page relies on horizontal carousels — latest products, accessories, audio, models, savings. These must scroll smoothly, show navigation arrows, and feel responsive. Get these right first.
2. **Homepage product grid** — the large hero tiles (Phone, Laptop Neo, Tablet Pro, etc.) are the brand's visual centerpiece. Each tile needs a product image area, headline, tagline, and dual CTAs ("Learn more" / "Buy"). Make them visually striking.
3. **Entertainment tabs on the homepage** — the tab-switching interaction (streaming, fitness, gaming, music) should feel instant and polished.
4. **Pricing accuracy** — product prices and financing amounts appear throughout. Ensure they match the data in `source_brief.md` exactly.
5. **Category pages (laptops & tablets)** share a common structure with sticky horizontal section navigation that smooth-scrolls to anchors. This navigation pattern is essential for usability on long pages.
6. **Footer accordion** on mobile — footer sections should collapse/expand on smaller viewports.

All navigation links between pages must work as defined in the task input.

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