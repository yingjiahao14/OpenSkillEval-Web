# instruction.md

## Poster Brief: IPCC AR6 Synthesis Report — Key Findings

### Overview

This poster distills the most critical findings from the IPCC Sixth Assessment Synthesis Report (2023) for presentation at a climate science conference. The audience is academic researchers and policymakers who are data-literate and expect rigorous, evidence-based communication. The core message: **climate change is unequivocal, accelerating, and the window for meaningful action is rapidly closing.**

### Key Priorities

- The **seven headline metrics** (temperature rise, CO₂ concentration, emissions, carbon budget, required reductions, sea level rise, and exposed population) should be the visual anchor of the poster — treat them as the centerpiece. The stat **"3.3–3.6 billion people exposed to severe climate hazards"** and the **"43% reduction by 2030"** figure should hit hardest.
- The narrative arc should flow from observed changes → projections → risks → solutions → urgency. Each section builds the case; the final "Narrowing Window" section should feel like a culmination, not an afterthought.
- Future projections across SSP scenarios deserve a clear visual treatment — think diverging pathway lines or a scenario comparison strip.

### Visual & Style Guidance

- **Palette:** Deep navy and slate backgrounds with warm-to-hot accent colors (amber, vermilion, deep red) to evoke warming severity. Use cool blues/teals sparingly for adaptation/solution elements.
- **Mood:** Authoritative, urgent but not alarmist. Clean academic typography — sans-serif headings, generous whitespace, structured grid.
- **Layout feel:** A0 portrait with a clear top-down hierarchy. Metric callouts should use large, bold numerals. Avoid clutter; let the data breathe.
- **Branding context:** Reference IPCC visual language — restrained, institutional, trustworthy.

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