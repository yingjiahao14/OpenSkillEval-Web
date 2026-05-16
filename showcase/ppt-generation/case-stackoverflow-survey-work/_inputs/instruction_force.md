
Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Build an 8-slide, 16:9 PowerPoint presentation on developer workforce and compensation trends from the 2024 Stack Overflow Survey, targeting engineering managers and HR leaders benchmarking compensation and hiring strategies.

The deck should open with a title slide establishing the survey's scale (65,437 respondents, 180+ countries), then progress through employment status and work-environment shifts, dive into salary benchmarks by role and programming language, cover company-size context and purchasing influence, and close with actionable takeaways for hiring and retention. The tone should be data-forward, analytical, and professional throughout.

**Visual requirements:**
- Slide 4 ("Salary by Developer Type") must include a horizontal bar chart showing median salary for the top 10 developer roles, referencing data from `figure_1.jpg`.
- Slide 5 ("Experience vs. Salary") must include a scatter plot with median salary on the y-axis and average years of experience on the x-axis, with developer types as data points. Reference `figure_2.jpg`.
- Slide 6 ("Salary by Language") must include a scatter plot of median salary vs. experience by programming language, referencing `figure_3.jpg`.

Do not fabricate any data points, percentages, or salary figures not found in `source_brief.md`. All statistics presented on slides must be traceable to the provided source material.

Save the final PowerPoint file to `/app/output/final_deck.pptx`.

Only the correctly saved final file is needed — no additional explanation is required.
---

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Follow the provided /app/skills skills first** — use the skills available under `/app/skills` as the primary guidance and workflow for completing the project.
2. **Skip all confirmation/approval/user-input steps** — do not pause, ask questions, or wait for a reply. When encountering BLOCKING or "wait for user confirmation" instructions, make a professional judgment and proceed.
3. **Design decisions** — if `task_input.json` specifies fields such as `deck.tone` or `deck.audience`, use them to guide template, color palette, and style choices; otherwise, use your professional judgment.
4. **Do not deploy or share** — no deployment, PDF export, share links, or other post-delivery steps are needed.
5. **Priority** — these rules take precedence over any interactive-wait instructions in SKILL.md. The workflow, quality standards, and technical specifications in SKILL.md remain in effect; only interactive waits are skipped.
