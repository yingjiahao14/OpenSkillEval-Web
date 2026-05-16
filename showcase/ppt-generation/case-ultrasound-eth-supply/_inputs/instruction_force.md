Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Build an 8-slide, 16:9 PowerPoint deck titled "Ultra Sound Money: Ethereum's Post-Merge Supply Dynamics and Monetary Premium" for crypto-native investors and Ethereum ecosystem participants evaluating ETH as a monetary asset. The tone should be data-forward, analytical, and conviction-driven.

The narrative arc opens with Ethereum's current supply context and post-merge economics, then drills into the mechanics driving supply change — gas/burn dynamics, fee burn categories, and staking economics. It builds toward long-term supply projections and ETH's positioning against Bitcoin and gold, culminating in key takeaways that frame the ultra sound money thesis with honest acknowledgment of current low-activity headwinds.

For the supply change snapshot slide (slide 2), include a waterfall or bar chart showing issuance (+19,638 ETH) versus burn (192 ETH) to visualize the 0.01x offset ratio. For the supply projections slide (slide 6), use a line chart illustrating the 200-year supply trajectory converging toward the 125.7M ETH equilibrium, referencing historical era transitions. The flippening/TVS slide (slide 7) should include a stacked bar or pie chart breaking down Total Value Secured across ETH, ERC20s, and NFTs.

Do not fabricate any data not found in source_brief.md. All figures — supply numbers, gas prices, staking amounts, burn leaderboard entries, projection parameters, and flippening percentages — must come directly from the provided brief.

Save the final PPT to `/app/output/final_deck.pptx`.

Only the correctly saved final file is needed — no additional explanation is required.
---

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Follow the provided /app/skills skills first** — use the skills available under `/app/skills` as the primary guidance and workflow for completing the project.
2. **Skip all confirmation/approval/user-input steps** — do not pause, ask questions, or wait for a reply. When encountering BLOCKING or "wait for user confirmation" instructions, make a professional judgment and proceed.
3. **Design decisions** — if `task_input.json` specifies fields such as `deck.tone` or `deck.audience`, use them to guide template, color palette, and style choices; otherwise, use your professional judgment.
4. **Do not deploy or share** — no deployment, PDF export, share links, or other post-delivery steps are needed.
5. **Priority** — these rules take precedence over any interactive-wait instructions in SKILL.md. The workflow, quality standards, and technical specifications in SKILL.md remain in effect; only interactive waits are skipped.
