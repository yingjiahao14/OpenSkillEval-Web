# instruction.md

## Gold Price Dynamics Report — Analyst Brief

You are tasked with producing a comprehensive trend and volatility analysis of gold prices spanning 2000–2025. The report targets **financial analysts** who need a data-forward, detailed understanding of gold's historical price behavior to inform macro-asset allocation and risk management decisions. The tone should be analytical and precise — lead with data, not narrative.

### Purpose & Motivation

Gold is a cornerstone macro asset. This report should give an analyst everything they need to understand how gold has behaved across market regimes: where it trended, when it was volatile, whether seasonal edges exist, and what its return distribution tells us about tail risk. The ultimate goal is actionable insight for portfolio construction.

### Key Priorities

- **Volatility regime detection is critical.** Identifying distinct low-vol, high-vol, and crisis periods — and visualizing them clearly — is the highest-value analysis in this report. Spend extra effort here.
- **The KPI summary must be prominent and precise.** Annualized return, annualized volatility, maximum drawdown, and the Sharpe-like ratio should appear early in the report in a clean, scannable format.
- **Seasonal patterns need statistical rigor.** Don't just show averages by month — quantify whether observed differences are meaningful or noise.
- **Visualizations matter.** Use time-series charts, heatmaps, distribution plots, and regime overlays as appropriate. Every chart should have clear labels and serve a specific analytical purpose.

### Data Integrity Rule

**NO fabrication.** Every number, statistic, and chart in this report must be derived exclusively from `data.csv`. Do not invent figures, hallucinate data points, or assume values not present in the dataset.

### Output Format

Deliver the final report as **`/app/output/final_report.html`**. HTML is the right format here — it supports interactive-quality visualizations and is standard for analyst-facing deliverables.

Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions. Do not duplicate that structure here — use it directly.

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