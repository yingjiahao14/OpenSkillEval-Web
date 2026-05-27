# ShiftWise — Restaurant Team Management SaaS Website

## Overview

Build a 5-page marketing website for **ShiftWise**, an all-in-one workforce management platform designed specifically for the restaurant and hospitality industry. The site targets restaurant owners, managers, and hospitality teams, with the primary goal of converting visitors into **free trial sign-ups**.

## Tone & Visual Direction

The brand voice is **professional, modern, and bold**. Think clean SaaS aesthetics with a hospitality warmth — not cold and corporate, but confident and energetic. Use a color palette anchored by a deep navy or charcoal paired with a vibrant accent (think warm orange or electric green) to convey reliability with a spark of energy. Typography should be sharp and contemporary — a geometric sans-serif for headings, a clean readable sans for body text. Generous whitespace, strong visual hierarchy, and clear CTAs throughout.

## Key Priorities

- **Conversion-focused CTAs**: Every page should funnel toward the free trial. The CTA sections need to feel urgent and compelling — not buried.
- **Pricing page accuracy**: The billing toggle (monthly vs. annual) and the pricing table are critical interactive elements. Ensure the three tiers (Free, Starter, Premium) display correctly with feature breakdowns, and that toggling billing cycles updates prices smoothly.
- **Home page engagement**: The testimonial carousel and stats banner are trust-building essentials. The stats (750K+ restaurants, 98% satisfaction, etc.) should feel impactful — consider animated count-ups or bold typographic treatment.
- **Mobile experience**: The hamburger menu interaction is explicitly required. Ensure the entire site is fully responsive with a polished mobile navigation drawer.
- **Contact form validation**: The form must validate required fields client-side and display a success confirmation on submission — no backend needed, just front-end behavior.

Refer to `task_input.json` for the full structural breakdown of pages, sections, interactions, and data display requirements.

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