# instruction.md

## Report Brief: Global Intentional Homicide Trends (1990–2023)

You are tasked with producing a comprehensive trend analysis report on global intentional homicide rates using UNODC data spanning over three decades. The audience is **policy analysts and public safety stakeholders** — people who need clear, evidence-based insights to inform decisions around crime prevention, resource allocation, and international cooperation. Write in a professional, analytical tone throughout.

### Purpose & Motivation

This report should answer a fundamental question: **Is the world becoming safer from intentional homicide, and for whom?** Policy analysts need to understand not just the global trajectory, but where disparities persist — across regions, between men and women, and across age groups. The findings should be actionable, pointing toward where interventions are most needed.

### Key Priorities

- **The global overview and trend trajectory are the backbone of this report.** Invest effort in clearly showing how homicide rates have evolved over time, with well-designed time-series visualizations.
- **Gender disparity deserves particular emphasis.** The male-to-female homicide rate ratio is a critical KPI — make sure it is prominently featured and contextualized.
- **The KPI summary must be executive-friendly** — consider a dashboard-style callout section at the top so a busy reader can grasp the headline numbers in seconds.
- **Country-level outliers matter.** Flag dramatic changes (both improvements and deteriorations) with clear visual cues so they stand out.
- **Data limitations are not an afterthought.** The dataset is an unbalanced panel with significant reporting gaps. Be transparent about this — it directly affects how findings should be interpreted.

### Critical Rule

**NO fabrication.** Every number, trend, and comparison in this report must be derived directly from `data.csv`. Do not invent statistics, impute missing values without disclosure, or cite external sources not provided.

### Output

Deliver the final report as **`/app/output/final_report.html`**. Use embedded visualizations and a clean, professional layout suitable for browser viewing. Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions.

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