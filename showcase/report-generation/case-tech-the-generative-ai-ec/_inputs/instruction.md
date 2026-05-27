

# instruction.md

## Report Brief: Generative AI Competitive Landscape Analysis (Q1 2026)

You are tasked with producing a competitive analysis report examining user sentiment across the top five generative AI mobile applications — ChatGPT, Microsoft Copilot, Google Gemini, Perplexity, and Claude — based on 50,000 user reviews. This report is for the **product strategy team** and should be analytical, data-forward, and actionable. It will inform decisions around competitive positioning, feature prioritization, and user retention strategy.

### Context & Motivation

The generative AI market is intensely competitive, and app store reviews are one of the richest signals of real user experience. Leadership needs a clear picture of where each competitor excels and struggles — not just by star ratings, but through deeper text-based sentiment analysis and thematic breakdowns of complaints.

### Key Priorities

- **The Thematic Complaint Analysis is the highest-value section.** Understanding which competitors are bleeding users due to pricing frustrations versus accuracy/hallucination issues versus bugs gives us direct competitive intelligence. Make this section visually rich with comparative breakdowns.
- **Sentiment-Rating Divergence matters more than it seems.** Sarcasm and complex emotions in reviews distort simple star-rating averages. Quantify mismatch rates clearly per app — this is a differentiating insight most competitors ignore.
- **The Executive Overview must be crisp and decision-ready.** Lead with the three most important strategic takeaways. Assume readers will spend 60 seconds on this section before deciding whether to read further.
- Ensure all KPIs are computed directly and presented with appropriate precision. When comparing apps, use consistent visual encodings so differences are immediately apparent.

### Data Integrity

**Absolutely no fabrication.** Every number, percentage, and trend cited in the report must be derived from `data.csv`. If data is missing or ambiguous, note it transparently rather than inventing values.

### Output

Deliver the final report as **`/app/output/final_report.html`**. Use a clean, professional layout with embedded visualizations suitable for browser viewing and screen-sharing in strategy meetings.

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