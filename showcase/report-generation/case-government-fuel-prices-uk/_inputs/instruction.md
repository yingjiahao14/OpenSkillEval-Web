# instruction.md

## UK Retail Fuel Price Trend Analysis — February 2026

You are tasked with producing a professional data analysis report examining retail fuel pricing patterns across UK forecourts. This report will be read by **government policy analysts and energy economists** who need evidence-based insights into market competitiveness, pricing transparency, and retailer reporting behaviour. It should directly inform decisions around consumer protection policy and fuel market regulation.

### Context & Purpose

The UK government mandates open reporting of forecourt fuel prices. Your job is to analyse this dataset and surface meaningful patterns: How do prices vary across fuel types? Are consumers in some areas paying significantly more than others? How promptly are retailers updating their reported prices? These questions matter for assessing whether the market is functioning transparently and competitively.

### Key Priorities

- **Price distribution by fuel type is the centrepiece** of this report. Ensure the statistics (mean, median, spread) are clearly presented with supporting visualisations — box plots or violin plots work well here.
- **Price spread and competitiveness analysis** is the most policy-relevant section. Emphasise the IQR and max-min range to show whether consumers face meaningful price disparities.
- **Update freshness analysis** is critical for assessing data quality and retailer compliance. Calculate the lag between `source_updated_at` and `recorded_at` carefully and flag any concerning patterns.
- The **Key Findings** section must be executive-friendly — concise, numbered, and tied to policy implications.

### Data Integrity

**Absolutely no fabrication.** Every number, statistic, and claim in the report must be derived directly from `data.csv`. If data is missing or incomplete, note it transparently rather than filling gaps with assumptions.

### Output

Deliver the final report as **`/app/output/final_report.html`**. Use a clean, professional layout with an analytical tone. Embed all charts inline.

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