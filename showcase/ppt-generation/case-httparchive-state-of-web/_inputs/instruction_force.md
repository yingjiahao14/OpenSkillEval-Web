Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Build an 8-slide, 16:9 PowerPoint presentation titled "State of the Web 2020–2025: HTTP Archive Trends in Page Weight, Protocols, and Security" for web performance engineers and front-end architects evaluating infrastructure trends.

The deck should open with a title slide establishing the HTTP Archive data source and time range, then progress through the growth in crawl sample size, rising page weight trends, request and connection efficiency metrics, near-universal HTTPS adoption, HTTP/2 vs. HTTP/3 protocol shifts, and font-display CSS adoption. Close with a key takeaways slide that synthesizes the five major findings and calls the audience to benchmark their own sites against these baselines. The tone throughout should be data-forward, analytical, and technical.

For the "Crawl Sample Size Tripled" slide, include a dual-line time-series chart showing desktop and mobile URL counts over time. For the "HTTPS Requests Reach 99%" slide, feature a prominent large stat callout (99%+) alongside a small time-series line showing the climb from ~80% to 99%. The "Requests and Connections" slide should use a split layout with a stat card for request counts and a declining line chart for TCP connections.

Do not fabricate any data points, percentages, or figures not found in source_brief.md. All metrics cited on slides must directly reference values provided in the brief.

Save the final PPT to `/app/output/final_deck.pptx`.

Only the correctly saved final file is needed — no additional explanation is required.
---

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Follow the provided /app/skills skills first** — use the skills available under `/app/skills` as the primary guidance and workflow for completing the project.
2. **Skip all confirmation/approval/user-input steps** — do not pause, ask questions, or wait for a reply. When encountering BLOCKING or "wait for user confirmation" instructions, make a professional judgment and proceed.
3. **Design decisions** — if `task_input.json` specifies fields such as `deck.tone` or `deck.audience`, use them to guide template, color palette, and style choices; otherwise, use your professional judgment.
4. **Do not deploy or share** — no deployment, PDF export, share links, or other post-delivery steps are needed.
5. **Priority** — these rules take precedence over any interactive-wait instructions in SKILL.md. The workflow, quality standards, and technical specifications in SKILL.md remain in effect; only interactive waits are skipped.
