Build an 8-slide, 16:9 technical presentation titled "KnowSelf: Teaching LLM Agents When to Think, Reflect, or Seek Knowledge" for ML researchers and graduate students interested in LLM-based agents and planning systems.

The deck should open by framing the problem of indiscriminate knowledge injection in current agent training, then introduce KnowSelf's three situational thinking modes (fast, slow, knowledgeable) and its full pipeline (data construction, two-stage training, self-aware inference). The middle slides should ground the framework with qualitative examples and empirical results on ALFWorld, emphasizing KnowSelf's efficiency advantage. Close with key takeaways and future directions.

For the ALFWorld results slide (slide 6), present a structured data table comparing KnowSelf against baselines (ReAct, Reflexion, ExpeL, ETO, KnowAgent, WKM) across backbone models and task types, including the Know% column. For the efficiency slide (slide 7), include a comparative bar chart or visual contrasting knowledge usage percentages (~15–26% vs. 100%) against overall accuracy scores across methods and model scales.

The three thinking modes slide (slide 3) should use a decision tree or flow diagram layout distinguishing fast thinking, slow thinking, and knowledgeable thinking with their decision criteria.

Maintain a technical, analytical, research-forward tone throughout. Do not fabricate data not found in source_brief.md.


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
