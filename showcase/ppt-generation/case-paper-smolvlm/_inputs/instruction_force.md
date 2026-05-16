Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Build a 9-slide, 16:9 technical presentation titled "SmolVLM: Redefining Small and Efficient Multimodal Models" targeting ML researchers, on-device AI engineers, and graduate students working on efficient multimodal models.

The deck should open by framing the problem of deploying large VLMs on edge devices, then walk through SmolVLM's architectural innovations — compute allocation, pixel shuffle token compression, and context length scaling — supported by experimental findings. It should culminate with benchmark results showing competitive performance at sub-1GB RAM, real-world on-device deployment metrics, and close with actionable design principles for efficient multimodal models.

For the benchmark performance slide (slide 7), include a structured data table comparing SmolVLM 256M/500M/2.2B against baselines, showing average scores (44.0%, 51.0%, 59.8%) and RAM usage (0.8GB to 4.9GB). For the compute allocation slide (slide 4), use a bar chart or comparison visual showing how the 93M SigLIP-B/16 encoder outperforms the 428M SigLIP-SO400M for the smallest language models. The token compression slide (slide 5) should visually depict the pixel shuffle mechanism and its 16× token reduction at r=4.

Maintain a technical, data-forward, and concise tone throughout. Do not fabricate data not found in source_brief.md.

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
