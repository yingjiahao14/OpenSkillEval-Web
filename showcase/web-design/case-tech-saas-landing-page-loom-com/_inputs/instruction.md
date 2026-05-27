# ClipCast — Landing Page Build Instructions

## Overview

ClipCast is an async video messaging and screen recording platform targeting professionals, remote teams, and enterprises. Think Loom-style product positioning: the site needs to feel **modern, professional, yet playful** — approachable enough for individual signups but polished enough to close enterprise deals. The brand promise is "One video is worth a thousand words."

## Visual Direction

Use a **clean, airy layout** with generous whitespace. Primary palette should lean into vibrant purple/indigo accents against white backgrounds, with subtle gradients for depth. Typography should be a modern geometric sans-serif (Inter, Plus Jakarta Sans, or similar) — large bold headlines, comfortable body text. Rounded corners, soft shadows, and smooth transitions throughout. Illustrations and UI mockups should feel lightweight and contemporary. Buttons should be bold and high-contrast with clear hover states.

## Key Priorities

**Pricing page accuracy is critical.** The billing toggle (monthly/annual with "save up to 17%" badge), team size slider, expandable comparison table, and FAQ accordion must all function correctly with accurate data. This page carries the heaviest interactive load — get it right.

**Navigation flow matters.** Five pages are interconnected with specific link triggers. Ensure the shared nav bar consistently links Home → Enterprise, Pricing, Login, and Signup across all main pages. CTA buttons ("Get Started for free", "Try for free") must route to signup.

**The home page is dense** — 15 sections including a features grid, use cases, integrations, security, testimonials, and blog teasers. Prioritize visual hierarchy so it doesn't feel overwhelming. Use alternating background tones and clear section breaks.

**Login and signup pages** should be minimal and focused — social auth buttons (Google, Slack, Apple, Outlook, SSO) plus email input. The signup page pairs the form with a testimonial sidebar for social proof.

**Cookie consent banner** on the home page needs accept/reject plus a manage-preferences modal with category toggles.

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