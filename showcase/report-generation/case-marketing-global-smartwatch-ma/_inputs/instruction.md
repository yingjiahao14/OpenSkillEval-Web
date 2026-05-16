

# instruction.md

## Global Smartwatch Secondary Market Analysis — Q1 2026

You are building a data-driven market analysis report for **e-commerce strategy analysts** who make sourcing, pricing, and inventory decisions in the secondary smartwatch market. The report covers 3,600+ resale listings across Apple, Garmin, and Samsung and should surface actionable intelligence — not just descriptive statistics.

### Purpose & Audience

The reader needs to walk away understanding where value lives in the resale smartwatch market: which brands hold their price, where geographic arbitrage exists, how physical attributes like case size affect premiums, and whether partnering with power sellers is strategically sound. Every insight should connect to a decision the reader can act on.

### Key Priorities

- **Geographic Pricing Arbitrage is the highest-value section.** This is where real margin opportunities hide. Make sure country-level price comparisons are visually clear and easy to scan — a heatmap or diverging bar chart would work well.
- **Brand-level pricing analysis** should anchor the report early, establishing the baseline value retention story before diving into dimensions like geography and case size.
- **Power Seller Behavior** is often overlooked in market reports — give it proper depth. Quantify how concentrated the market is and whether high-volume sellers systematically underprice or overprice relative to the market.
- The **Strategic Recommendations** section must flow directly from the data. No generic advice — every recommendation should reference a specific finding.

### Tone & Format

Keep the tone analytical and data-forward. Lead with numbers, support with visuals, and close with implications. Avoid filler language.

**CRITICAL: Do not fabricate any numbers, statistics, or trends. Every figure in the report must be derived from `data.csv`.** Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions.

Deliver the final report as **`/app/output/final_report.html`**.

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