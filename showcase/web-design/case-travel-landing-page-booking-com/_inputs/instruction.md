# StayQuest — Travel Landing Page

## Overview

StayQuest is a comprehensive travel booking platform targeting both leisure and business travelers worldwide. Think of it as a confident, trustworthy travel companion — the kind of site that makes you want to start planning your next trip the moment you land on it. The tone should feel **professional yet warm**, modern without being cold, and inviting across every page.

## Audience & Purpose

Your users are deal-hunters, weekend warriors, family vacation planners, and business travelers. They need to quickly search, compare, and feel confident booking accommodations, flights, car rentals, and experiences. Every design decision should reduce friction and build trust.

## Visual Direction

- **Color palette**: A deep navy or rich blue as the primary brand color (evoking trust and travel), paired with warm amber/gold accents for CTAs and deals. White and light gray backgrounds keep things clean and scannable.
- **Typography**: A modern sans-serif (e.g., Inter, DM Sans, or similar) — highly legible at all sizes. Use bold weights for headings and prices; lighter weights for descriptions.
- **Imagery**: Use placeholder images with travel-appropriate aspect ratios. Cards should feel like windows into destinations — generous image areas with subtle border-radius.
- **Spacing**: Generous whitespace between sections. The homepage is content-heavy (13 sections), so clear visual separation is critical to avoid overwhelm.

## Key Priorities

1. **Interactive tabs are the core UX pattern** — the trip planner tabs, popular links tabs, destination tabs on car rental, region/activity tabs on attractions. These must feel snappy and intuitive with clear active states.
2. **Trust badges matter deeply** — they appear across multiple pages and should feel prominent, not like afterthoughts. Use icons alongside the stats.
3. **The unique properties carousel** on the homepage needs smooth horizontal scrolling with visible navigation arrows.
4. **The FAQ accordion** on the car rental page should be clean — one open at a time.
5. **Cross-page navigation** must be consistent: Stays, Flight + Hotel, Car Rental, and Attractions tabs should appear on every page header with proper linking.

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