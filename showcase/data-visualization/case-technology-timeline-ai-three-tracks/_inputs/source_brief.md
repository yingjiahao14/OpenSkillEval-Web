# AI Three-Track Timeline (2010–2024)

## Overview
This dataset captures 15 years of AI evolution across three parallel tracks — research breakthroughs, industry adoption, and regulatory action — alongside annual global private AI investment figures. The data is designed to visualize how these tracks interrelate over time and how their cadence changed around the ChatGPT launch.

## Data Source

### research_milestones
22 records. Fields: `year` (int, 2011–2024), `month` (int, 1–12), `event` (string, brief description), `category` (string: NLP, Computer Vision, Generative AI, LLM, Architecture, Training Methods, Reinforcement Learning, Science).

### industry_milestones
21 records. Fields: `year` (int, 2011–2024), `month` (int, 1–12), `event` (string), `category` (string: Consumer Product, Internal R&D, M&A, Platform, Deployment, Autonomous Systems, Cloud AI, Investment, Developer Tools, Hardware, Enterprise).

### regulatory_milestones
19 records. Fields: `year` (int, 2016–2024), `month` (int, 1–12), `event` (string), `jurisdiction` (string: US, EU, China, UK, International).

### global_ai_investment
15 records (one per year, 2010–2024). Fields: `year` (int), `investment_bn_usd` (float, estimated annual global private AI investment in billion USD). Values range from ~$1.3B in 2010 to ~$110B in 2024.

## Data Notes
- Investment figures are estimates compiled from Stanford HAI AI Index and CB Insights reports; 2024 is a partial-year projection.
- Milestone dates use the earliest public announcement month.
- Regulatory track starts in 2016 as no major AI-specific policy actions preceded that year.