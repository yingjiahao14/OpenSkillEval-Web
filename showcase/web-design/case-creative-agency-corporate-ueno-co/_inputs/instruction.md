# Volta Studio — Corporate Website

## Overview

Build a 5-page corporate website for **Volta Studio**, a boutique strategic design and innovation agency. The site targets enterprise brands and innovative companies seeking premium design partnerships. The overall feel should be **minimal, editorial, and warm** — think high-end design portfolio meets literary magazine. Every page should breathe; generous whitespace is essential.

## Visual & Style Direction

- **Color palette:** Off-white / warm cream background (#F5F2ED or similar), near-black text (#1A1A1A), with subtle warm accents. No harsh pure white or pure black.
- **Typography:** Use a refined serif for headlines (e.g., a display serif like Playfair Display or similar from Google Fonts) paired with a clean sans-serif for body text. Headlines should feel bold and editorial — oversized where appropriate.
- **Layout:** Asymmetric, magazine-inspired compositions. Generous margins and padding. Let content float in space.
- **Imagery:** Use solid color placeholder blocks (warm tones — terracotta, sage, sand) for the media showcase on the homepage. No stock photos.

## Key Priorities

1. **The client marquee animation** on the homepage is a signature interaction — three rows of client names scrolling continuously in alternating directions. This must feel smooth and polished, running on page load with no jank.

2. **The founder letter page (neweno.html)** is the emotional core of the site. Treat it as a long-form editorial piece — beautiful typographic hierarchy, comfortable reading width, and a personal, intimate tone.

3. **The contact page** should be dramatic — an oversized "Contact" heading that dominates the viewport, with minimal links beneath. Less is more.

4. **Mobile navigation** must include a hamburger toggle that opens a full-screen overlay menu. This is the only interactive UI component beyond the marquee.

5. **The clients grid** should render as a clean three-column layout with each client name as a bold heading and a brief description beneath.

Refer to `task_input.json` for exact page structures, section breakdowns, navigation routing, and data content. Refer to `source_brief.md` for all copy.

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