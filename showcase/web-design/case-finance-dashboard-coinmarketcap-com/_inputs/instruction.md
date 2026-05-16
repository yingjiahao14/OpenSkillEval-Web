# CoinTracker Pro — Cryptocurrency Market Dashboard

## Overview

Build **CoinTracker Pro**, a professional cryptocurrency market data dashboard that gives investors and traders an instant, comprehensive view of the entire crypto market. Think of it as a CoinMarketCap-style experience: dense with data, yet clean and scannable. The audience is crypto-savvy users who expect precision, speed, and familiar market data conventions.

## Vibe & Visual Direction

- **Tone:** Professional, modern, minimal — no flashy crypto gimmicks. Think Bloomberg terminal meets clean SaaS dashboard.
- **Color palette:** Light mode with a white/light gray background. Use deep navy or charcoal for text, green (#16c784) for positive price changes, red (#ea3943) for negative. Accent with a brand blue for interactive elements and links.
- **Typography:** A clean sans-serif (Inter, SF Pro, or similar). The table needs to be highly legible at small sizes — monospaced or tabular numerals for all financial figures.
- **Layout:** Full-width, content-dense. The rankings table is the hero — it should dominate the page and feel like a professional data tool.

## Key Priorities

1. **The crypto rankings table is everything.** It must display 100 rows with all specified columns (rank, name, price, percentage changes, market cap, volume, circulating supply, 7-day sparkline). Sorting, alignment, and number formatting must feel polished — right-align numbers, use proper comma separators, color-code percentage changes.

2. **Tab-based filtering is the core interaction.** The category tabs (Top, Trending, Watchlist, etc.) and network filter tabs (All Networks, BSC, Solana, etc.) must visibly switch state and update the table content. This is the primary interactive experience.

3. **Top bar metrics must feel authoritative.** The global market cap, Fear & Greed index, and other stats in the top bar set the tone — render them prominently with clear labels.

4. **Pagination and toggle controls** (Columns, Filters) need to work as functional UI elements, not just decoration.

Refer to `task_input.json` for the full section list, all interaction definitions, and exact data values.

---

## Data Sources

1. Read `/app/benchmark/source_brief.md` for all content materials (text, data).
2. Read `/app/benchmark/task_input.json` for structural requirements, data placement, and interaction definitions.

## Output Requirements

1. Output all files to `/app/output/`. `index.html` must be the main entry point.
2. All pages must be openable directly in a browser (no build step needed). Use relative paths for inter-page links.

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Skip all confirmation/approval/user-input steps** — make professional judgments autonomously. Do not pause, ask questions, or wait for replies.
2. **Design decisions** — if `task_input.json` specifies `site.tone`, `site.audience`, etc., use them to choose styles, layouts, and color schemes. Otherwise, make professional judgments.
3. **Priority** — these rules override any interactive-wait instructions in SKILL.md. The skill's workflow, quality standards, and technical specs remain fully effective — only skip interactive waits.