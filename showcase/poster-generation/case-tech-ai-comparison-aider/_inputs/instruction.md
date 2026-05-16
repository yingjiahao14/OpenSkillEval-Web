# instruction.md

## Poster Overview

Create a portrait-format data poster presenting the **Aider LLM Polyglot Coding Leaderboard 2025** — a benchmark comparison of 15 large language models ranked by their ability to autonomously write and edit code across six programming languages. The audience is technical and data-literate (think AI engineers, ML researchers, developer-tool evaluators), so prioritize clarity and information density over decoration.

## Key Message

**GPT-5 leads at 88.0% accuracy, but the real story is the cost-accuracy trade-off.** The poster should make it immediately obvious which models top the leaderboard while drawing the viewer's eye to the surprising value propositions — several models achieve strong accuracy at a fraction of the cost.

## Priorities

- **The ranked model table is the centerpiece.** The "Top Models by Accuracy" section should occupy the most visual real estate and be the first thing the eye lands on. Use clear horizontal bars or a clean data table with rank, model name, score, and cost.
- **The cost-vs-accuracy relationship is the second hook.** Whether as a scatter-style visualization or a highlighted comparison, make the trade-off tangible — the viewer should walk away remembering that near-top performance doesn't require top-dollar spend.
- **Hero metrics** (88.0% top score, 225 exercises, 6 languages) should anchor the top of the poster as bold, scannable callouts.

## Visual & Style Guidance

Adopt a **dark-background, modern tech aesthetic** — think deep navy or near-black with vibrant accent colors (electric blue, teal, warm amber for highlights). Use a clean sans-serif typeface. Color-code model families (OpenAI, Anthropic, Google, DeepSeek) consistently wherever they appear. Keep whitespace generous despite the data density; let the numbers breathe.

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