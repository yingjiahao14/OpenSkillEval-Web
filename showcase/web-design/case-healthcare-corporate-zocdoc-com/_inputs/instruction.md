# MedBook — Corporate Landing Page

## Overview

MedBook is an online healthcare appointment marketplace that connects patients with local doctors, dentists, and specialists. The single-page site should feel **modern, professional, and approachable** — think ZocDoc meets a friendly health brand. The target audience is everyday patients looking to quickly find and book a doctor, so clarity and ease-of-use are paramount. Every design choice should reduce friction and build trust.

## Visual & Style Direction

- **Color palette:** Use a clean, calming primary blue (think `#0066FF` or similar healthcare blue) paired with white backgrounds and light gray sections for contrast. Accent with a warm teal or green for CTAs and success states.
- **Typography:** A modern sans-serif like Inter or similar — large, confident headings with generous whitespace. Body text should be highly readable at 16px+.
- **Mood:** Bright, airy, optimistic. Use soft shadows, rounded corners on cards, and friendly iconography (line icons or simple filled icons for specialties). Avoid anything clinical or sterile — lean into the "playful" part of the tone with subtle micro-interactions and warm illustration-style visuals.

## Key Priorities

1. **The search bar is the hero experience.** It should be visually dominant, immediately communicating "type here to find a doctor." The autocomplete dropdown interaction must feel snappy and intuitive — this is the core conversion moment.
2. **Specialty cards** need to be scannable and inviting — use recognizable icons and clear labels so users can browse at a glance.
3. **Platform stats** should convey scale and trust without feeling like a wall of numbers. Make them visually punchy.
4. **Mobile responsiveness is critical** — the hamburger menu toggle and overall layout must work flawlessly on small screens since many patients search on their phones.

Refer to `task_input.json` for the full structural breakdown of sections, interactions, and data display requirements.

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