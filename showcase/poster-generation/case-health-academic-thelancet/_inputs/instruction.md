# instruction.md

## Poster Overview

Create an academic conference poster presenting a synthesis of evidence on AI in clinical decision-making — covering diagnostic performance, safety concerns, and the gap between research validation and real-world deployment. This poster is for **The Lancet Digital Health – AI in Clinical Medicine Symposium**, targeting clinicians, health informaticists, and policy researchers. The key takeaway: AI shows meaningful diagnostic accuracy gains over standard workflows, yet fewer than 5% of published models ever reach prospective validation, and bias assessment remains alarmingly rare.

## Key Priorities

- **The "<5% prospective validation rate" is the anchor statistic** — make it visually dominant. This single number encapsulates the implementation gap that is the poster's central argument.
- The contrast between **87.5% AI sensitivity vs. 78.2% clinician-only sensitivity** should be immediately scannable, ideally as a paired visual comparison (e.g., side-by-side bars or a bold callout).
- The **"18% of studies reporting bias assessment"** metric should feel like a warning — it underscores the safety and equity narrative.

## Visual & Style Guidance

Adopt a clean, data-forward academic aesthetic. Think Lancet-family typography: restrained serif or modern sans-serif headings, generous whitespace, and a muted professional palette — deep navy or slate as the primary color, accented with a clinical teal or muted gold for highlights. Avoid decorative flourishes; let the data breathe. Charts and callout numbers should carry the visual weight rather than imagery. Maintain a clear top-to-bottom reading flow appropriate for A0 portrait format, with a logical progression from background through findings to recommendations.

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