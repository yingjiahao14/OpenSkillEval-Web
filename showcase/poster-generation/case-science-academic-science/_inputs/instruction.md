# instruction.md

## Overview

Create an academic conference poster for the IEEE Symposium on Security and Privacy (S&P) examining how CDN-based bot mitigation services protect scientific publishing platforms from automated threats. The audience is security researchers and practitioners who expect rigorous, data-driven presentations. The key takeaway: bot traffic is a massive and growing threat to academic publishers, and challenge-based verification pipelines can dramatically reduce scraping while maintaining near-perfect uptime and minimal friction for legitimate users.

## Key Priorities

- **Lead with the numbers.** The five key metrics are the centerpiece of this poster — particularly the **85% reduction in scraping attempts** and **99.97% uptime** stats, which should be the most visually dominant data points. Consider large, bold callout treatments for these.
- **The verification pipeline diagram matters.** The "Challenge-Based Verification Pipeline" section should include a clear, sequential flow visualization — this is the technical core that distinguishes the work. Give it prominent real estate.
- **The trade-offs section provides nuance.** Don't let it get lost — it shows intellectual honesty and is what elevates this from a vendor pitch to an academic contribution.

## Visual & Style Guidance

Adopt a clean, professional aesthetic befitting a top-tier security venue. Use a cool-toned palette — deep navy or charcoal backgrounds with white/light text, accented by a sharp highlight color (electric blue or teal) for key metrics and diagram elements. Typography should be modern and highly legible: a strong sans-serif for headings, with generous whitespace. The overall mood should feel authoritative and precise — think "security operations dashboard" rather than "marketing infographic." A1 portrait orientation means vertical flow: title → threat landscape → pipeline → outcomes → trade-offs.

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