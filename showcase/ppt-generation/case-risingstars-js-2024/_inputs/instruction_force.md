Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Build an 8-slide, 16:9 PowerPoint presentation titled "2024 JavaScript Rising Stars: Top Projects and Ecosystem Shifts" for frontend engineers and engineering managers tracking JavaScript ecosystem trends.

The deck should open by introducing the JavaScript Rising Stars methodology (GitHub stars added in 2024), then move into the overall top-10 rankings led by shadcn/ui. The middle slides deep-dive into shadcn/ui's trajectory, the frontend frameworks shakeup (htmx overtaking React), and ecosystem-specific breakdowns for React and Vue. The narrative closes by surfacing cross-cutting themes (AI tools, desktop apps, browser innovation) and distilling 4-5 actionable takeaways pointing toward 2025.

Visual requirements:
- **Slide 2 ("overall-top-10")**: Include a horizontal bar chart or ranked table showing the top 10 projects with their star counts, making the gap between shadcn/ui (+38k) and the rest visually clear.
- **Slide 4 ("frontend-frameworks")**: Use a bar chart comparing stars added for htmx (+16.8k), React (+14.2k), Svelte (+6.1k), Vue (+5.9k), and Angular (+3.5k).

Maintain a data-forward, technical, yet accessible tone throughout. Use the specific star counts and project details provided in the source brief for all data points. Do not fabricate data not found in source_brief.md.

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
