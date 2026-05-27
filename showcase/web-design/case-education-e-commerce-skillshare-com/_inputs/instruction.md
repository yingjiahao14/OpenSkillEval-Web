# CreativeHub — Online Classes for Creatives

## Overview

Build a bold, modern landing page for **CreativeHub**, an online learning platform for creative professionals, hobbyists, and aspiring artists. The page should feel energetic and inspiring — like stepping into a vibrant creative studio. The goal is simple: get visitors excited about the platform and drive them to start a free trial.

## Vibe & Visual Direction

Think **Skillshare meets Dribbble** — playful yet polished. Use a vibrant color palette anchored by a deep navy or charcoal background in the hero with pops of coral/orange, electric green, or warm yellow as accent colors. Typography should be bold and contemporary — a chunky geometric sans-serif for headlines (like Plus Jakarta Sans or similar) paired with a clean body font. Generous whitespace, rounded corners on cards, and subtle hover animations will reinforce the modern, approachable feel.

## Key Priorities

- **Hero conversion flow**: The hero is the most critical section. It needs to immediately communicate the value prop and present two clear sign-up paths (Google and email). Make these CTAs impossible to miss. The category pills beneath should feel browsable and inviting.

- **Course category tabs**: The tabbed course grid is the core interactive experience. Switching between categories (Featured, Music, Drawing & Painting, etc.) should feel instant and smooth. Each course card needs a thumbnail, title, instructor name, student count, and duration — make them visually rich.

- **Teacher carousel**: The horizontal scrolling teacher section should feel tactile and explorable, with clear navigation affordances (arrows or scroll indicators).

- **FAQ accordion**: Clean expand/collapse behavior — only one item open at a time feels best here.

- **Stats section**: The platform numbers (425k+ members, 30k+ classes, etc.) should land with visual impact — large type, maybe a contrasting background band.

## Note

Refer to `task_input.json` for the full section list, data content, and interaction specs. The page is responsive, light mode only.

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