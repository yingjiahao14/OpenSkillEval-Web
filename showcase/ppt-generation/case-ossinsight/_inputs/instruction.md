Build an 8-slide, 16:9 PowerPoint presentation analyzing the top 20 trending GitHub repositories over the past 24 hours, targeting developer advocates, open-source community managers, and engineering leaders tracking AI tooling trends. The tone should be data-forward, analytical, and technically grounded.

The deck opens by establishing OSSInsight's credibility as a data source (10.6B+ GitHub events), then drills into the top trending repos ranked by score, examines language and category distributions, spotlights the emerging Claude Code ecosystem, compares community engagement metrics across repos, and closes with strategic takeaways on AI coding agent dominance.

For the "Top 5 Repos by Total Score" slide, use a horizontal bar chart or ranked table showing stars, forks, pushes, and PRs for each repo. For the "Language Distribution" slide, use a pie or donut chart reflecting the full breakdown (Python: 7, TypeScript: 4, HTML: 2, Rust: 2, Swift: 2, Shell: 1, Java: 1, Unspecified: 1). The "Category Breakdown" slide should use a stacked bar or treemap to visualize that ~70% of trending repos relate to AI coding assistance. The "Community Engagement" slide should use a scatter plot or grouped bar chart contrasting high- and low-engagement repos.

Do not fabricate any data not found in source_brief.md. All statistics, repo names, and metrics must come directly from the provided brief.


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