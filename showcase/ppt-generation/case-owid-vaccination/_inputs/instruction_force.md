Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Build an 8-slide, 16:9 PowerPoint presentation titled "The Power of Vaccination: From Smallpox Eradication to COVID-19 in Record Time" for public health professionals and policy analysts. The tone should be data-forward, authoritative, and accessible.

The narrative arc begins with the accelerating pace of vaccine development over two centuries, moves through dramatic evidence of disease elimination and reduction in the US (including state-level measles data and the smallpox eradication story), explains the mechanism of herd immunity, then confronts remaining coverage gaps before closing with key takeaways and a call to action for global health systems.

For the "vaccine-timeline-acceleration" slide, use a horizontal bar chart showing the time span from pathogen identification to vaccine licensure for at least five diseases, with COVID-19's record timeline visually emphasized. For the "us-disease-elimination" slide, include a structured table comparing pre-vaccine annual case/death counts to current figures, clearly marking diseases with 100% reduction. The "measles-heatmap-states" slide should reference a heatmap-style visualization with annotated milestone years (1963, 1971, 1980). The "herd-immunity-mechanism" slide should include a simple diagram illustrating how population-level vaccination shields vulnerable individuals.

Do not fabricate data not found in source_brief.md. All statistics, percentages, and historical dates must be drawn directly from the provided brief.

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
