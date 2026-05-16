# Leap Studio — Creative Agency Landing Page

## Overview

Build a single-page dark-mode website for **Leap Studio**, a global creative agency positioning itself as a reinvention and experience partner for enterprise clients. The site must feel **bold, modern, and elegant** — think high-end design studio meets tech-forward consultancy. The audience is brand leaders and innovation teams at large organizations, so every pixel should communicate confidence, sophistication, and global scale.

## Visual Direction

- **Dark mode is the default and only mode.** Use a near-black background (#0A0A0A or similar) with crisp white typography and selective accent colors — think electric blue or warm amber for interactive highlights.
- **Typography:** Use a modern sans-serif (Inter, Neue Haas Grotesk, or similar). Hero headlines should be large and commanding; body text clean and readable against dark backgrounds.
- **Imagery:** Use placeholder images with muted, cinematic tones. Project cards and team photos should feel editorial.
- **Spacing:** Generous whitespace. Let sections breathe — this is a premium brand.

## Key Priorities

1. **The region-toggle team carousel is the most complex interaction.** Four region tabs (North America, Asia, Europe, Oceania) must filter team member cards, each showing a photo, quote, title, and office location. Get this right — it demonstrates the agency's global footprint.
2. **The hero carousel** sets the tone for the entire page. Transitions should feel smooth and intentional, cycling through featured content cards.
3. **Work showcase** — the horizontal-scrolling project cards are a core selling point. Each case study needs a strong visual thumbnail paired with its title.
4. **The language selector dropdown** and **cookie consent banner** are smaller but must function correctly as toggles.
5. **Responsive design is mandatory.** Carousels should adapt gracefully to mobile (swipe-friendly), and the navigation should collapse appropriately.

Refer to `task_input.json` for the full section order, all interaction definitions, data content, and navigation structure.

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