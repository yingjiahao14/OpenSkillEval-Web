# instruction.md

## Poster Brief: IMF World Economic Outlook Trends 2024–2026

You are creating an A0 portrait academic poster for the IMF-World Bank Annual Meetings Research Symposium. The poster synthesizes two years of IMF World Economic Outlook projections, telling the story of a global economy stuck in a narrow growth band (around 3.0–3.3%) while downside risks mount—from trade wars to geopolitical fractures to stubborn inflation.

### Key Message

The central takeaway is **persistent mediocrity with growing fragility**: global growth isn't collapsing, but it's not recovering either, and the risk balance is consistently tilted to the downside. Make this tension palpable visually.

### Priorities

- **The growth trajectory data should be the visual centerpiece.** A clear timeline or line chart showing the 3.0–3.3% band across eight WEO editions should anchor the poster and draw the eye immediately.
- **The "Tilted to the downside" risk finding** deserves prominent callout treatment—it's the one qualitative conclusion that persists across every edition reviewed.
- **The policy evolution section** is the narrative spine: show how IMF recommendations shifted from fiscal buffers → structural reforms → defense-spending trade-offs. A timeline or progression visual would work well here.

### Visual & Style Guidance

Adopt a restrained, institutional palette—think IMF blue (#002244 range) as the dominant color, with muted grays and a single warm accent (amber or burnt orange) reserved for risk/warning elements. Typography should be clean and authoritative (sans-serif headings, generous whitespace). Charts should feel like Economist or IMF publication quality—no decorative chartjunk. The overall mood: serious, data-rich, credible. This audience expects density but also clarity.

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