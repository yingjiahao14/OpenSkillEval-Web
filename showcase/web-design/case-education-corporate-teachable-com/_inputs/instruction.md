# LearnForge — Corporate Website Instructions

## Overview

Build a 5-page corporate website for **LearnForge**, an all-in-one platform where creators build and sell online courses, coaching, digital downloads, and memberships. The site targets online educators, course creators, coaches, and businesses selling digital knowledge products. The primary conversion goal is **free-trial signups**.

## Visual Direction

Adopt a **modern, bold, professional** aesthetic. Use a vibrant primary color (electric blue or deep indigo) paired with energetic accents (coral or bright green) against clean white backgrounds. Typography should feel confident — a geometric sans-serif for headings (e.g., Inter or Plus Jakarta Sans) with generous sizing, and a readable body font. Use ample whitespace, rounded cards with subtle shadows, and smooth micro-animations on scroll. The overall mood should feel empowering and aspirational — creators should feel this platform will elevate their business.

## Key Priorities

- **Homepage is the conversion engine.** The hero section's tab-switching interaction (creator view vs. student view) is a signature moment — make it feel polished and immediate. The stats bar ($12B+, 120M+, 180 countries) should hit hard visually right below the hero.
- **Interactive elements are critical.** FAQ accordions appear on 4 of 5 pages, testimonial carousels on all 5, and the "Why Choose Us" tabbed feature section on the homepage — these must all function smoothly with vanilla JS.
- **Consistent navigation across all pages.** Every page shares a nav bar linking to all product pages (Online Courses, Digital Downloads, Memberships, Coaching) plus a prominent "Start Free Trial" CTA button.
- **Pricing overview on the homepage** should be clear and scannable — this is a key decision point for visitors.
- **Integrations sections** (Stripe, Zapier, Mailchimp, etc.) should use a clean logo grid to build trust through recognizable brands.

Refer to `task_input.json` for the complete section-by-section structure, all interaction definitions, and data display specifications for each page.

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