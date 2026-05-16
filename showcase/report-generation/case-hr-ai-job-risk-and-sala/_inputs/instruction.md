# instruction.md

# AI Impact on the Global Job Market: Trend Analysis Report

## Overview

You are tasked with producing a comprehensive trend analysis report examining how AI automation is reshaping the global job market from 2015 to 2035. The report covers automation risk, salary dynamics, skill demand, and job survival prospects across roles, countries, and experience levels. The target audience is **executive leadership and workforce strategists** — people who need clear, data-driven insights to make decisions about talent investment, reskilling programs, and strategic workforce planning. The tone should be professional, data-forward, and actionable throughout.

## Key Priorities

- **Trend analysis is the backbone of this report.** Every major KPI — AI risk scores, median salaries, job openings, skill demand — should be examined over time. Year-over-year movement matters more than static snapshots.
- **The Executive Overview must stand on its own.** An executive should be able to read only that section and walk away with the three to five most critical takeaways.
- **Salary × automation risk correlation** is a high-value insight. Make sure the Salary Trends section explicitly addresses how compensation relates to AI risk levels.
- **Strategic Recommendations must be grounded in the data.** Every recommendation should trace back to a specific finding — no generic advice.
- Visualizations should be clean, well-labeled, and designed for quick comprehension by non-technical readers. Use charts that highlight trends and comparisons effectively.

## Data Integrity

**Absolutely no fabrication.** Every number, percentage, and trend cited in the report must be derived directly from `data.csv`. If the data is insufficient to support a claim, note the limitation rather than inventing figures.

## Output

Deliver the final report as **`/app/output/final_report.html`**. Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions.

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