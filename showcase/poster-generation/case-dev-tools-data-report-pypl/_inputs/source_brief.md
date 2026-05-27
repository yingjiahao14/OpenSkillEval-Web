# PYPL Programming Language Popularity Index — April 2026

## Overview

The PYPL (PopularitY of Programming Language) Index measures how frequently programming language tutorials are searched on Google worldwide. Because it captures learning intent rather than existing web-page counts, PYPL serves as a **leading indicator** of language adoption. The raw data is sourced from Google Trends and normalized so that all language shares sum to 100%, smoothed over a six-month window.

As of April 2026, **Python commands 36.21%** of all tutorial searches globally, reinforcing its position as the dominant language for the fourth consecutive year.

## Top 10 Languages — Worldwide Rankings

| Rank | Language | Share | 1-Year Trend |
|------|------------|--------|-------------|
| 1 | Python | 36.21% | +5.7% |
| 2 | C/C++ | 13.21% | +6.2% |
| 3 | Java | 10.01% | -5.4% |
| 4 | R | 6.17% | +1.6% |
| 5 | JavaScript | 5.07% | -3.0% |
| 6 | Swift | 3.15% | +0.8% |
| 7 | C# | 3.00% | -3.0% |
| 8 | Rust | 2.98% | -0.1% |
| 9 | PHP | 2.96% | -0.7% |
| 10 | Objective-C | 2.57% | +0.1% |

Python alone accounts for more than a third of all programming tutorial searches, nearly triple the share of its closest competitor.

## Biggest Gainers and Losers

The most dramatic year-over-year movement belongs to **C/C++**, which surged **+6.2 percentage points** to claim the #2 spot at 13.21%. Python also grew strongly at +5.7%. On the declining side, **Java fell 5.4 points**, dropping to just above 10%, while **JavaScript** and **C#** each shed 3.0 points.

Over a five-year horizon, the picture is even starker: **C/C++ gained +7.0%** cumulatively, the largest long-term increase of any language, while **Java lost -7.0%**, the steepest long-term decline.

## Emerging and Noteworthy Languages

Beyond the top 10, several languages show interesting trajectories:

| Language | Share | 1-Year Trend | Note |
|----------|-------|-------------|------|
| Ada | 2.51% | +1.1% | Strong growth in safety-critical domains |
| R | 6.17% | +1.6% | Data-science demand continues |
| Julia | 0.73% | +0.4% | Steady rise in scientific computing |
| Go | 0.71% | -1.3% | Notable decline despite cloud-native popularity |
| Kotlin | 0.90% | -0.9% | Declining despite Android backing |
| Zig | 0.24% | +0.0% | Niche but stable systems language |

Rust holds steady at 2.98% (essentially flat at -0.1%), maintaining its position just outside the top 7 but not experiencing the explosive growth some predicted.

## Methodology in Brief

PYPL exports Google Trends CSV data and processes it with Python's pandas library. Each language's tutorial search interest is measured relative to Java tutorials each month, then normalized to 100%. A six-month smoothing window reduces noise. Unlike the TIOBE Index, which counts existing web pages (a lagging indicator), PYPL focuses on **search intent** — what developers are actively trying to learn — making it a forward-looking measure of language momentum.

## Key Takeaways

- **Python is unchallenged at #1** with 36.21% share and still growing.
- **C/C++ is the breakout story of 2026**, posting the largest gains both year-over-year (+6.2%) and over five years (+7.0%).
- **Java's long slide continues**, losing 5.4 points in a single year and 7.0 points over five years.
- **JavaScript and C# are under pressure**, each dropping 3.0 points year-over-year.
- **R and Ada are quiet gainers**, reflecting sustained demand in data science and safety-critical engineering respectively.

*Data: PYPL / Google Trends, April 2026. © Pierre Carbonnelle, CC BY 3.0.*