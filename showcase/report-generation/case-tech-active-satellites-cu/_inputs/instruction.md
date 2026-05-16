# Active Satellites in Earth Orbit — 2026 Catalog Analysis

## Purpose & Audience

You are producing an analytical report on the **14,875 active satellites currently in Earth orbit**. The audience is a **space-industry analyst or policy advisor** who needs a clear, data-driven picture of today's orbital environment — who operates the most satellites, how crowded each orbital regime is, and how rapidly the population has grown. This report should inform decisions around spectrum allocation, orbital debris policy, and constellation licensing.

## Tone & Approach

Keep the tone **analytical, data-forward, and professional**. Lead with numbers, support with well-labeled charts, and avoid speculative commentary. Every figure in the report must come directly from `data.csv` — **absolutely no fabricated or placeholder statistics**.

## Key Priorities

- **Launch trend analysis is the most important section.** The recent acceleration in launch activity is the headline story; make sure the growth curve is visually compelling and clearly annotated.
- **The constellation breakdown matters almost as much.** Starlink's dominance reshapes the entire statistical picture — call out how a single operator skews totals, orbital-regime shares, and inclination distributions.
- **KPI summary must be executive-friendly.** Place the top-level KPIs (total count, LEO share, Starlink size, median inclination, post-2020 launches) in a prominent, scannable block near the top of the report so a busy reader gets the story in seconds.
- When classifying orbital regimes, use **MEAN_MOTION thresholds** and clearly state the cutoffs you apply.

## Data Integrity Rule

**NO fabrication.** Every number, percentage, and chart must be derived from `data.csv`. If a value cannot be computed from the data, omit it rather than guess.

## Output

Deliver the final report as **`/app/output/final_report.html`**. Use a clean, professional layout with embedded visualizations suitable for viewing in a modern browser.

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