Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Build an 8-slide, 16:9 technical presentation titled "DiaTool-DPO: Enhancing Tool-Augmented LLM Dialogue via Direct Preference Optimization" for ML researchers and NLP engineers working on tool-augmented LLMs and RLHF alignment.

The narrative arc should open by establishing the failure modes of SFT-only training for tool-augmented LLMs, then introduce the 5-state MDP formulation and three query types as the theoretical foundation. The middle slides should detail the automatic preference pair construction method and present benchmark results, culminating in key takeaways about deploying RL-based dialogue control in production systems.

For the slide on three query types (slide 4), include a compact table mapping each query type (Type 1, Type 2, Type 3) to its state trajectory and a brief example. For the benchmark results slide (slide 6), present a structured comparison table showing DiaTool-DPO-only, SFT-only, and SFT + DiaTool-DPO across models (Prop.-8B, Prop.-3.1B, LLaMA-3-8B) with metrics: Call, Completion, Slot, Relevance, Micro Avg, and Macro Avg. For the LLaMA-3-8B gains slide (slide 7), use a bar chart or clear before/after visual comparing Slot accuracy (0.639 → 0.917) and Relevance (0.826 → 0.913).

Do not fabricate data not found in source_brief.md. All figures, numbers, and claims must originate from the provided brief.

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
