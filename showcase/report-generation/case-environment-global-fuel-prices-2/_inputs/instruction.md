# Instruction

## Overview

You are preparing a **Global Fuel Price Trends & Policy Impact Analysis (2020–2026)** for energy policy analysts. This report should give its audience a clear, data-driven understanding of how Brent Crude oil price movements translate into retail fuel costs across 84 countries — and where government interventions (subsidies, taxation) have succeeded or failed at shielding consumers from volatility.

The audience consists of professional policy analysts who will use this report to evaluate subsidy design, tax calibration, and price stabilization strategies. The tone must be **analytical, data-forward, and professional** — lead with numbers, support with visuals, and keep narrative concise.

## Key Priorities

- **Temporal trends and volatility analysis is the centerpiece.** Devote significant attention to how retail prices tracked Brent Crude over the period, especially during the COVID-19 demand shock and the 2022 energy crisis. Quantify the Brent-to-retail correlation clearly.
- **The subsidy and taxation section is the most policy-relevant.** Make the subsidy price dampening effect unmistakable — show how high-subsidy countries buffered (or didn't buffer) crude price swings compared to low-subsidy countries, segmented by income level.
- **Regional comparisons should be visually compelling.** Use charts that let the reader immediately see which regions pay the most and least, and how spreads have evolved year over year.
- **The Key Findings & Policy Implications section must be executive-friendly** — concise, numbered findings with clear takeaways a policymaker can act on.

## Data Integrity

**Do NOT fabricate any numbers.** Every statistic, average, correlation, and trend in the report must be derived directly from `data.csv`. If data is missing or ambiguous, note the limitation rather than inventing values.

## Output

Deliver the final report as `/app/output/final_report.html`. Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions.

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