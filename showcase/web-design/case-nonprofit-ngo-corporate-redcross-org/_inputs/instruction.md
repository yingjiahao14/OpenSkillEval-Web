# Global Aid Alliance — Together We Respond

## Overview

Build a single-page corporate website for **Global Aid Alliance**, a humanitarian nonprofit dedicated to disaster relief and community resilience worldwide. The site serves as the organization's primary digital presence — it must inspire trust, convey urgency, and make it effortless for visitors to donate or volunteer.

The audience spans the general public, potential donors, volunteers, and disaster-affected communities. The tone should feel **professional yet warm** — authoritative enough to handle life-and-death subject matter, but human and approachable enough to motivate action.

## Visual Direction

Use a color palette anchored in **deep red** (evoking urgency and the humanitarian tradition) paired with **clean whites, warm grays**, and a secondary accent of **navy blue** for trust. Typography should be modern and highly legible — a strong sans-serif for headings, a readable body font. Generous whitespace and clear hierarchy are essential; this isn't a flashy brand site, it's a credibility-first experience.

Imagery should suggest diverse communities, relief workers in action, and hope — use placeholder images with appropriate alt text.

## Key Priorities

- **The donation flow is critical.** The hero's "Donate Now" button must trigger a modal with clear amount selection options. This is the single most important conversion path on the page.
- **Impact statistics** (12M people helped, 50K volunteers, 190 countries, $850M raised) need to land with visual weight — consider animated counters or bold typographic treatment to make them memorable.
- **The news carousel** must have functional next/previous navigation. The program accordion must expand/collapse smoothly.
- **Mobile experience matters deeply** — the hamburger menu and responsive layout must work flawlessly, as disaster-affected users may be on mobile devices with limited connectivity.

Refer to `task_input.json` for the full section list, interaction specs, and data display requirements.

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