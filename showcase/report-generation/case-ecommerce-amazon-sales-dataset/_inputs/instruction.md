

# instruction.md

## Report Brief: Amazon Product Catalog Performance & Customer Sentiment Analysis

You are tasked with building a comprehensive analytics report examining 1,400+ Amazon products to uncover insights on pricing strategies, discount effectiveness, customer ratings, and category-level performance. The audience is **management** — product and category managers who need actionable, data-driven guidance on assortment curation, pricing adjustments, and promotional planning.

### Purpose & Decisions This Report Should Inform

This report should answer: Which categories and price segments are winning with customers? Are discounts actually driving higher satisfaction, or just eroding margin? Where are the biggest opportunities to improve catalog quality and customer engagement?

### Key Priorities

- **Pricing & Discount Strategy Analysis is the highest-value section.** Management specifically wants to understand whether deeper discounts correlate with better ratings or just higher review volume — quantify this relationship clearly with correlation metrics and visualizations.
- The **Executive Overview must be crisp and executive-friendly** — lead with headline KPIs (average rating, average discount percentage, high-rating product share) presented in a dashboard-style summary. Don't bury the lead.
- For **Category Performance**, focus on surfacing the best and worst performers by rating and engagement. Use clear ranking visuals — management should be able to identify problem categories at a glance.
- The **Strategic Recommendations** section must flow directly from the data. Every recommendation needs a supporting data point.

### Tone & Style

Analytical, data-forward, and actionable. Avoid filler. Use charts generously but ensure each one earns its place by supporting a specific insight.

### Critical Rule

**NO fabrication.** Every number, percentage, and trend in this report must come directly from `data.csv`. Do not invent statistics or assume values not present in the data.

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