

# IPL 2026 Ball-by-Ball Analytics Report — Instructions

## Overview

You are tasked with producing a comprehensive ball-by-ball analytics report for the IPL 2026 season. This report targets **cricket analysts and team strategists** who need granular, delivery-level insights to inform tactical decisions and fantasy cricket predictions. The tone should be analytical, detailed, and data-forward — lead with numbers, support with visuals, and let the data tell the story.

## Purpose & Audience

The audience expects depth, not summaries. They want to see scoring patterns broken down by match phase (powerplay, middle overs, death overs), bowler effectiveness metrics with proper context, and team-level comparisons that reveal competitive edges. This report should be something an analyst can reference during auction strategy meetings or pre-match tactical briefings.

## Key Priorities

- **Batting and bowling analysis are the core of this report.** Invest the most effort here — top run-scorers with strike rates, boundary frequency, bowler economy and dot-ball pressure, dismissal type breakdowns. These sections should feature rich visualizations (bar charts, heatmaps, phase-wise breakdowns).
- **The five KPIs** (Average Runs Per Over, Boundary Percentage, Dot Ball Percentage, Extras Per Match, Wickets Per Match) should be presented prominently near the top of the report as a dashboard-style summary with clear, well-formatted numbers.
- **Venue insights matter** — analysts want to know which grounds favor batting vs. bowling and how chasing vs. setting targets plays out. Don't treat this as an afterthought.
- **Extras discipline** is a differentiator between well-coached and sloppy bowling units. Highlight teams and bowlers with the worst discipline.

## Critical Rule

**NO fabrication.** Every number, ranking, and insight must be derived directly from `data.csv`. Do not invent statistics, player names, or match results.

## Output

Deliver the final report as `/app/output/final_report.html`. Refer to `task_input.json` for the full specification of sections, KPIs, and analysis dimensions.

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