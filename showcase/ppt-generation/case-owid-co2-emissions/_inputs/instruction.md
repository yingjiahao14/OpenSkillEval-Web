Build a 9-slide, 16:9 PowerPoint presentation titled "Global CO₂ Emissions: Who Emits, How Much, and What's Changing" for policy analysts, climate negotiators, and sustainability researchers. The tone should be data-forward, analytical, and accessible.

The deck opens with a title slide establishing scope (fossil fuels & industry, 1750–2024) and data attribution (Global Carbon Budget 2025 via Our World in Data). It then traces the narrative arc from historical emission growth, through the dramatic shift in regional shares, to today's country-level dominance by China — before pivoting to per capita inequalities that reframe responsibility. The final slides examine 2024 trends, the role of energy mix in driving differences, and close with key takeaways on shared but unequal responsibility.

For the "Global CO₂ Emissions Grew from 6 Bt in 1950 to Over 35 Bt Today" slide, use an area or line chart showing the long-run trajectory with annotated inflection points. For the "Per Capita Emissions Range from 0.1 t in Chad to ~14 t in the US and Canada" slide, use a horizontal bar chart highlighting the 150x gap between the lowest and highest emitting nations. Where charts are described in other slides (stacked area, treemap, multi-line, diverging bar, comparative bar), represent them visually or as clearly labeled placeholder chart descriptions.

Do not fabricate data not found in source_brief.md. All figures, percentages, and country-level values must come directly from the provided slide specifications.


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