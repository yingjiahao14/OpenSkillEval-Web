# ScreenVault — Landing Page Build Instructions

## Overview

Build a single-page landing site for **ScreenVault**, a massive UI/UX design inspiration library (400,000+ screenshots). The audience is product designers and design teams who need fast reference material. The page must convert visitors into free or paid users by demonstrating the library's depth, powerful search, and workflow integrations.

## Tone & Visual Direction

Think **clean, contemporary SaaS** — generous whitespace, crisp typography, and a neutral palette (white/off-white backgrounds, near-black text, subtle grays). Use a single vibrant accent color (electric blue or violet) for CTAs and interactive highlights. Typography should feel premium: a geometric or grotesque sans-serif (Inter, General Sans, or similar). Rounded corners on cards and pills; soft shadows. The overall mood is *"polished design tool"* — the site itself should feel like something a designer would respect.

## Key Priorities

1. **Interactions are the core experience.** The animated stat counters, search tab switching, filter pills, and flows toggle must feel responsive and polished — these demonstrate the product's power. Use smooth transitions (200–300ms easing) and make sure tab/filter state changes are visually obvious.

2. **Testimonials & brand marquees** should create a sense of momentum — continuous, buttery-smooth horizontal scrolling that reinforces social proof without requiring user effort.

3. **Stats section** needs to land with impact. The counting animation should trigger on scroll-into-view and feel satisfying (ease-out, staggered start).

4. **Responsive design is non-negotiable.** The screenshot grids, filter pill rows, and multi-row testimonial carousels must gracefully adapt from desktop to mobile.

5. **Hero clarity** — the headline, one-liner, and dual CTAs ("Join for free" + "See our plans") must be immediately scannable above the fold.

Refer to `task_input.json` for the full section order, interaction specs, data values, and navigation definitions.

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