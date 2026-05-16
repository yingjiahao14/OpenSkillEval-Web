# SnapFrame — Corporate About Landing Page

## Overview

Build a bold, modern corporate landing page for **SnapFrame**, a social media platform centered on photo and video sharing. This is the company's public-facing "About" page — think Instagram's corporate site energy. The audience spans general consumers, creators, parents, and businesses, so the page needs to feel approachable yet authoritative.

The vibe is **modern, bold, and playful**. Think vibrant gradient accents (purples, magentas, warm oranges — reminiscent of social media energy), clean sans-serif typography (Inter, Plus Jakarta Sans, or similar), generous whitespace, and rounded UI elements. The page should feel alive without being cluttered. Light background, high-contrast text, colorful accent moments.

## Key Priorities

**News carousel is the core interactive element.** The horizontally scrollable news section must feel smooth and intuitive — each card should display a thumbnail, category tag, title, and date. Make sure it's swipeable on mobile and scrollable on desktop. This is the most important interaction to get right.

**Responsive design with a working hamburger menu.** The mobile navigation toggle is essential — the header should collapse into a hamburger icon on smaller screens that reveals the full nav when tapped.

**The footer is dense and structured.** It's organized into multiple columns (About, Features, Safety, Community, plus external links). Treat it as a serious navigation hub — clean grid layout, legible at small sizes.

**Hero section sets the tone.** Lead with energy — a compelling headline, the one-liner value prop, and a prominent "Try it now" CTA. Consider a bold background image or gradient treatment.

The safety and creators sections should feel distinct — safety conveys trust and care (softer tones), while creators should feel aspirational and dynamic.

Refer to `task_input.json` for the exact section order, navigation links, interaction specs, and data display requirements.

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