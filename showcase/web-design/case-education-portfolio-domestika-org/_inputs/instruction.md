# CreativeHub — Online Creative Learning Portfolio

## Overview

Build a 5-page portfolio-style website for **CreativeHub**, the largest online learning community for creative professionals. The site targets designers, illustrators, photographers, and hobbyists looking to level up their skills. The primary goal is to drive course enrollments and premium subscription sign-ups by showcasing an expansive catalog, vibrant community projects, and compelling membership benefits.

## Tone & Visual Direction

The brand is **bold, modern, and professional**. Think high-contrast layouts with generous whitespace, punchy accent colors (a vibrant teal or electric green paired with deep charcoal/near-black), and clean sans-serif typography (e.g., Inter, DM Sans, or similar). Course cards and project thumbnails should feel like a curated gallery — imagery is king here. Use subtle shadows, rounded corners on cards, and smooth hover states to convey polish. The overall mood should feel energizing and aspirational, like stepping into a creative studio.

## Key Priorities

1. **Carousels are the core experience.** The homepage alone has a hero specialization carousel and a course carousel. The Plus page has two more. These must feel smooth and functional with clear navigation arrows and responsive behavior. Get these right.

2. **The Plus pricing page is conversion-critical.** The yearly/monthly pricing toggle must display accurate numbers ($14.59/month yearly vs. $33.90/month), the savings badge, and credit details. The FAQ accordion needs to work cleanly. This page carries the subscription conversion weight.

3. **The courses page sidebar filtering** should feel intuitive — clicking a category visually updates the displayed courses. Even with placeholder data, the interaction pattern must be clear.

4. **The projects masonry gallery** should showcase community work beautifully with sort/filter controls that actually rearrange content.

5. **Responsive design is required** across all pages. Footer sections should collapse into accordions on mobile.

Refer to `task_input.json` for the full structural breakdown of every page, section, interaction, and data display requirement.

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