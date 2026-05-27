# Instruction: Malaria Global Burden & Progress Poster

## Overview

Create a large-format A1 portrait poster for public exhibition that tells the story of malaria — a preventable disease that still kills over half a million people per year, most of them young children, yet one that humanity has made extraordinary progress against. The poster should leave viewers both sobered by the scale of the crisis and inspired by the evidence that elimination is possible.

## Key Priorities

- **The "1,320 children every day" stat must be the single most visually dominant element.** This is the emotional anchor — make it impossible to miss. Pair it with a clear call-to-action framing.
- **The historical progress narrative is the intellectual hook.** The shrinking of malaria from ~50% to ~27% of the world's land surface should feel dramatic — consider a before/after map or bold comparative visual.
- **The death-toll trend (2000–2023)** showing decline, stalling, and COVID setback is the data centerpiece. Present it as a clear chart that rewards a closer look.

## Visual & Style Guidance

Tone is **data-forward but engaging** — think Our World in Data meets a museum exhibit panel. Use a dark, rich background (deep navy or charcoal) to evoke gravity, with warm accent colors (amber/gold for hope and progress, red for urgency/burden). Typography should be bold and modern with strong hierarchy. Infographic elements should feel clean and precise, not decorative. Leave breathing room — this is a public exhibition piece, not a cluttered dashboard.

The audience is the general public, so avoid jargon. Every number should have immediate context.

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