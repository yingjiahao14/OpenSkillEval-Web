# instruction.md

## Report Brief: Global Airbnb Cross-Market Analysis

You are tasked with building a comprehensive cross-market analytics report comparing Airbnb listings across 10 major global cities. The audience is **hospitality industry analysts and short-term rental market strategists** — people who make investment, market-entry, and regulatory benchmarking decisions. Write in an analytical, data-forward tone with actionable conclusions.

### Purpose

This report should answer a fundamental question: **How do Airbnb markets differ across the world's top tourist destinations?** The reader needs to walk away understanding which cities command premium pricing, where professional hosts dominate supply, how room-type mix signals commercialization, and where guest demand is strongest.

### Key Priorities

- **Pricing analysis is the centerpiece.** Cross-city price comparisons (median and average, by room type) should be visually prominent and easy to scan. Use clear charts that let the reader immediately spot the most and least expensive markets.
- **Professional host concentration** (hosts with 5+ listings) is a strategically critical metric — make sure it's calculated accurately and highlighted, as it directly informs regulatory and competitive dynamics.
- **The Key Takeaways section must be executive-friendly** — concise, numbered, and tied directly to the data. No vague generalizations.
- Guest demand proxies (reviews per month, review recency) matter, but treat them as supporting evidence rather than headline findings.

### Data Integrity

**Absolutely no fabrication.** Every number, percentage, and ranking in this report must be derived from `data.csv`. If data is missing or ambiguous for a city, say so — do not fill gaps with assumptions.

### Output

Deliver the final report as **`/app/output/final_report.html`**. Use a clean, professional layout with embedded visualizations. Refer to `task_input.json` for the full list of required sections, KPIs, and analysis dimensions.

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