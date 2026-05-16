# OpenLearnHub — Free Coding Tutorials & Curriculum

## Overview

Build a 5-page nonprofit education blog for **OpenLearnHub**, a platform offering free programming tutorials and structured coding certifications. The audience is aspiring and practicing developers, data scientists, and tech learners. The tone should feel **editorial, modern, and minimal** — think clean reading experience with generous whitespace, like a polished tech publication.

## Visual & Style Direction

- **Color palette:** Use a dark navy/charcoal primary (`#0a0a23` or similar) for the header and key UI elements, paired with a warm gold/amber accent for CTAs and highlights. Body backgrounds should be clean white or very light gray.
- **Typography:** A system or sans-serif stack (Inter, system-ui) for body text; slightly bolder weights for headings. Article cards should prioritize readability with clear hierarchy — tag → title → author/date.
- **Layout:** Card-based grid for articles (2–3 columns on desktop, single column on mobile). The learn page should feel structured and organized, almost like a syllabus. The donate page should feel warm and mission-driven.

## Key Priorities

1. **Article grid on the home page** is the centerpiece — each card needs a thumbnail, colored tag label, title, author avatar, author name, and relative timestamp. The "Load More" button should dynamically append additional cards.
2. **Donation page interactions** are critical: the amount selector tabs ($5/$10/$20/$40) must visually highlight the active selection and update descriptive text. The FAQ accordion must toggle open/close smoothly.
3. **Tag pages** (AI and Web Scraping) should display the tag name with post count, a horizontal row of popular tags with their counts, and filtered article grids.
4. **Mobile hamburger menu** must work on all pages, expanding to reveal Forum, Curriculum, and Donate links.
5. **Cross-page navigation** must be consistent and functional — all header links should route correctly between pages.

Refer to `task_input.json` for exact section structures, data content, and interaction specifications.

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