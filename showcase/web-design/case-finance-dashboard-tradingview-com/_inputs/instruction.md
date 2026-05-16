# ChartPulse — Track All Markets

## Overview

Build **ChartPulse**, a comprehensive financial dashboard platform designed for retail traders, investors, and financial analysts. Think of it as a TradingView-style experience: real-time market data, interactive charts, community-driven trading ideas, and broker comparisons — all in one place. The platform spans 5 pages and should feel like a serious, professional-grade tool that power users would trust with their trading decisions.

## Visual Direction

The design must be **dark-mode first** — deep charcoal/near-black backgrounds (#1a1a2e or similar), with vibrant accent colors: **green for gains, red for losses**, and a signature blue or teal for primary actions and branding. Use a clean sans-serif typeface (Inter, DM Sans, or similar). Dense information layout is expected — traders want data density, not whitespace. Mini sparkline charts, color-coded percentage badges, and compact tables are the visual language here.

## Key Priorities

- **The chart page is the crown jewel.** The candlestick chart workspace with its watchlist sidebar, toolbar, and financial detail panels must feel like a real trading terminal. The watchlist accordion interaction and timeframe toggles are critical to get right.
- **Data accuracy matters.** The market summary bars, stock prices, percentage changes, and financial metrics must match the source brief exactly — traders notice wrong numbers instantly.
- **Tab-driven interactivity is pervasive.** Nearly every page relies on tab switching to filter content (market categories, idea feeds, broker filters, trading sessions). These state changes must work smoothly.
- **Responsive design** is required, but prioritize the desktop experience — this is a data-heavy dashboard.

Refer to `task_input.json` for the full structural breakdown of all pages, sections, interactions, and data displays.

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