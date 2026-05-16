# Car Selection Parallel Coordinates Dataset

## Overview
A dataset of 25 car models spanning SUVs, sedans, and electric vehicles, each rated across seven consumer-relevant performance dimensions on a normalized 0–100 scale (higher is better). Designed for multi-dimensional comparison via parallel coordinates.

## Data Source

### cars
- **model** (string): Car model name, 25 unique entries
- **type** (categorical): Vehicle category — one of "SUV" (9 models), "Sedan" (8 models), or "Electric" (8 models)
- **price_score** (integer, 18–88): Affordability score; higher means more affordable
- **fuel_efficiency** (integer, 28–95): Combined fuel/energy efficiency rating
- **power** (integer, 35–95): Engine/motor performance score
- **safety** (integer, 60–92): Composite crash-test and active-safety rating
- **interior_space** (integer, 42–95): Cabin and cargo volume score
- **resale_value** (integer, 35–92): Projected 5-year value retention score
- **emission_rating** (integer, 25–98): Environmental cleanliness score; electric vehicles score near-maximum

## Data Notes
- All scores are normalized to a 0–100 scale for cross-dimension comparability
- Price score is inverted (higher = more affordable) so that "up" is always "better" on every axis
- Electric vehicles uniformly score 98 on emission_rating, reflecting zero tailpipe emissions
- No single model scores in the top 3 across all seven dimensions simultaneously
- Scores are illustrative estimates based on publicly available consumer review aggregates, not official test results