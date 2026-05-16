Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Build a 9-slide, 16:9 PowerPoint presentation titled "Global Renewable Energy in 2025: How Far Have We Come?" for policy analysts and energy sector strategists reviewing global renewable energy trends.

The deck opens by establishing the urgency of the fossil fuel problem, then progresses through the current state of renewables in both primary energy and electricity generation. It highlights individual technology contributions—hydropower, wind, and solar—before addressing regional disparities in the energy transition. The narrative closes with key takeaways and a forward-looking call to accelerate the transition.

For the "electricity-mix-one-third-renewable" slide, include a small data table showing the renewable electricity share for 5–6 selected countries/regions (e.g., Brazil, Canada, Norway, China, India, Middle East). For the "wind-and-solar-fastest-growing" slide, include a comparison table of wind vs. solar growth metrics (e.g., generation growth since 2010, installed capacity). Use the referenced figure images (figure_1.jpg through figure_8.jpg) on their designated slides as specified in the brief.

Maintain a data-forward, analytical, and accessible tone throughout. Use clear slide titles that lead with key statistics or findings. Do not fabricate data not found in source_brief.md.

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
