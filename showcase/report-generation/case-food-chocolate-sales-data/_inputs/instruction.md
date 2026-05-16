# Chocolate Retail Sales Performance Report — Instructions

## Overview

You are preparing a **Chocolate Retail Sales Performance Report** covering the 2023–2024 period. The audience is **retail management**, and the report should be professional, data-forward, and actionable. Its purpose is to give leadership a clear picture of where the business stands — what's driving revenue and profit, which stores and products are winning, whether discounts are actually helping, and how customer segments behave — so they can make informed strategic decisions for the upcoming fiscal year.

## Key Priorities

- **Sales Trends Over Time is the most critical section.** Management needs to see monthly and quarterly momentum clearly — use well-designed time-series charts that make seasonality and year-over-year growth (or decline) immediately obvious.
- **The Executive Summary must be executive-friendly.** Lead with the headline KPIs — Total Revenue, Total Profit, Average Profit Margin — in a visually prominent dashboard-style layout. Keep narrative tight; let the numbers speak.
- **Discount Impact & Profitability deserves careful treatment.** Don't just report averages — show how different discount levels correlate with margin erosion or volume uplift. This is where management expects actionable insight.
- **Customer Behavior & Loyalty** should surface whether loyalty members are meaningfully more valuable, broken out by demographics where the data supports it.

## Data Integrity

**Do NOT fabricate any numbers, statistics, or findings.** Every figure in the report must be derived directly from `data.csv`. If the data is insufficient to support a particular analysis, state that explicitly rather than inventing results.

## Output Format

Deliver the final report as **`/app/output/final_report.html`**. Use a clean, modern layout with a professional color palette appropriate for management-level reporting. All charts and visualizations must be embedded inline.

Refer to `task_input.json` for the complete specification of required sections, KPIs, and analysis dimensions — do not rely solely on this brief.

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