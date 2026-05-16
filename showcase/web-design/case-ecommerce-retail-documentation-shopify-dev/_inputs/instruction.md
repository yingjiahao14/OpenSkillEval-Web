# CommerceForge Dev Docs — Build Instructions

## Overview

Build a **developer documentation hub** for CommerceForge, an ecommerce platform's developer portal. The site guides developers through building apps, storefronts, and AI-powered shopping agents. Think of it as a polished, modern dev docs experience — clean, scannable, and confidence-inspiring. The audience is technical: full-stack developers, frontend engineers, and AI/ML practitioners who expect crisp code examples and fast navigation.

## Visual Direction

Adopt a **dark-mode-first** aesthetic with a deep navy/charcoal background (`#0d1117` range) and bright accent colors — electric green or cyan for CTAs and interactive highlights. Use a monospace font for code blocks and a clean sans-serif (Inter, system-ui) for body text. Cards should have subtle borders or glassmorphism effects against the dark canvas. Generous whitespace, tight typographic hierarchy, and restrained use of color keep the tone professional and minimal.

## Key Priorities

- **CLI Setup Section (Home):** This is the centerpiece interactive experience. The accordion + package manager tabs (npm/yarn/pnpm) must feel snappy and intuitive — only one accordion open at a time, tab switches update code snippets instantly. Get this right.
- **Product Cards (Home):** The three pillars — Apps, Storefronts, Agents — need to be visually distinct and immediately scannable. Each card should clearly route to its respective page.
- **Collapsible Sidebar (Apps & Agents pages):** Interior documentation pages need a left sidebar that collapses smoothly to maximize reading space. This is essential for the docs-style layout.
- **Responsive Design:** Every page must work seamlessly from mobile to widescreen. Sidebars should auto-collapse on small screens.
- **Dark mode is the default** — ensure all code blocks, cards, and text have proper contrast.

Refer to `task_input.json` for the full page structure, section lists, navigation map, interactions, and data display requirements.

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