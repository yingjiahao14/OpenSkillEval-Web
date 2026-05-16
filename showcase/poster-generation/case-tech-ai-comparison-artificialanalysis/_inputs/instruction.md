# instruction.md

## Poster Overview

Create a data-forward comparison poster showcasing the top 10 frontier AI language models across three dimensions: intelligence, speed, and cost. The poster is based on the Artificial Analysis Intelligence Index v4.0 and targets a technically literate audience making model-selection decisions. The key takeaway: **there is no single "best" model — the right choice depends on which dimension matters most, and the price gap is a staggering 33×.**

## Key Priorities

- **The trade-off analysis is the hero.** The section synthesizing intelligence, speed, and cost should be the visual centerpiece — consider a bubble chart or scatter plot where all three dimensions are visible at once. This is what makes the poster more than three separate lists.
- **Lead with the big numbers.** The tied intelligence leaders at 57, the 206 tokens/sec speed champion, and the dramatic $0.30 → $10.00 price range (33× factor) should be immediately scannable as bold callout stats near the top.
- **Speed ≠ Intelligence.** Make sure the speed comparison section visually communicates that the fastest model isn't the smartest — this counterintuitive insight is a key narrative hook.

## Visual & Style Guidance

Think dark-mode dashboard aesthetic — deep charcoal or near-black background with vibrant accent colors (electric blue, teal, warm amber) for data highlights. Use a clean sans-serif typeface. Charts should feel crisp and minimal, not cluttered. White/light text on dark backgrounds. The overall mood is authoritative, modern, and editorial — like a premium tech research report, not a slide deck. Give the data room to breathe; generous whitespace between sections.

The poster is A1 portrait — use the vertical space to stack sections clearly with strong horizontal dividers or subtle background bands to separate them.

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