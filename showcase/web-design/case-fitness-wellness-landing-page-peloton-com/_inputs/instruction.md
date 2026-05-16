# WellStream Platform — Landing Page Build Instructions

## Overview

Build a 5-page marketing landing site for **WellStream Platform**, a SaaS data management solution for the energy industry. The site targets oil & gas operators, energy companies, and industrial asset managers — people who value reliability, security, and technical depth. The goal is to drive demo requests while educating visitors on platform capabilities.

## Visual Direction

The tone is **professional, modern, and dark**. Think deep navy/charcoal backgrounds (#0D1B2A, #1B2838) with electric blue or teal accents (#00B4D8, #0077B6) for CTAs and highlights. Use clean sans-serif typography (e.g., Inter or similar) with generous whitespace. Data visualizations and diagrams should feel polished and technical — not playful. The overall mood should evoke trust, precision, and industrial sophistication.

## Key Priorities

- **Interactive tabs are central to the experience.** The home page industry tabs, security page tabs (Security/SOC Compliance), and integration page tabs (ETL/APIs/Dashboards) must feel seamless. Prioritize smooth state-change behavior across all tabbed interfaces.
- **The platform overview page is content-heavy** — the accordion feature sections, circular stat indicators, implementation timeline with progress bars, and testimonial carousel all need careful layout attention. Don't let it feel cluttered.
- **The demo request form** is the primary conversion point. Make it prominent, clean, and ensure field validation works correctly.
- **The platform ecosystem diagram** on the home page and **data lifecycle diagram** on the platform overview page should be visually compelling — use styled HTML/CSS or SVG rather than placeholder images.
- **Navigation** must include a Platform dropdown (Overview, Security, Integration) and a persistent "Request A Demo" CTA button in the header across all pages.

## Responsive

Fully responsive across desktop, tablet, and mobile. The cookie consent banner should appear on the home page with Accept/Decline functionality.

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