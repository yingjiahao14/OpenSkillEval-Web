# instruction.md

## Poster Brief: GitHub's Hottest Repos — AI Agents Dominate

### Overview

Create a portrait data-report poster that showcases the top 20 trending GitHub repositories over the past 24 hours, with a clear narrative: **AI agents and developer tooling projects overwhelmingly dominate open-source momentum right now**. The audience is data-literate developers and tech professionals who appreciate clean, metric-rich visuals.

### Key Message & Priorities

The poster should hit the viewer with scale first — **10.6 billion+ GitHub events tracked** — then funnel attention into the ranked table of trending repos, which is the **centerpiece** of the design. Make the stat "14 out of 20 (70%) repos are AI/agent-related" visually dominant; this is the headline insight that ties everything together.

The top-20 table needs to be scannable at a glance — stars, forks, and language should be immediately readable. Don't let it feel like a spreadsheet; use subtle visual hierarchy and accent colors to distinguish AI-related repos from others.

### Visual & Style Guidance

- **Tone:** Data-forward, modern — think dark or deep navy background with bright accent colors (electric blue, vibrant green, warm amber for highlights).
- **Typography:** Clean sans-serif; large bold numerals for hero metrics, monospace touches for repo names.
- **Layout feel:** Structured grid with generous whitespace. Metrics as bold callout cards at the top, table in the middle, thematic synthesis and language breakdown as compact visual modules below.
- **Mood:** Authoritative but energetic — this is a live pulse of the open-source world.

Refer to `task_input.json` for the full section breakdown, all metrics, and detailed content requirements.

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