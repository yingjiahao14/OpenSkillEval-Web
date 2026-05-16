# Lichess Chess Game Analytics Report

## Overview

You are tasked with producing a comprehensive analytical report on over 20,000 Lichess chess games. The report — **"Lichess Chess Game Analytics: Patterns of Victory, Openings, and Player Dynamics"** — should give the reader a thorough, data-driven understanding of the factors that influence game outcomes on the platform: color advantage, rating dynamics, opening choices, time controls, and how these dimensions interact.

The target audience is **analysts** — people comfortable with statistics, charts, and detailed breakdowns. The tone should be **analytical, detailed, and data-forward**: lead with numbers, support claims with visualizations, and avoid vague generalizations. Every figure cited must come directly from `data.csv`.

## Key Priorities

- **The "White vs. Black: First-Move Advantage" section is the centerpiece.** Quantify white's edge precisely, break it down by rating bracket and time control, and make it visually compelling. This is the question every chess audience cares about most.
- **Rating Differential Impact** is the most analytically interesting KPI — go beyond a simple correlation number. Show how win probability shifts across different rating gaps, ideally with a binned chart.
- **Opening analysis** should focus on the top 10–15 openings by frequency. Don't try to cover every ECO code — depth over breadth. Highlight any openings where black actually outperforms white.
- Ensure the **Key Findings** section is a tight, actionable synthesis — not a repetition of prior sections. A coach or platform analyst should be able to read just that section and walk away informed.

## Data Integrity

**Absolutely no fabrication.** Every statistic, percentage, and trend must be derived from `data.csv`. If data is missing or ambiguous for a particular analysis, note the limitation rather than inventing numbers.

## Output

Deliver the final report as **`/app/output/final_report.html`**. Use clean, professional styling with embedded charts suitable for browser viewing.

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