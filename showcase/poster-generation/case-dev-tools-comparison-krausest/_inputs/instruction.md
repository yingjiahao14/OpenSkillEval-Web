# instruction.md

## Poster Brief: JS Framework Benchmark — 5 Years of Browser Performance Testing

### Overview & Purpose

This poster tells the story of the JS Framework Benchmark — a long-running, community-critical project that has tracked JavaScript framework performance across 60+ official runs from Chrome 55 to Chrome 146. The audience is technically literate developers and engineering leads browsing a data-report-style document. The key message: this benchmark is massive in scope, has evolved significantly in methodology, and **cross-version comparisons are dangerous** without understanding those changes.

### Key Priorities

- **The timeline is the centerpiece.** The Chrome 55 → 146 journey spanning ~8 years should dominate the poster visually — think of a horizontal or vertical timeline strip that anchors the layout and immediately communicates scale and longevity.
- **Make the "60+" runs stat and the Chrome version range visually dominant.** These hero numbers should be the first things a viewer's eye lands on.
- **The methodology change at Chrome 118** (switch to weighted geometric mean) deserves a clear visual callout — it's the single most important reason cross-version comparisons break down. Treat it as a "caution" moment on the timeline.

### Visual & Style Guidance

Lean into a **dark-mode, developer-tool aesthetic** — think deep navy or charcoal backgrounds with vibrant accent colors (electric blue, teal, amber for warnings). Typography should be clean and monospaced for data labels, paired with a modern sans-serif for headings. The overall mood is precise, credible, and contemporary — like a well-designed engineering dashboard, not a marketing flyer. Use subtle grid lines or dot patterns to reinforce the data-forward tone.

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