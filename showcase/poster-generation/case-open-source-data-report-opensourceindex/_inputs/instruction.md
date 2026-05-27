# instruction.md

## Poster Brief: Open Source Contributor Index — March 2026

You're creating a portrait-format data report poster that presents the March 2026 Open Source Contributor Index — a monthly ranking of commercial organizations by their employees' open source contributions on GitHub. The audience is technical and data-literate (developers, engineering leaders, open source program managers), so the design should feel **modern, clean, and data-forward** — think Bloomberg terminal meets a polished infographic.

### Key Message

The poster should immediately communicate: **Google dominates open source contributions, the ecosystem is accelerating, and Python leads the language landscape.** The viewer should walk away understanding the competitive leaderboard, the growth trajectory, and the scale of the tracked ecosystem.

### Priorities

- **The Top 10 leaderboard table is the centerpiece.** Give it the most visual real estate and make it scannable — the ranked list with contributor counts and month-over-month deltas should be instantly readable.
- **Google's #1 position** deserves visual emphasis — the 548 active contributors with +128 MoM growth is the headline stat.
- **Growth momentum** should feel energetic — use upward-trending visual cues to reinforce that engagement is accelerating across the board.

### Visual & Style Guidance

- Use a **dark or deep navy background** with bright accent colors (electric blue, green for positive growth indicators) to convey a modern data-dashboard aesthetic.
- Typography should be **sans-serif, high-contrast**, with large bold numbers for key metrics.
- Use subtle gridlines or card-based layouts to organize sections cleanly. Avoid clutter — let whitespace breathe between data blocks.
- Growth deltas (MoM changes) should be highlighted in green with upward arrows or similar positive indicators.

Refer to `task_input.json` for the full list of sections, metrics, and poster specifications.

---

## Data Sources

1. Read `/app/benchmark/source_brief.md` for all content materials (text, data, key messages).
2. Read `/app/benchmark/task_input.json` for poster requirements, sections, metrics, and style definitions.

## Output Requirements

1. Output the final poster to `/app/output/final_poster.png`.
2. The poster must be a single self-contained image file.

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Skip all confirmation/approval/user-input steps** — do not pause, ask questions, or wait for a reply. When encountering BLOCKING or wait-for-user instructions, make a professional judgment and continue.
2. **Design decisions** — if `task_input.json` specifies `poster.tone`, `poster.audience`, etc., use them to choose templates, palettes, and styles. Otherwise, make professional judgments.
3. **Priority** — these rules override any interactive-wait instructions in SKILL.md. The skill's workflow, quality standards, and technical specs remain fully effective — only skip interactive waits.