# Chess Game Dataset (Lichess)

## About the Dataset

This dataset contains **20,058 chess games** collected from the online chess platform [Lichess.org](https://lichess.org), sourced from the Kaggle dataset `datasnaek/chess`. The data was gathered via the Lichess API by collecting game histories from users belonging to large Lichess teams. Each row represents a single completed chess game with comprehensive metadata including player information, ratings, game outcome, time controls, full move notation, and opening classification.

The dataset has **16 columns** and is stored in a single CSV file (`games.csv`).

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `id` | String | Unique game identifier from Lichess |
| `rated` | Boolean | Whether the game was rated (`TRUE`) or casual (`FALSE`). Rated games affect player ratings. |
| `created_at` | String | Timestamp (Unix epoch in milliseconds) when the game was created/started. Stored as a floating-point number string (e.g., `1.50421E+12`). |
| `last_move_at` | String | Timestamp (Unix epoch in milliseconds) when the last move was made. Same format as `created_at`. |
| `turns` | Integer | Total number of half-moves (plies) in the game. A turn by white followed by a turn by black counts as 2 turns. |
| `victory_status` | String | How the game ended. Known values include: `mate` (checkmate), `resign` (a player resigned), `outoftime` (a player ran out of time), `draw` (game drawn). |
| `winner` | String | The winning side: `white`, `black`, or `draw`. |
| `increment_code` | String | Time control in the format `base+increment` (e.g., `15+2` means 15 minutes base time with 2 seconds added per move). |
| `white_id` | String | Lichess username of the player with the white pieces. |
| `white_rating` | Integer | Elo rating of the white player at the time of the game. |
| `black_id` | String | Lichess username of the player with the black pieces. |
| `black_rating` | Integer | Elo rating of the black player at the time of the game. |
| `moves` | String | Full game move sequence in Standard Algebraic Notation (SAN), space-separated. |
| `opening_eco` | String | ECO (Encyclopaedia of Chess Openings) code classifying the opening played (e.g., `D10`, `B00`, `C41`). |
| `opening_name` | String | Human-readable name of the opening and variation (e.g., "Slav Defense: Exchange Variation"). |
| `opening_ply` | Integer | Number of half-moves (plies) that constitute the opening phase of the game. |

## Data Quality Notes

- **Timestamps**: The `created_at` and `last_move_at` columns are stored as scientific notation strings representing Unix epoch milliseconds. They require conversion for meaningful time-based analysis.
- **Winner field**: When the game is a draw, the `winner` column contains the value `draw` rather than being null or empty.
- **Moves column**: Contains the full game notation as a single long string. Parsing individual moves requires splitting on spaces.
- **Rating range**: Player ratings span a wide range typical of online chess platforms, from beginners (~800) to strong players (~2700).
- **Opening names**: Some opening names include multiple levels of variation separated by colons (e.g., "Slav Defense: Exchange Variation"), which may need parsing for grouped analysis.
- **No missing values** are expected in the core columns based on the API source, but the `winner` column may contain `draw` entries that should be handled separately from white/black wins in win-rate calculations.

## Context

Chess is a game of patterns, and this dataset enables analysis of how factors such as player rating, color assignment, opening choice, and time control influence game outcomes. The data is well-suited for exploring the classic "white advantage" hypothesis, rating-based performance modeling, and opening effectiveness analysis.