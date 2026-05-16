# instruction.md

## Poster Overview

Create an A0 portrait academic poster presenting a landmark finding in climate science: sclerosponge-based temperature proxies spanning 300 years reveal that global warming has already exceeded the Paris Agreement's 1.5 °C threshold — roughly 0.5 °C more than conventional instrumental records suggest. The audience is researchers at a major geoscience conference (AGU / Nature Climate Change Symposium), so the tone must be rigorous, data-forward, and visually authoritative.

## Key Priorities

- **The 300-year temperature reconstruction timeline is the visual centerpiece.** It should dominate the poster — a prominent chart showing the anomaly curve from ~1700 to present, with the 1.5 °C threshold line clearly marked and the crossing point highlighted. This single graphic must tell the story at a glance.
- **The "hidden 0.5 °C" message must land immediately.** Make the contrast between the IPCC-reported ~1.2 °C (1850–1900 baseline) and the true pre-industrial total (>1.5 °C) visually unmistakable — consider a bold callout or side-by-side comparison.
- **Key metrics should be scannable** — use a compact stats strip or callout boxes so a passerby grasps the core numbers in seconds.

## Visual & Style Guidance

Use a cool-to-warm color palette (deep ocean blues transitioning to warming reds/ambers) to echo both the marine proxy source and the warming narrative. Typography should be clean and scientific — a strong sans-serif for headings, with generous whitespace. Avoid decorative elements; let the data and clear hierarchy convey authority. Subtle ocean or sponge imagery may anchor the background, but keep it restrained so charts remain legible.

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