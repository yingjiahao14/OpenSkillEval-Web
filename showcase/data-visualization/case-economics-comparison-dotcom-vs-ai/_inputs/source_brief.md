# Dot-com vs AI Bubble Comparison Dataset

## Overview
Four datasets capturing key market metrics across two technology-driven market booms: the 1997–2002 dot-com era and the 2021–2024 AI era. The data is structured for side-by-side temporal alignment using a common `quarter_offset` or `year` field within each era.

## Data Source

### nasdaq_index
Quarterly NASDAQ Composite closing values, rebased to 100 at the start of each era. Fields: `era` (string: "Dot-com" or "AI"), `quarter_offset` (integer 0–23), `label` (calendar quarter string), `index_value` (float). The dot-com series spans 24 quarters (1997-Q1 to 2002-Q4); the AI series spans 16 quarters (2021-Q1 to 2024-Q4).

### pe_ratio
Trailing 12-month P/E ratio for the NASDAQ Composite, sampled at irregular quarterly intervals. Fields: `era`, `quarter_offset`, `label`, `pe` (float, ratio). Dot-com P/E ranges from ~28 to ~105; AI-era P/E ranges from ~24 to ~40.

### ipo_counts
Annual count of technology-sector IPOs on US exchanges. Fields: `era`, `year` (integer), `ipo_count` (integer). Dot-com era: 6 years; AI era: 4 years.

### corporate_earnings
Aggregate annual net income for NASDAQ-100 companies in nominal billion USD. Fields: `era`, `year`, `earnings_bn` (float; may be negative). Dot-com earnings range from −12.3 to 30.5 B; AI-era earnings range from 358 to 510 B.

## Data Notes
- NASDAQ index values are rebased independently per era; absolute levels differ dramatically.
- P/E ratios for the dot-com era include periods of near-zero aggregate earnings, inflating the ratio.
- Nominal earnings are not inflation-adjusted; direct magnitude comparison across eras should note the ~20-year gap.
- 2024 figures are estimates based on analyst consensus as of late 2024.