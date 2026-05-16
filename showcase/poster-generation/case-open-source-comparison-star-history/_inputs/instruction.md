# instruction.md

## Poster Brief: Coding AI Leaderboard

You're creating a portrait-format social media poster that showcases the 20 fastest-rising open-source coding AI repositories on GitHub for the week of April 9–15, 2026. The audience is developers, tech enthusiasts, and AI community members scrolling social feeds — so the poster needs to be instantly scannable and visually compelling.

### Purpose & Key Message

The poster should communicate one thing fast: **which coding AI projects are exploding in popularity right now.** The dominant story is hermes-agent's massive +9,715 star lead, and the broader narrative is that agent frameworks and the Claude Code ecosystem are the hottest trends this week.

### Priorities

- **The full Top 20 ranking table is the centerpiece.** It should be clean, legible, and take up the most real estate. Think leaderboard energy — rank numbers, repo names, star counts, and movement indicators at a glance.
- **The four headline metrics (~48k total stars, 9 repos above 2k, 5 Claude-related repos, hermes-agent's +9,715) should sit prominently** near the top as bold stat callouts to hook attention before the viewer dives into the table.
- **The thematic clusters** (agent frameworks, Claude Code ecosystem, etc.) should be visually distinct — use color-coded tags or category labels so trends pop without requiring deep reading.

### Visual & Style Guidance

Go **dark mode** — deep charcoal or near-black background with vibrant accent colors (electric blue, green, amber) for data highlights. The tone is data-forward and modern: think GitHub's aesthetic crossed with a Bloomberg terminal. Use a monospace or geometric sans-serif font for numbers and rankings. Keep decorative elements minimal — let the data breathe. Star icons (⭐) or subtle GitHub-style iconography can reinforce the theme without cluttering.

---

## Data Sources

1. Read `/app/benchmark/source_brief.md` for all content materials (text, data, key messages).
2. Read `/app/benchmark/task_input.json` for poster requirements, sections, metrics, and style definitions.

## Output Requirements

1. Output the final poster to `/app/output/final_poster.png`.
2. The poster must be a single self-contained image file.

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Skip all confirmation/approval/user-input steps** — do not pause, ask questions, or wait for a reply. When encountering BLOCKING or wait-for-user instructions, make a professional judgment and continue.
2. **Design decisions** — if `task_input.json` specifies `poster.tone`, `poster.audience`, etc., use them to choose templates, palettes, and styles. Otherwise, make professional judgments.
3. **Priority** — these rules override any interactive-wait instructions in SKILL.md. The skill's workflow, quality standards, and technical specs remain fully effective — only skip interactive waits.