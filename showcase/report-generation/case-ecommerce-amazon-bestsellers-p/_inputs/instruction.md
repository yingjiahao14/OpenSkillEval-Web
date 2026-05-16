# instruction.md

## Report Brief: Amazon Bestselling Books — Price vs. Rating Trend Analysis

You are tasked with producing a comprehensive trend analysis report examining the relationship between book pricing and customer ratings across a decade of Amazon bestseller data (2009–2019). This report is intended for **management-level readers** — people making strategic decisions about pricing, catalog curation, and genre investment. Write in an analytical, data-forward tone and ensure every insight leads toward actionable takeaways.

### Purpose & Motivation

The central question is straightforward: **Does price drive satisfaction, or is there a disconnect between what customers pay and how they rate bestselling books?** Management needs to understand how pricing and rating dynamics differ between Fiction and Non-Fiction, which price segments consistently land on the bestseller list, and whether these patterns have shifted meaningfully over the 2009–2019 window.

### Key Priorities

- **The year-over-year temporal trends section is the most critical piece.** Management wants to see inflection points — years where pricing strategy or customer sentiment visibly shifted. Make this section visually rich with clear trend lines.
- **The price-rating correlation analysis must include the Pearson correlation coefficient** and a scatter visualization. Don't just describe the relationship — quantify it precisely.
- **The genre comparison (Fiction vs. Non-Fiction) should be immediately scannable** — consider side-by-side visuals or a summary comparison table that a busy executive can absorb in seconds.
- Keep the strategic recommendations grounded in the data. No speculative advice — every recommendation must trace back to a specific finding.

### Data Integrity

**Absolutely no fabricated numbers.** Every statistic, average, count, and correlation in this report must be computed directly from `data.csv`. If the data doesn't support a claim, don't make it.

### Output

Deliver the final report as **`/app/output/final_report.html`**. Use clean, professional styling suitable for screen presentation to senior stakeholders.

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