# instruction.md

## Poster Brief: The World's Most Valuable Companies in 2025

### Overview
Create a portrait-format data poster that presents a comparative snapshot of the world's top publicly traded companies by market capitalization. The audience is professional and data-literate — think investors, analysts, and business readers who expect clean, information-dense visuals. The key takeaway: a handful of U.S. tech giants command a staggering share of global market value, and the concentration at the top is extreme.

### Key Priorities
- **Lead with the headline stat**: NVIDIA at $4.82 trillion as the world's most valuable company should be visually dominant — this is the anchor number that draws the eye.
- **The Trillion-Dollar Club section is the centerpiece.** The gap between the top 5 and the rest of the top 20 should be immediately felt — consider a scaled bar chart or tiered visual that makes the disparity visceral.
- **Country dominance (15 of 20 are U.S.)** deserves a clear, compact visualization — it's a striking fact that reinforces the concentration narrative.
- **The "Putting It in Perspective" context** — top 10 holding ~$25.4T out of $142.9T total across nearly 11,000 companies — should land as a powerful closing insight.

### Visual & Style Guidance
Adopt a dark, sophisticated palette — deep navy or charcoal backgrounds with bright accent colors (electric blue, gold, or white) for data highlights. Typography should be modern and authoritative: large bold numerals for key metrics, clean sans-serif for labels. The mood is Bloomberg-terminal-meets-editorial — precise, polished, no decorative fluff. Use generous whitespace to let the data breathe despite the density.

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