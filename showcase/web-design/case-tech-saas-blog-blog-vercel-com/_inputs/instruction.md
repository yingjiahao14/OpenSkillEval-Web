# DeployCloud Blog — Build Instructions

## Overview

Build a modern tech blog landing page for **DeployCloud**, a cloud deployment platform. This is a content hub targeting developers, engineering teams, and technical decision-makers. The page should feel like a polished editorial experience — think Vercel's blog or Cloudflare's blog: clean, information-dense, and fast-looking.

## Visual Direction

- **Palette**: Predominantly white/light gray background with deep navy or near-black text. Use a vibrant accent color (electric blue or orange) sparingly for interactive elements like category pills and CTAs.
- **Typography**: Use a modern sans-serif system font stack (Inter, or similar). Headlines should be bold and large; body text clean and readable. Generous line-height for editorial comfort.
- **Layout**: Spacious, grid-based. The featured articles section should feel hero-like and visually distinct from the chronological feed below.
- **Cards**: Blog post cards should have subtle borders or shadows, with hover states that feel responsive. Include category tags, dates, titles, short excerpts, and author avatars.

## Key Priorities

1. **Category filtering is the core interaction** — the pill buttons must feel snappy. When a user selects a category, the post grid should visibly update. Combine this with the search input so both filters work together seamlessly. Show a clear "no results" state when nothing matches.

2. **Featured articles deserve visual weight** — these three cards are the editorial showcase. Make them larger, more prominent, and visually differentiated from the latest news grid. The agentic infrastructure stats (30% of deployments, 1000% increase, etc.) should be woven into the featured content naturally.

3. **Navigation dropdowns** — the Products and Resources mega menus should be polished and well-organized, reinforcing that this blog belongs to a serious platform company.

4. **"Show more posts"** — implement this as a progressive reveal from pre-loaded data, appending additional cards to the grid without a page reload.

5. **Responsive design** is required — the 3-column grid should collapse gracefully to 2 and then 1 column on smaller screens.

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