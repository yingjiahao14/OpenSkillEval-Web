

# instruction.md

## Air Jordan Sneaker Resale Market Analysis (2023–2026)

You are building a comprehensive market analysis report examining 5,000 Air Jordan secondary-market transactions. The purpose is to equip resale market analysts and sourcing strategists with data-driven insights into pricing dynamics, profit margins, inventory velocity, and channel performance — ultimately informing decisions about which models to source, where to sell them, and when.

**Target audience:** Analysts who are comfortable with data-heavy content. The tone should be analytical and detail-forward — lead with numbers, support with visuals, and keep narrative tight.

### Key Priorities

- **Channel performance and inventory velocity** deserve particular emphasis. Analysts need to understand not just *where* margins are highest, but *how fast* product moves on each platform — the interplay between margin and turnover speed is the core strategic tension in resale.
- **Condition impact analysis** is critical: quantify the price premium gap between Deadstock, VNDS, and Used conditions clearly, as this directly affects sourcing decisions.
- The **KPI summary** at the top of the report should be scannable and precise — think dashboard-style callouts for Average Profit Margin, Resale Premium Rate, Average Days in Inventory, and Resale-to-Retail Ratio. These four numbers set the stage for everything that follows.
- Temporal trends should surface any seasonality or momentum shifts that would inform timing strategies for buying and selling.

### Data Integrity Rule

**Do NOT fabricate any numbers, statistics, or findings.** Every figure in the report must be derived directly from `data.csv`. If data is missing or ambiguous, note the limitation rather than inventing values.

### Output Format

Deliver the final report as **`/app/output/final_report.html`**. Use a clean, professional layout with embedded charts and tables suitable for browser viewing.

Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions — do not duplicate that structure here, but ensure every requirement defined there is addressed in the final output.

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