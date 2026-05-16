Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Create a 16:9, 6-slide data analysis report PPT targeted at AI engineering leads and product managers evaluating LLM providers.

The deck should open by framing the competitive landscape of frontier AI models as of April 2026, then walk through the three key evaluation axes -- intelligence, speed, and pricing -- with one data-rich slide each. The narrative arc should build toward the insight that no single model dominates all three dimensions, culminating in actionable guidance on how open-weight models are closing the gap and how teams should approach model selection based on their specific workload priorities.

Use the 6 slide titles provided in the `slides` array of `task_input.json` exactly as given, in order.
On the intelligence slide, include a bar chart or table reproducing the full 11-model ranking from the source brief. On the trade-offs slide, embed the scatter-plot image from `./assets/chart_intelligence_vs_output_tokens.jpg` to visualize the intelligence-throughput frontier.
Do not fabricate any data or statistics not found in source_brief.md.

Save the final PPT to `/app/output/final_deck.pptx`.

Only the correctly saved final file is needed --- no additional explanation is required.

---

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Follow the provided /app/skills skills first** — use the skills available under `/app/skills` as the primary guidance and workflow for completing the project.
2. **Skip all confirmation/approval/user-input steps** --- do not pause, ask questions, or wait for a reply.
3. **Design decisions** --- use `deck.tone` and `deck.audience` from task_input.json to guide style choices.
4. **Do not deploy or share** --- no deployment, PDF export, or share links needed.
5. **Priority** --- these rules override interactive-wait instructions in SKILL.md.
