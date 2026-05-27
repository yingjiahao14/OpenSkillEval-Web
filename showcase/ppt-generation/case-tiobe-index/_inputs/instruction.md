Create a 16:9, 6-slide data analysis report PPT targeted at software engineering leads and technology strategists.

This deck should present a clear, data-backed picture of programming language popularity trends from the TIOBE Index. The narrative should flow from current rankings through dramatic movers, into historical context, and conclude with actionable implications for technology decisions.

Use the 6 slide titles provided in the `slides` array of `task_input.json` exactly as given, in order.
Slide 2 (Top 20 Rankings) must use a table or bar chart to display the full ranking data with year-over-year changes.
Slide 3 (Biggest Movers) should use a visual contrast between gainers and losers.
Do not fabricate any data or statistics not found in source_brief.md.


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
