# WellSource — Health & Wellness Blog

## Overview

Build the homepage for **WellSource**, a trusted health and wellness media platform. Think WebMD meets a modern editorial blog — authoritative yet approachable. The audience is everyday consumers looking for reliable health information, so the design must immediately communicate **credibility and warmth** without feeling clinical or cold.

## Visual Direction

- **Color palette**: Use a calming, health-oriented scheme — soft teals/greens as primary, warm whites and light grays for backgrounds, with accents of coral or amber for CTAs. Avoid harsh reds or overly saturated colors.
- **Typography**: Clean, modern sans-serif (e.g., Inter, DM Sans, or similar) with strong hierarchy. Headlines should feel confident; body text should be highly readable at comfortable sizes.
- **Mood**: Professional but human. Generous whitespace, rounded corners on cards, subtle shadows. The page should feel like a well-organized magazine — content-rich without being overwhelming.

## Key Priorities

1. **Trust is everything.** The credibility stats ticker and trust pillars section are critical — these must feel prominent and polished. The scrolling ticker with stats like "130 medical reviewers" and "50 million monthly readers" should be eye-catching and smooth.

2. **The mega-menu navigation** is a core interaction. Each main nav item should expand a well-structured dropdown with subcategories. This is how users discover content — make it intuitive and visually clean.

3. **Recommended Reads tabs** are the primary interactive content discovery mechanism. The tab switching between categories (Top Reads, Fitness, Mental Well-Being, etc.) must feel snappy and seamless, updating the article grid below without page reload.

4. **Newsletter signup** should be visually compelling — this is a key conversion goal. Make the CTA section stand out with a contrasting background.

5. **Health topics carousel** should scroll smoothly with clear navigation arrows and attractive circular image cards.

Refer to `task_input.json` for the complete section list, all interaction specs, and detailed data content.

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