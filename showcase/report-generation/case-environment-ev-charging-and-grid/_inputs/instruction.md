# instruction.md

# EV Charging Network Performance & Grid Optimization Report

## Overview

You are tasked with producing an analytical report on EV charging network operations for infrastructure managers and grid planners. The report should transform raw operational data into clear, actionable intelligence that helps leadership make decisions about capacity expansion, load balancing strategies, pricing adjustments, and renewable energy integration.

The audience is management-level — they need data-forward insights but presented with clarity. Lead with KPIs, support with well-chosen visualizations, and close each section with concrete takeaways.

## Key Priorities

- **Queue & Wait Time Analysis is critical.** Customer experience directly ties to wait times, and this is where operational pain points surface most visibly. Give this section strong visual treatment — heatmaps by time slot and location type work well here.
- **The Optimization Recommendations section must be genuinely actionable.** Don't just restate findings — synthesize across all prior sections and propose specific interventions (e.g., load shifting to off-peak windows, pricing incentives during high-renewable periods).
- **Renewable Energy Ratio deserves prominent placement** as a sustainability KPI. Show how it varies by weather condition and time slot to highlight when green charging is most achievable.
- **Segment everything meaningfully.** Location type (Urban/Highway/Suburban) and time slot are the two most important dimensions — make sure they appear consistently across sections so readers can compare patterns.

## Data Integrity

**Do NOT fabricate any numbers, statistics, or trends.** Every figure in the report must be derived directly from `data.csv`. If data is missing or ambiguous, note the limitation rather than inventing values.

## Output Format

Deliver the final report as `/app/output/final_report.html`. Use a clean, professional layout with a dashboard-style feel — embedded charts, a KPI summary banner near the top, and a navigable structure with section anchors. Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions.

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