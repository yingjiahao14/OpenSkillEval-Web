Build an 8-slide, 16:9 PowerPoint deck analyzing Scale SEAL Leaderboard results across 20+ AI benchmarks, targeting ML researchers, AI lab leadership, and engineering managers evaluating frontier model capabilities.

The deck opens by framing the breadth of Scale's benchmark suite across four capability domains (Agentic, Frontier, Safety, Multimodal), then dives into domain-by-domain performance rankings — highlighting GPT-5.4's dominance in agentic coding, Gemini's sweep of audio/vision benchmarks, and Claude's leadership in safety alignment. The narrative converges on a competitive landscape view showing no single lab wins everywhere, concluding that model specialization is the defining trend.

For the agentic coding slide (slide 3), use a grouped bar chart or structured table comparing top models across SWE Atlas and SWE-Bench Pro subtasks. For the lab competitive landscape slide (slide 7), create a heatmap-style matrix mapping each benchmark to the #1-ranked lab/model. The safety slide (slide 6) should use a contrasting visualization pairing Claude's near-ceiling MASK scores against very low Fortress scores to illustrate variance in alignment performance.

Maintain a data-forward, analytical, and comparative tone throughout. Use consistent color coding to distinguish labs (OpenAI, Google, Anthropic, and new entrants like Muse Spark).

Do not fabricate data not found in source_brief.md. All figures, model names, scores, and rankings must come directly from the provided brief.


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
