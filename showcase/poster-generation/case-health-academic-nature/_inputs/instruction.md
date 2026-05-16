# instruction.md

## Poster Brief: Large Language Models in Medicine

You're creating an A0 portrait academic poster for the **Medical AI & Digital Health Conference 2024**. The poster presents a comprehensive review of LLMs in medicine — their promise, their pitfalls, and what responsible adoption looks like. The audience is clinicians, health informaticists, and AI researchers who want a rigorous, evidence-based snapshot of the field.

### Key Message
LLMs show remarkable capability in medical contexts, but the gap between benchmark performance and safe clinical deployment is significant and demands a structured framework.

### Priorities
- **The four headline metrics are the visual anchors.** Give them prominent, scannable placement — especially the contrast between GPT-4's >90% USMLE score and the up to 30% hallucination rate. That tension is the story of the poster.
- The **"Risks, Limitations, and Ethical Concerns"** section should carry equal visual weight to the applications section. This is not a hype piece — the academic audience expects balanced treatment.
- The **framework for responsible deployment** should serve as a clear, actionable takeaway at the bottom of the poster.

### Visual & Style Guidance
- **Palette:** Cool, clinical tones — deep navy, white, and a muted teal or steel blue. Use a single warm accent (amber or coral) sparingly to flag risk-related data points.
- **Mood:** Authoritative and restrained. Think *NEJM* or *Nature Medicine* — clean typography, generous whitespace, no decorative flourishes.
- **Layout feel:** Structured columns with clear section hierarchy. Use horizontal rules or subtle background bands to separate sections. Data callouts should feel like dashboard cards — bold value, smaller label and context beneath.
- **Typography:** A modern sans-serif for headings, a highly legible serif or sans-serif for body text. Prioritize readability at poster scale.

Refer to `task_input.json` for the full section list, all metrics, and poster specifications.

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