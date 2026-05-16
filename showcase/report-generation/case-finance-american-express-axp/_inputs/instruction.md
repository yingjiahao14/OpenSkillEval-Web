# instruction.md

## Report Brief: American Express (AXP) Historical Stock Performance Report

You are tasked with producing a comprehensive investor-grade financial report analyzing American Express (AXP) stock performance from 1972 through 2026, drawing on over 50 years of daily trading data.

**Purpose & Audience:** This report targets investors evaluating AXP's long-term risk-return profile. It should inform decisions about portfolio allocation, holding strategy, and dividend income expectations. Maintain a professional, analytical, data-forward tone throughout — let the numbers lead.

**Key Priorities:**

- The **Long-Term Price Trend Analysis** is the centerpiece of this report. Invest significant effort in identifying bull/bear phases, computing CAGR over the full period and meaningful sub-periods, and visualizing the multi-decade price trajectory clearly.
- The **KPI summary** (cumulative return, CAGR, max drawdown, annualized volatility, total dividends) must be presented prominently and in an executive-friendly format — consider a dashboard-style summary near the top of the report.
- The **Volatility & Risk Assessment** should clearly surface the worst drawdown episodes (e.g., 2008 financial crisis, COVID-19) with quantified impacts, not just narrative descriptions.
- The **Decade-by-Decade Comparison** should use consistent metrics across decades to enable direct comparison — tables and small-multiple charts work well here.

**Data Integrity:** Use ONLY the numbers from `data.csv`. Do NOT fabricate, estimate, or hallucinate any figures. If a value cannot be computed from the dataset, state that explicitly rather than inventing one.

**Output Format:** Deliver the final report as `/app/output/final_report.html`. Use clean, modern styling appropriate for a professional financial audience. Embed all charts and visualizations directly in the HTML file.

Refer to `task_input.json` for the complete specification of required sections, KPIs, and analysis dimensions.

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