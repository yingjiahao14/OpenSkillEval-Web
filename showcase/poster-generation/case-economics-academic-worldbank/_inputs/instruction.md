# Instruction: Global Economic Prospects Poster

## Overview

Create a professional, data-forward academic poster (A1 portrait) summarizing the World Bank's *Global Economic Prospects* report. The audience is policy professionals and economists who expect rigorous, clearly structured data presentation. The core message: the global economy has staged its strongest recovery in six decades, but this resilience is uneven—vulnerable economies are falling behind while trade tensions and policy uncertainty threaten the outlook.

## Key Priorities

- **The metrics are the visual centerpiece.** The headline figures—"Strongest recovery in 6 decades," "1.2 billion youth entering working age," and the World Bank 2030 targets (health, electricity, agriculture, women's capital, water)—should be immediately scannable and visually dominant. Use large, bold numerals with concise labels.
- **Emphasize the tension** between resilience and risk. The poster should visually convey a narrative arc: strong recovery → emerging risks → policy action → strategic priorities. Guide the viewer's eye through this progression.
- **The "Risks to the Outlook" section** deserves strong visual weight—trade tensions and tariff effects are the most policy-relevant takeaway for this audience.

## Visual & Style Guidance

- **Palette:** Institutional blues and teals with a warm accent (amber or gold) to highlight key statistics. Avoid anything flashy—think World Bank report aesthetic.
- **Typography:** Clean sans-serif. Hierarchy matters: title → section headers → metric callouts → body text should each be clearly distinct.
- **Layout feel:** Structured grid with generous whitespace. Data callout cards or icon-stat pairings for the metrics block. Subtle dividers between sections—no heavy borders.
- **Mood:** Authoritative, calm, evidence-based. This is a report distillation, not a marketing piece.

Refer to `task_input.json` for the full section list, all metrics, and detailed specifications.

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