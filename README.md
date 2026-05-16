# OpenSkillEval-Web

Static website for **OpenSkillEval** — Dynamically Auditing the Open Skill Ecosystem for LLM Agents.

A benchmark showcasing how skill packs (prompt + tool kits) boost creative generation across 5 task types: data visualization, poster generation, PPT generation, report generation, and web design.

## Browse

- **Home** — `index.html`
- **Leaderboard** — `leaderboard.html`
- **Showcase** — `showcase/index.html` (100 cases, filterable by task)
- **About** — `about.html`

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Stack

Plain HTML/CSS/vanilla JS. No build step.

- ECharts for radar/bar charts
- GSAP for the CardSwap hero animation
- marked.js for markdown rendering
