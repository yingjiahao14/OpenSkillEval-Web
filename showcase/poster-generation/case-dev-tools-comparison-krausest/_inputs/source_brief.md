# JS Framework Benchmark: 5 Years of Browser Performance Testing

## Overview

The **JS Framework Benchmark** is the most widely referenced open-source benchmark for comparing JavaScript web frameworks on real-world DOM operations. Maintained by Stefan Krause and hosted on GitHub, it measures operations such as creating 1,000 rows, partial updates, row selection, swapping, removal, and startup time — all inside a real Chrome browser with controlled CPU throttling.

Since its inception, the project has published **over 60 official result sets**, covering Chrome versions from **55 (circa 2017) all the way to 146 (mid-2026)**. Each result set captures dozens of frameworks — both keyed and non-keyed implementations — giving developers a consistent yardstick for performance.

## Methodology Milestones

The benchmark has undergone several important methodology changes that make **cross-version comparisons unreliable**:

| Milestone | Chrome Version | Year | Description |
|---|---|---|---|
| Weighted Geometric Mean | 118 | 2023 | Overall score switched from arithmetic to weighted geometric mean |
| CPU Throttling Adjustment | 118 | 2023 | Throttling factors recalibrated for more realistic load simulation |
| Measurement Fine-Tuning | 118+ | 2023–present | Ongoing refinements to timing and driver instrumentation |
| Keyed-Only Alternation | 139+ | 2025–2026 | Odd Chrome versions often benchmark keyed frameworks only |

Because of these evolving parameters, the project explicitly warns: *"Comparisons across Chrome versions aren't always safe since the benchmark and its driver are constantly developing."*

## Timeline of Official Runs

The table below summarizes the distribution of official benchmark runs by year:

| Year | Chrome Versions | Number of Runs | Notes |
|---|---|---|---|
| 2017–2019 | 55, 58, 62, 69 | 4 | Early era; hosted on stefankrause.net |
| 2020 | 83 – 87 | 5 | Migrated to GitHub Pages |
| 2021 | 88 – 96 | 9 | Steady monthly cadence established |
| 2022 | 97 – 108 | 13 | Includes 2 Windows runs (Chrome 104) |
| 2023 | 109 – 120 | 12 | Major methodology overhaul at Chrome 118 |
| 2024 | 121 – 131 | 12 | Includes 1 Windows run (Chrome 121) |
| 2025 | 132 – 143 | 12 | Most active year; alternating keyed-only runs |
| 2026 | 144 – 146 | 3 (so far) | Latest: Chrome 146 on macOS |

## Platform Coverage

The vast majority of runs — **over 95%** — were executed on **macOS (OSX)**. Only two Windows-specific runs exist:

- **Chrome 104 – Windows** (2022)
- **Chrome 121 – Windows** (2024)

This means the benchmark primarily reflects macOS + Chrome performance characteristics.

## Key Takeaways for Developers

1. **Compare within the same Chrome version.** Methodology and throttling differ across releases.
2. **Consult the latest run** (currently Chrome 146) for the most up-to-date framework standings.
3. **Understand keyed vs non-keyed modes.** Recent odd-numbered Chrome runs benchmark keyed frameworks only, while even-numbered runs include both.
4. **60+ data points over 8 years** make this the longest-running, most comprehensive JS framework performance tracker available.
5. **Weighted geometric mean** (since Chrome 118) gives a more balanced overall score than the previous arithmetic approach.
