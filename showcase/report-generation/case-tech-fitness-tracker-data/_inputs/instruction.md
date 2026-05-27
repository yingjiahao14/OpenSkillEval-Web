# Fitness Tracker User Health & Activity Analytics Report

## Overview

You are preparing a comprehensive health and activity analytics report for our **health analytics team**. The report draws on a synthetic cohort of fitness tracker users (2015–2025) and should surface patterns in daily activity, vitals, lifestyle indicators, and temporal trends. The audience is technical and data-literate — they want precise numbers, clear visualizations, and actionable takeaways that can directly inform **product feature development** and **user engagement strategies**.

## Priorities & Emphasis

- **Temporal Trends & Seasonal Patterns** is the highest-priority section. The team is especially interested in whether activity and wellness metrics show meaningful year-over-year shifts or seasonal cycles — this drives roadmap timing decisions. Invest extra effort in clear time-series visualizations here.
- The **Key Insights & Recommendations** section must be sharp and actionable. Don't just restate findings — connect them to concrete product or engagement implications.
- For KPIs, pay particular attention to **Workout Participation Rate** and **Average Daily Steps** — these are the engagement proxies the team tracks most closely. Segment them meaningfully (e.g., by gender, workout type, mood) rather than reporting only global averages.
- The tone should be **analytical and data-forward** — lead with numbers, support with charts, and avoid vague qualitative language.

## Data Integrity

**Do NOT fabricate any numbers, statistics, or findings.** Every figure in the report must be derived directly from `data.csv`. If a metric cannot be computed from the available data, state that explicitly rather than estimating.

## Output Format

Deliver the final report as **`/app/output/final_report.html`**. Use a clean, professional layout with a logical section hierarchy. Embed all charts and visualizations inline so the file is fully self-contained and viewable in any modern browser.

Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions — do not deviate from what is defined there.

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