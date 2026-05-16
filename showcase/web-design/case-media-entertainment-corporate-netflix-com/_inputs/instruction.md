# StreamWave — Streaming Platform Landing Page

## Overview

Build a **dark, bold, cinematic** landing site for **StreamWave**, a premium streaming service competing in the Netflix/Disney+ space. The goal is simple: get visitors to enter their email and start a subscription. Every design choice should reduce friction toward that conversion — big type, high contrast CTAs, and a layout that screams "press play."

## Audience & Tone

General consumers browsing for entertainment. The tone is **modern, confident, and immersive** — think deep blacks (#141414), rich reds (#E50914 or similar) for primary accents, and crisp white text. Typography should be bold sans-serif (e.g., system fonts or a clean Google Font like Inter or Bebas Neue for headings). The entire experience should feel like stepping into a cinema lobby.

## Key Priorities

- **Hero section is everything.** It must immediately communicate the value prop — unlimited content, starting price ($15.98/mo), cancel anytime — with an email capture field and a prominent "Get Started" button. This pattern repeats in the bottom CTA; both must feel urgent and effortless.
- **Trending carousel** needs to feel alive. Display ranked titles (with large translucent rank numbers) in a horizontally scrollable row with arrow navigation. Use placeholder poster images with bold overlays.
- **FAQ accordion** must be polished — smooth expand/collapse with only one item open at a time. These are real objection-busters, so give them visual weight.
- **Login page** should be minimal and centered — a focused form with email/password fields, a "Continue" button, and a collapsible "Get help" section beneath.

## Responsive Design

Both pages must work seamlessly from mobile (360px) to desktop (1440px+). The trending carousel should be touch-swipeable on mobile. Dark mode is the *only* mode — no light variant needed.

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