# Instruction

## Overview

Create an academic conference poster presenting a landmark 2024 *Nature* study on neural circuit mapping. The poster is intended for neuroscientists at a research conference or symposium and should communicate how large-scale connectomics has revealed new principles of brain circuit organization. The key message: this work represents a step-change in scale and precision—mapping ~125,000 neurons and ~54 million synaptic connections—yielding 37 novel circuit motifs and near-human-level automated classification accuracy.

## Emphasis & Priorities

- **The metrics are the centerpiece.** The headline numbers (~125,000 neurons, ~54 million synapses, 37 motifs, 94.2% accuracy) should be visually dominant and immediately scannable. Consider a dedicated metrics banner or callout strip.
- **Key Findings** is the most important content section—give it the most visual real estate and prominence.
- The methodology pipeline should feel clear and sequential (think: a concise visual flow from imaging → reconstruction → analysis), but keep it compact relative to findings.

## Visual & Style Guidance

- **Palette:** Deep navy or charcoal background with bright, high-contrast accent colors (electric blue, teal, warm gold) to evoke neural imaging aesthetics. White or light text for readability.
- **Mood:** Precise, authoritative, data-forward. Clean grid layout with generous whitespace—avoid clutter.
- **Typography:** Use a modern sans-serif for headings and a highly legible body font. Metric values should be large-weight numerals.
- **Layout feel:** A0 portrait with a clear top-down reading flow: title block → background → methods → findings → implications. The Nature 2024 citation should appear in the header area for immediate credibility.

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