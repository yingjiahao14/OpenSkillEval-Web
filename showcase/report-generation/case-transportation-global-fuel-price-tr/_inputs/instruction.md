# instruction.md

## Report Brief: Global Crude Oil Price Trends (1970–2026)

You are tasked with producing a comprehensive trend analysis report on global crude oil prices spanning over five decades of monthly data. This report is intended for **analysts** working in energy markets, macroeconomic research, or commodity strategy. The tone should be analytical, data-forward, and professional — assume the reader is comfortable with statistical concepts and wants substantive insight, not surface-level summaries.

### Purpose & Context

The goal is to give the reader a thorough understanding of how crude oil prices have evolved from 1970 through 2026, surfacing the major structural shifts, price shocks, and long-term patterns that define the global energy landscape. The report should equip analysts to contextualize current and future market movements against historical precedent.

### Key Priorities

- **The long-term trend analysis is the backbone of this report.** The full time-series visualization should be prominent, well-annotated, and immediately convey the story of crude oil over 50+ years.
- **Decade-by-decade breakdown matters.** Comparing average prices, volatility, and defining events across decades is essential for structural insight.
- **Quantify volatility and shocks precisely.** Don't just name events — show the magnitude of price moves (month-over-month, year-over-year) and tie them to specific data points.
- **KPI calculations must be exact.** The CAGR, standard deviation, maximum monthly change, and overall price range should be computed directly from the data and presented clearly.

### Data Integrity

**NO fabrication.** Every number, statistic, and trend cited in the report must be derived from `data.csv`. Do not invent or assume data points. If something cannot be determined from the dataset, state that explicitly.

### Output

Deliver the final report as **`/app/output/final_report.html`**. Use clean, professional styling with embedded charts suitable for browser viewing. Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions.

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