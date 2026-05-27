# Global Airport Performance Dataset

## Overview
This dataset contains operational performance metrics for 30 major international airports worldwide, covering passenger throughput, on-time performance, and route network size across six geographic regions.

## Data Source

### airports
Each record represents one airport with the following fields:
- **airport** (string): Airport name with IATA code in parentheses
- **throughput_million** (float): Annual passenger throughput in millions of passengers, ranging from ~10 to ~94
- **on_time_rate** (float): On-time departure/arrival performance as a percentage, ranging from ~70% to ~91%
- **routes** (integer): Number of active airline routes served, ranging from 95 to 370
- **region** (string): Geographic region — one of North America, Europe, Asia-Pacific, Middle East, Latin America, or Africa

## Data Notes
- Throughput figures are approximate annual totals representative of recent pre-pandemic or recovery-period levels
- On-time rate is a blended metric combining departure and arrival punctuality
- Route counts reflect unique city-pair connections and may vary seasonally; figures represent peak-season snapshots
- Three airports are designated for annotation: Atlanta (highest throughput), Dubai (mega-hub with high throughput), and Tokyo Haneda (highest on-time rate)