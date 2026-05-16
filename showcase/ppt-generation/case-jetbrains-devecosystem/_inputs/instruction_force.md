Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Create a 16:9, 6-slide data analysis report PPT targeted at engineering leaders, CTOs, and developer experience teams evaluating technology strategy and hiring priorities.

This deck should present a clear narrative about how the programming language landscape is shifting, which languages developers love most, and how language choice maps to application domains. The narrative arc should move from "how usage is changing" -> "what developers actually prefer" -> "what to do about it."

Use the 6 slide titles provided in the `slides` array of `task_input.json` exactly as given, in order.
Slide 2 (Language Trends) must use a line chart or comparison table to show 2017-2024 usage data for at least the top 8 languages.
Slide 4 (Developer Satisfaction) should use a horizontal bar chart to display satisfaction scores for the top 10 languages.
Slide 5 (Domain Specialization) should use a heatmap or structured table showing which language leads each application domain.
Do not fabricate any data or statistics not found in source_brief.md.

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
