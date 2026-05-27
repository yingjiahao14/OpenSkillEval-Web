# instruction.md

## Report Brief: Global Cost of Living Crisis Index 2026

You are tasked with producing an analytical report examining cost-of-living pressures across 80 major cities worldwide in 2026. The audience is **policy analysts and economic researchers** who need to understand which cities and regions face the most severe affordability crises — and why — so they can prioritize interventions. The tone should be analytical, data-forward, and professional throughout.

### Purpose and Context

This report should serve as a decision-support tool. A policy analyst reading it should walk away knowing: (1) where the crisis is most acute, (2) what structural factors — rent burden, inflation, oil exposure — are driving it, and (3) which cities and regions warrant urgent attention. Frame everything through that lens.

### Key Priorities

- **The Affordability and Rent Burden Analysis is the most critical section.** Housing cost as a share of income is the single most actionable metric for policymakers — give it depth, clear visuals, and city-level specificity.
- **Crisis Tier Profiling should be visually compelling.** Use charts that let the reader immediately distinguish what separates high-crisis cities from affluent ones. Average indicators per tier should be presented in a clean, comparative format.
- **The KPI summary must be executive-friendly.** Surface the five defined KPIs (e.g., Median Cost of Living Index, Purchasing Power Gap, High-Crisis City Count) prominently near the top so a time-pressed reader gets the headline picture in seconds.
- **Regional comparisons should highlight outliers**, not just averages. Where a city dramatically departs from its regional norm, call it out.

### Data Integrity

**Absolutely no fabrication.** Every number, ranking, and statistic in the report must be derived directly from `data.csv`. If the data doesn't support a claim, don't make it.

### Output

Deliver the final report as **`/app/output/final_report.html`**. Use a clean, professional layout with embedded visualizations suitable for browser viewing.

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