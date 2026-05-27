

# instruction.md

## Student Performance Analytics Report — Bangladesh

You are tasked with producing a comprehensive analytics report examining the factors that influence student academic outcomes across districts in Bangladesh. The audience is **education policy analysts and school administrators** — people who need clear, data-backed insights to make funding, intervention, and resource-allocation decisions. Write in an analytical, data-forward tone and ensure every claim is grounded in the dataset.

### Purpose & Context

Bangladesh's education system faces significant disparities driven by geography, socio-economic status, and institutional differences. This report should surface those disparities with precision, quantify their magnitude, and translate findings into actionable policy recommendations. The ultimate question: **what levers most effectively improve student outcomes, and where should interventions be targeted?**

### Key Priorities

- **The Socio-Economic Impact section is the most critical analysis.** Policy analysts need to understand exactly how family income, parent education, and internet access relate to HSC results — use clear comparisons and effect sizes, not just correlations.
- **The KPI summary must be executive-friendly.** Present the five defined KPIs (Average HSC Result, Excellent Performance Rate, At-Risk Student Rate, GPA Progression Delta, Attendance-Performance Correlation) prominently at the top of the report with clear visual indicators.
- **Regional disparities matter.** District-level and school-type breakdowns should use maps or heatmaps where appropriate to make geographic patterns immediately visible.
- Pay close attention to the **GPA Progression Delta** — whether students are improving or declining between Previous GPA and HSC Result tells a powerful story about system effectiveness.

### Data Integrity

**Do NOT fabricate any numbers, statistics, or findings.** Every figure in the report must be computed directly from `data.csv`. If data is missing or insufficient for a particular analysis, state that explicitly rather than inventing values.

### Output

Deliver the final report as **`/app/output/final_report.html`** — a polished, self-contained HTML file with embedded visualizations suitable for browser viewing and sharing.

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