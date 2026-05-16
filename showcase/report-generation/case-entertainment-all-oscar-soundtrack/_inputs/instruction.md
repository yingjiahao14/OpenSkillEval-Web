# instruction.md

## Report Brief: Nine Decades of Oscar-Winning Scores

You are tasked with producing a historical trend analysis of every Academy Award Best Original Score winner from 1934 through 2026. The audience is an entertainment industry analyst or film music historian — someone who values rigorous data interpretation layered with narrative context. The tone should be analytical and data-forward, but not dry; weave the numbers into a compelling story about how film music's highest honor has evolved over nine decades.

### Purpose & Motivation

This report should give the reader a clear, evidence-based understanding of **who** has dominated the Oscar scoring landscape, **how** winning styles and composer profiles have shifted across eras, and **what patterns or anomalies** stand out. It should be the kind of document an industry strategist could reference when contextualizing current trends or a historian could cite for factual accuracy.

### Key Priorities

- **Temporal patterns and era analysis are the heart of this report.** The decade-by-decade breakdown and era-based characterization should receive the most analytical depth and the strongest visualizations. Show how composer dominance concentrates or disperses over time.
- **The top-composers ranking** should be visually prominent and immediately scannable — think of it as the anchor stat that draws the reader in.
- **KPI callouts** (total unique composers, maximum wins by a single composer, repeat winner rate, decade with most unique winners) should appear early and be presented in a polished, executive-friendly summary — clean cards or a highlight box, not buried in paragraphs.
- **Absolutely no fabrication.** Every number, name, and year must come directly from `data.csv`. If something cannot be determined from the data, say so — do not guess.

### Output Format

Deliver the final report as `/app/output/final_report.html`. An interactive HTML format suits this audience and report type — it allows embedded charts, clean typography, and easy sharing.

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