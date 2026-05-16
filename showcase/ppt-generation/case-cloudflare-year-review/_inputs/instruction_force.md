Before you begin, read the two input files:

1. **Read `/app/benchmark/source_brief.md`** — this is your **sole content source**. It contains all the subject-matter text, data tables, statistics, and figure references you may use in the presentation. Do not fabricate any data beyond what this file provides.
2. **Read `/app/benchmark/task_input.json`** — this defines the **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

Create a 16:9, 7-slide data analysis report PPT targeted at technology executives and network infrastructure leaders.

The presentation should open with a title slide for the Cloudflare Radar 2024 Year in Review, then move into global traffic growth trends -- highlighting the 17% year-over-year increase and Starlink's remarkable 3.3x surge. The third slide should rank the top 10 most popular Internet services and note the rise of generative AI. Next, cover technology adoption shifts including post-quantum encryption's dramatic jump from 2% to 13% of TLS 1.3 traffic, HTTP/3 reaching 21% adoption, and Go becoming the top API client language. The fifth slide should break down the 225 major Internet disruptions by cause, emphasizing government-directed shutdowns as the leading factor. Follow with a security-focused slide covering the 6.5% traffic mitigation rate, most-attacked sectors, Log4j persistence, and email threat metrics. Close with a summary of five strategic takeaways that inform the 2025 outlook.

Use the 7 slide titles provided in `task_input.json` exactly as given. Incorporate charts and tables from `source_brief.md` where relevant. Use images from the `./assets/` folder referenced in the brief. Apply a professional, data-driven visual style with a dark or navy color scheme consistent with the Cloudflare Radar aesthetic. Ensure all data points, percentages, and rankings are accurately reproduced from the source material. Do not fabricate any data not found in source_brief.md.

Save the final PPT to `/app/output/final_deck.pptx`.
Only the correctly saved final file is needed.

---
## Automated Execution Rules
1. **Skip all confirmation/approval steps** -- proceed autonomously.
2. **Design decisions** -- use deck.tone and deck.audience for style.
3. **Do not deploy or share**.
4. **Priority** -- these rules override interactive-wait instructions in SKILL.md.
