
Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Build an 8-slide, 16:9 technical presentation titled **"SkillClaw: Collective Skill Evolution for Multi-User LLM Agent Ecosystems"** for ML researchers and AI systems engineers.

The deck should open by framing the problem of static, non-evolving agent skills, then introduce the SkillClaw closed-loop architecture and its agentic evolver pipeline. The middle slides should deepen understanding through cross-user trajectory aggregation and two concrete evolution case studies, before closing with three distinguishing takeaways and implications for continuously improving agent systems. Maintain a research-forward, concise tone throughout.

**Visual requirements:**
- **Slide 3 (architecture overview):** Include a diagram or structured visual depicting the four-stage closed loop — Evidence, Attribution, Evolution, Distribution — connecting multi-user interaction to shared skill evolution.
- **Slides 6 and 7 (case studies):** Each must contain a day-by-day evolution log **table** showing date, evolution attempt outcome (accepted/rejected), and brief rationale. The creative pipeline case should show 1 of 6 accepted; the git push case should show 3 of 6 accepted.

Do not fabricate data, statistics, or experimental results not found in `source_brief.md`. All content should be derived from the provided brief and slide specifications.


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
