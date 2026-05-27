Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Build an 8-slide, 16:9 analytical presentation titled "Measuring AI Ability to Complete Long Software Tasks: Time Horizon Doubling Every 7 Months" for AI safety researchers, frontier AI lab leadership, and policy analysts tracking autonomous AI capabilities.

The deck should open with the headline finding—50% task-completion time horizon doubling every ~7 months—then walk the audience through the metric methodology, the 170-task suite composition, and the exponential trend from GPT-2 (2 seconds) to o3 (~2 hours). It should then examine per-model success curves, the capability drivers behind the trend, forward extrapolations toward month-long task automation by 2028–2031, and close with safety governance takeaways.

**Visual requirements:**
- Slide 3 ("Task Suite Overview") must include a structured table listing the three task-suite sources (HCAST, RE-Bench, SWAA) with task counts and example tasks spanning 3 seconds to 8 hours.
- Slide 4 ("Exponential Trend") must feature a chart or chart-style visual depicting the 50% time horizon vs. model release date, clearly labeling the ~207-day doubling time, R²=0.97, and key model milestones (GPT-2, GPT-4, o3).

Use a data-forward, technical tone throughout. All figures referenced (figure_1.jpg, figure_2.jpg, figure_3.jpg) should be placed on their corresponding slides where available. Do not fabricate any data not found in source_brief.md.

Save the final presentation to `/app/output/final_deck.pptx`.

Only the correctly saved final file is needed — no additional explanation is required.
---

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Follow the provided /app/skills skills first** — use the skills available under `/app/skills` as the primary guidance and workflow for completing the project.
2. **Skip all confirmation/approval/user-input steps** — do not pause, ask questions, or wait for a reply. When encountering BLOCKING or "wait for user confirmation" instructions, make a professional judgment and proceed.
3. **Design decisions** — if `task_input.json` specifies fields such as `deck.tone` or `deck.audience`, use them to guide template, color palette, and style choices; otherwise, use your professional judgment.
4. **Do not deploy or share** — no deployment, PDF export, share links, or other post-delivery steps are needed.
5. **Priority** — these rules take precedence over any interactive-wait instructions in SKILL.md. The workflow, quality standards, and technical specifications in SKILL.md remain in effect; only interactive waits are skipped.
