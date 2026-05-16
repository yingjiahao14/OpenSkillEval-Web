# instruction.md

## Report Brief: Biomedical Research Landscape 2024–2026

You are tasked with producing a comprehensive trend analysis report examining **126,832 biomedical research abstracts** indexed in PubMed from 2024 to early 2026. The audience is **research policy analysts and funding strategists** — people who need clear, data-driven insights to inform decisions about resource allocation, institutional strategy, and research prioritization.

### Purpose & Motivation

The biomedical research landscape is shifting rapidly. This report should give decision-makers a clear picture of *where* research output is growing, *what* topics are gaining momentum, and *how* publishing norms (especially open access) are evolving. Think of it as a strategic intelligence briefing — analytical in tone, grounded entirely in the data, and structured to surface actionable patterns.

### Key Priorities

- **Temporal trends are the backbone of this report.** The publication volume analysis over time is the most critical section — pay careful attention to the natural skew toward 2024 due to indexing lag and frame 2025–2026 data accordingly.
- **Emerging topic growth** deserves special emphasis. Don't just report what's popular — highlight what's *accelerating*. The month-over-month growth rate for fast-rising MeSH topics is a high-value KPI for this audience.
- **The Key Takeaways section must be executive-friendly** — concise, prioritized, and tied to strategic implications. This is what gets read first.
- Ensure the **Open Access Rate** trend is clearly visualized over time; this is a policy-sensitive metric.

### Data Integrity

**Do NOT fabricate any numbers, statistics, or findings.** Every figure, percentage, and trend cited in the report must be derived directly from `data.csv`. If data is missing or ambiguous, note the limitation rather than inventing values.

### Output Format

Deliver the final report as **`/app/output/final_report.html`**. Use a clean, professional layout with embedded visualizations suitable for browser viewing. Refer to `task_input.json` for the full specification of required sections, KPIs, and analysis dimensions.

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