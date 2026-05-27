Generate a single data visualization chart that effectively conveys the insight described in the goal (see `goal[]` in task_input.json). You must choose the most appropriate chart type and visual encoding to tell the story — the goal does not specify chart type.

**Quality requirements**:
- Include title, axis labels, legend, and units as appropriate
- Professional color scheme suitable for the target audience (see `style` field in task_input.json)
- All data must be traceable to source_data.json — do not fabricate data

Only the correctly saved final file is needed — no additional explanation is required.

---

## Data Sources

1. Read `/app/benchmark/task_input.json` for the visualization goal, style, and evaluation checkpoints.
2. Read `/app/benchmark/source_data.json` for the datasets to visualize.
3. Read `/app/benchmark/source_brief.md` for dataset documentation and field descriptions.

## Output Requirements

1. Output the final chart to `/app/output/result.png`.
2. The chart must be a single self-contained PNG image file.

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Skip all confirmation/approval/user-input steps** — do not pause, ask questions, or wait for a reply. When encountering BLOCKING or "wait for user confirmation" instructions, make a professional judgment and proceed.
2. **Design decisions** — if `task_input.json` specifies a `style` field, use it to guide color schemes, layout, and design choices; otherwise, use your professional judgment.
3. **Priority** — these rules take precedence over any interactive-wait instructions in SKILL.md. The workflow, quality standards, and technical specifications in SKILL.md remain in effect; only interactive waits are skipped.
