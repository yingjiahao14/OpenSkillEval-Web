# instruction.md

## Report Brief

You are tasked with producing a **trend analysis report** examining 11 years (2015–2025) of BIEK Computer Science 12th Class (HSC Part-2) past examination papers. The audience is **educators and curriculum planners** who need to understand how the exam has evolved — shifts in question types, volume changes year-over-year, and recurring topic patterns — so they can make informed decisions about curriculum alignment and exam preparation strategies.

## Purpose & Motivation

This report should answer a central question: *Has the BIEK Computer Science exam structure remained stable, or have meaningful shifts occurred that educators should respond to?* The findings should be concrete and data-driven, enabling teachers to prioritize topics and question formats that consistently appear, and helping curriculum planners spot gaps or over-represented areas.

## Key Priorities

- **Year-by-year distribution and question type trends are the heart of this report.** Dedicate the strongest analytical depth here — use clear visualizations (line charts, stacked bars) showing how MCQ, Short, and Long question counts shift across years.
- **Topic pattern analysis matters.** Perform keyword/frequency analysis on the question text column to surface recurring concepts. This is where educators extract the most actionable value.
- **The strategic insights section should feel practical**, not generic — tie recommendations directly to the data patterns you uncover.
- Maintain an **analytical, detailed, and educational tone** throughout.

## Critical Data Integrity Rule

**Do NOT fabricate any numbers, trends, or statistics.** Every figure, percentage, and claim must be derived exclusively from `data.csv`. If data is missing or ambiguous for certain years, say so explicitly in the conclusions.

## Output Format

Deliver the final report as **`/app/output/final_report.html`**. Use a clean, professional layout suitable for educators reviewing in a browser. Embed all charts and visualizations inline.

Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions.

---

## Data Sources

1. Read `/app/benchmark/source_brief.md` for dataset documentation and column descriptions.
2. Read `/app/benchmark/task_input.json` for report requirements, KPIs, and analysis dimensions.
3. Read `/app/benchmark/data.csv` as the primary dataset to analyze.

## Output Requirements

1. Output the final report to `/app/output/`. Use the filename and format specified in the instruction above.
2. All visualizations must be embedded in the report (inline SVG, base64 images, or chart libraries loaded via CDN).
3. The report must be self-contained — openable directly in a browser (if HTML) or readable as-is (if PDF).

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Skip all confirmation/approval/user-input steps** — do not pause, ask questions, or wait for a reply. When encountering BLOCKING or wait-for-user instructions, make a professional judgment and continue.
2. **Design decisions** — if `task_input.json` specifies `report.tone`, `report.audience`, etc., use them to choose color schemes, chart types, and layout styles. Otherwise, make professional judgments.
3. **Priority** — these rules override any interactive-wait instructions in SKILL.md. The skill's workflow, quality standards, and technical specs remain fully effective — only skip interactive waits.