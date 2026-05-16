Build a 7-slide, 16:9 PowerPoint presentation titled "1,001 Real-World Gen AI Use Cases from Google Cloud Customers" for enterprise technology leaders and digital transformation executives evaluating generative AI adoption strategies. The tone should be data-forward, strategic, and industry-grounded.

The deck opens by establishing the scale of the report (1,001 use cases, 11 industries, 6 agent types), then traces the 10× growth trajectory from 101 to 1,001 use cases over 18 months. It introduces a taxonomy framework (industries × agent types), dives into Automotive & Logistics as a representative vertical, surfaces quantified ROI highlights, synthesizes cross-industry patterns, and closes with actionable strategic takeaways for enterprise leaders.

For the industry-and-agent taxonomy slide (slide 3), present a structured matrix or grid diagram mapping 11 industry verticals against 6 agent types. For the measurable ROI highlights slide (slide 5), use a KPI card or data callout layout featuring the specific metrics (500% ROI, 30% workload reduction, 10,000+ hours saved, 6,000+ headlines in 29 hours). The Automotive & Logistics deep-dive slide (slide 4) should use a table format organizing use cases by agent type with company names and outcomes.

Do not fabricate any data, statistics, company names, or outcomes not found in source_brief.md. All figures and examples must come directly from the provided brief.


## Data Sources

1. **Read `/app/benchmark/source_brief.md`**  for all the subject-matter text, data tables, statistics, and figure references you may use in the presentation.
2. **Read `/app/benchmark/task_input.json`**  for **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

## Output Requirements

Save the final PPT to `/app/output/final_deck.pptx`.

Only the correctly saved final file is needed — no additional explanation is required.

---

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Skip all confirmation/approval/user-input steps** — do not pause, ask questions, or wait for a reply. When encountering BLOCKING or "wait for user confirmation" instructions, make a professional judgment and proceed.
2. **Design decisions** — if `task_input.json` specifies fields such as `deck.tone` or `deck.audience`, use them to guide template, color palette, and style choices; otherwise, use your professional judgment.
3. **Do not deploy or share** — no deployment, PDF export, share links, or other post-delivery steps are needed.
4. **Priority** — these rules take precedence over any interactive-wait instructions in SKILL.md. The workflow, quality standards, and technical specifications in SKILL.md remain in effect; only interactive waits are skipped.
