Build a 9-slide, 16:9 technical presentation on VAPO (Value-Model-Based RL for Advanced Reasoning) targeting ML researchers and RL practitioners, using a data-forward, analytical tone.

The narrative arc should open with the headline result (60.4 on AIME 2024, surpassing DAPO by 10+ points), then motivate why value-model-based RL matters for long chain-of-thought reasoning. The middle slides should present the three core challenges, the VAPO framework's integrated solutions, and a deep dive into Length-Adaptive GAE. The deck should then deliver the empirical evidence — main results, training efficiency curves, and ablation studies — before closing with key takeaways and implications for future reasoning model development.

For the main results slide (slide 6), include a bar chart comparing Vanilla PPO (5), DeepSeek-R1-Zero-Qwen-32B (47), DAPO (50), and VAPO (60) on AIME 2024, and reference figure_2.jpg for the training curve. For the ablation slide (slide 8), use a waterfall chart or clearly annotated table showing each component's contribution, highlighting that removing Value-Pretraining drops the score from 60 to 11. The framework overview slide (slide 4) should use a component diagram mapping each technique to the challenge it addresses.

Do not fabricate data not found in source_brief.md. All numbers, comparisons, and claims must come directly from the provided brief.


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