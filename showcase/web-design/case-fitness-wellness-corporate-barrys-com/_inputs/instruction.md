# RedRoom Fitness — Corporate Website

## Overview

Build a 5-page dark, bold corporate website for **RedRoom Fitness**, a premium HIIT workout brand that combines treadmill running and strength training. The site targets fitness enthusiasts and health-conscious adults aged 20–45, aiming to drive in-studio class bookings, promote a digital on-demand platform, and convert newcomers through free trial offers.

## Visual Direction

This site should feel **intense, premium, and immersive** — think dark gym lighting with dramatic red accents. Use a near-black background (`#111` or similar) with **bold red** (`#E63946` or a deep crimson) as the primary accent color. White and light gray text for contrast. Typography should be strong and modern — a condensed, uppercase sans-serif (like Oswald or Bebas Neue) for headlines, paired with a clean body font (Inter, Helvetica Neue). Generous whitespace between sections, full-bleed imagery, and large CTAs that demand attention.

## Key Priorities

- **The homepage carousel and free-trial CTA** are critical conversion elements — the carousel must feel smooth and polished, and the trial CTA should be visually dominant.
- **The Workout page's Floor/Treadmill toggle** is the core interactive moment for educating visitors — make the content switch feel seamless and intuitive.
- **Instructor filtering by location** must work correctly across all listed cities; the grid should feel dynamic when filters change.
- **The FAQ accordion** should follow single-open behavior (collapsing others when one opens).
- **Newsletter validation** should provide clear inline feedback on email input.
- The **weekly schedule table** on the workout page needs to be scannable and well-structured — this is how users decide which day to attend.

Ensure all pages share a consistent nav bar and footer. The site must be fully responsive and dark-mode by default.

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