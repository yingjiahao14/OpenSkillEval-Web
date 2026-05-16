# Streaming Platform Subscriber Rankings (2019–2025)

## Overview
Quarterly subscriber-based rankings for 8 major streaming and audio platforms from Q1 2019 through Q1 2025. Rankings reflect relative global subscriber counts, with rank 1 indicating the highest subscriber base. Disney+ and Apple TV+ enter the dataset in Q4 2019; HBO Max enters in Q2 2020.

## Data Source

### streaming_rankings
- **quarter** (string): Calendar quarter label, format "QN YYYY" (e.g., "Q1 2019"). 25 quarterly snapshots total.
- **Netflix, Amazon Prime Video, Spotify, Disney+, Apple TV+, HBO Max, YouTube Premium, Hulu** (integer or null): Rank position for each platform in that quarter. Values range from 1 (most subscribers) to 8 (fewest). A `null` value indicates the platform had not yet launched.
- **unit**: Ordinal rank (1–8); lower values = higher subscriber count.

## Data Notes
- Rankings are estimated based on publicly reported subscriber figures and industry analyst estimates; exact subscriber counts are not provided.
- Disney+ launched November 2019 (first appears Q4 2019). Apple TV+ launched November 2019 (first appears Q4 2019). HBO Max launched May 2020 (first appears Q2 2020).
- Before all 8 platforms are active, only the available platforms are ranked (ranks may not fill 1–8 completely).
- Spotify is included as a streaming subscription platform (audio) alongside video services for a holistic view of the subscription landscape.