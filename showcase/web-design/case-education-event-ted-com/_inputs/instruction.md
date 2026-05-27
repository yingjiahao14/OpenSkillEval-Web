# IdeaForum — Page Not Found (404 Error Page)

## Overview

IdeaForum is an educational conference and talks platform — think TED-style events focused on knowledge sharing. You're building their **404 error page**, which needs to feel polished and on-brand rather than like an afterthought. The audience is general visitors interested in educational content who've landed on a broken or outdated link. The page should reassure them quickly and guide them forward.

## Tone & Visual Direction

The vibe is **minimal and professional** — clean whitespace, restrained typography, and a calm color palette. Think muted blues or deep teals paired with neutral grays and white backgrounds. Use a modern sans-serif typeface (e.g., Inter, DM Sans, or similar). The error code ("404") can be a bold visual anchor — large, typographic, perhaps slightly muted in color so it's prominent without feeling alarming. Avoid playful illustrations or humor; this is a professional conference brand.

## Key Priorities

1. **Search functionality is the core interaction.** The search input with its icon-triggered action is the primary way users recover from the dead end. Make it visually prominent — centered, well-sized, with a clear call-to-action. It should feel immediately usable.

2. **Navigation recovery links** ("Go to the homepage" and "Visit our Help Desk") must be easy to spot and clearly styled as actionable links. These are the user's lifeline — don't bury them.

3. **Cookie consent banner** with a "Manage Preferences" trigger that opens a preferences modal/panel. This should be unobtrusive but functional — a standard bottom banner pattern works well.

4. **Responsive design** is required. The page should look intentional on mobile, tablet, and desktop. Given the minimal content, focus on vertical rhythm and comfortable spacing at every breakpoint.

The brand logo at the top anchors the page and confirms the user is still on IdeaForum. Keep the overall layout vertically stacked and centered.

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