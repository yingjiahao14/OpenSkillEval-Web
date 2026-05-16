# IPL 2026 Ball-by-Ball Deliveries Dataset

## About the Dataset

This dataset contains **ball-by-ball delivery data** from the **IPL 2026** season (19th edition of the Indian Premier League), sourced from Kaggle (krishd123/ipl-2026-complete-dataset). The tournament commenced on March 28, 2026 and features ten franchise teams competing in Twenty20 cricket matches.

The file `deliveries.csv` contains **3,284 rows** and **19 columns**, where each row represents a single delivery (ball) bowled during a match. This granular data enables deep analysis of batting, bowling, and fielding performance at the most atomic level of a cricket match.

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `match_no` | Integer | Unique match number identifier (sequential, starting from 1) |
| `date` | String | Date of the match in "Mon DD, YYYY" format (e.g., "Mar 28, 2026") |
| `stage` | String | Tournament stage — e.g., "League stage", potentially playoffs/final |
| `venue` | String | Full venue name and city (e.g., "M.Chinnaswamy Stadium, Bengaluru") |
| `batting_team` | String | Abbreviated team name of the batting side (e.g., SRH, RCB, CSK, MI, etc.) |
| `bowling_team` | String | Abbreviated team name of the bowling side |
| `innings` | Integer | Innings number — 1 (first batting) or 2 (chasing) |
| `over` | Float | Over and ball number in format `over.ball` (e.g., 0.1 = first over first ball, 19.6 = last ball of 20th over) |
| `striker` | String | Name of the batsman facing the delivery |
| `bowler` | String | Name of the bowler delivering the ball |
| `runs_of_bat` | Integer | Runs scored off the bat on this delivery (0, 1, 2, 3, 4, or 6 typically) |
| `extras` | Integer | Total extra runs on this delivery (sum of wides, no-balls, byes, leg-byes) |
| `wide` | Integer | Runs awarded as wides (0 if not a wide) |
| `legbyes` | Integer | Runs scored as leg-byes (0 if none) |
| `byes` | Integer | Runs scored as byes (0 if none) |
| `noballs` | Integer | Runs awarded as no-balls (0 if not a no-ball) |
| `wicket_type` | String | Type of dismissal if a wicket fell (e.g., "caught", "bowled", "lbw", "run out", "stumped"). Empty string if no wicket. |
| `player_dismissed` | String | Name of the dismissed batsman. Empty string if no wicket fell. |
| `fielder` | String | Name of the fielder involved in the dismissal (e.g., catcher). Empty string if not applicable. |

## Data Quality Notes

- **Missing/empty values**: The columns `wicket_type`, `player_dismissed`, and `fielder` contain empty strings (not null) for deliveries where no wicket fell. These should be treated as missing/not-applicable rather than meaningful values.
- **Over encoding**: The `over` column uses a decimal format where the integer part is the over number (0-indexed, so 0 = first over, 19 = 20th over) and the decimal part is the ball number within that over (1-6). Extra deliveries (wides, no-balls) may result in additional balls within the same over.
- **Date format**: Dates are stored as strings in "Mon DD, YYYY" format and will need parsing for time-based analysis.
- **Team abbreviations**: Standard IPL abbreviations are used — SRH (Sunrisers Hyderabad), RCB (Royal Challengers Bengaluru), CSK (Chennai Super Kings), MI (Mumbai Indians), DC (Delhi Capitals), KKR (Kolkata Knight Riders), PBKS (Punjab Kings), RR (Rajasthan Royals), GT (Gujarat Titans), LSG (Lucknow Super Giants).
- **Coverage**: The dataset covers the early portion of the IPL 2026 season (approximately 15 matches based on the metadata), so findings represent a partial-season snapshot.

## Key Analytical Opportunities

The ball-by-ball granularity allows for phase-wise analysis (powerplay overs 1-6, middle overs 7-15, death overs 16-20), matchup analysis between specific batsmen and bowlers, scoring acceleration patterns, and detailed extras/discipline breakdowns by team and bowler.