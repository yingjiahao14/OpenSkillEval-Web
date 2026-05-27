# instruction.md

## Report Brief: Nike Inc. (NKE) Historical Stock Performance Analysis

You are tasked with producing a professional financial analysis report examining Nike's stock performance over a 26-year period (2000–2026). The audience is **investors** — people making capital allocation decisions — so the tone must be analytical, data-forward, and professional. Every number in this report must come directly from `data.csv`. **Do not fabricate, estimate, or hallucinate any figures.**

### Purpose & Decision Context

This report should help long-term investors understand Nike's historical risk-return profile. It should answer questions like: *Was Nike a strong compounder? When were the worst drawdowns? How has volatility evolved?* The reader should walk away with a clear picture of what holding NKE over various horizons actually looked like.

### Key Priorities

- **The Long-Term Price Trend Analysis is the centerpiece** of this report. Invest the most analytical depth here — identify structural bull/bear phases, all-time highs and lows, and inflection points. Use clear time-series visualizations.
- **The KPI summary (Cumulative Return, CAGR, Maximum Drawdown, Annualized Volatility)** must be presented in an executive-friendly format near the top — think a dashboard-style summary card or table that an investor can scan in seconds.
- **Volume analysis should be tied to price context** — don't just show volume in isolation; correlate spikes with what was happening in the stock price.
- Visualizations are essential. Use well-labeled charts with consistent styling appropriate for a financial audience (clean, muted color palette, clear axes).

### Output Format

Deliver the final report as **`/app/output/final_report.html`**. HTML is the right format here — it allows interactive-feeling charts, embedded visuals, and a polished layout suitable for investor-facing materials.

Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions. Do not duplicate that structure here — use it as your detailed blueprint.

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