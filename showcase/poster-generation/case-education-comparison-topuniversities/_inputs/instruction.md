# instruction.md

## Poster Brief: QS World University Rankings 2026

### Overview

Create a portrait-format data poster comparing the world's top universities according to the QS World University Rankings 2026. The audience is professionals and stakeholders who consume data reports — think institutional researchers, higher education administrators, and policy analysts. The poster should feel authoritative, clean, and immediately scannable.

### Key Message

The viewer should walk away understanding **which universities dominate globally** and **what criteria drive those rankings**. MIT at a perfect score of 100 is the headline — make that stat visually dominant.

### Priorities

- **The Top 10 table is the centerpiece.** It should command the most visual real estate and be the first thing the eye lands on. Rank, university name, score, and country should all be instantly readable.
- **The methodology breakdown matters.** Viewers need to understand *why* these universities rank where they do. A clear visualization of the six QS indicators and their weightings is essential — not buried or treated as fine print.
- **The five key metrics** (1,500+ universities, 105 countries, etc.) should appear as bold callout figures, likely near the top or in a dedicated banner, to establish scale and credibility immediately.

### Visual & Style Guidance

- **Palette:** Deep navy, white, and a gold or teal accent — evocative of academic prestige without being stuffy.
- **Typography:** Strong, modern sans-serif. Hierarchy is critical: big numbers, medium headers, compact body text.
- **Mood:** Data-forward and professional. Think *The Economist* meets a university annual report. Minimal decoration — let the data breathe.
- **Layout feel:** Structured grid with clear section separation. Avoid clutter; generous whitespace signals confidence in the data.

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