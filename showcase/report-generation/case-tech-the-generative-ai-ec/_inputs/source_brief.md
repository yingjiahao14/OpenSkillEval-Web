# The Generative AI Ecosystem: 50K User Reviews 2026

## About the Dataset

This dataset contains **50,000 public user reviews** from the top 5 Generative AI mobile applications: **ChatGPT, Microsoft Copilot, Google Gemini, Perplexity, and Claude**. The reviews were sourced from the US Google Play Store in early 2026 and represent English-only mobile-user sentiment. Each application has exactly **10,000 reviews**, providing a balanced corpus for cross-app comparison.

The dataset was curated using a "Continuous Fetch Loop" methodology that enforces a minimum **10-word threshold** per review, filtering out low-context spam and ensuring every row contains meaningful, analysis-ready text. It includes engineered NLP features such as VADER sentiment polarity scores and regex-based thematic tags.

**Source:** Kaggle — `jahnavikachhia23/the-generative-ai-ecosystem-50k-user-reviews-2026`

- **Total rows:** 50,000
- **Total columns:** 10
- **Balance:** 10,000 reviews per app

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `App` | String | Name of the AI application. One of: ChatGPT, Microsoft Copilot, Google Gemini, Perplexity, Claude. Note: the column name contains a BOM character (`﻿App`). |
| `Review_Date` | String | Timestamp of the review in `YYYY-MM-DD HH:MM:SS` format. Reviews span early 2026. |
| `Star_Rating` | Integer | User-assigned rating from 1 (worst) to 5 (best). |
| `Review_Text` | String | Full text of the user review. Guaranteed to contain at least 10 words. Severe profanity has been replaced with `[REDACTED]`. Some reviews contain Unicode-styled text (e.g., bold Unicode characters). |
| `Word_Count` | Integer | Algorithmically computed word count of the review text. Minimum value is 10. |
| `Review_Length_Chars` | Integer | Character length of the review text. |
| `Thumbs_Up_Count` | Integer | Number of "helpful" votes the review received from other users. Many reviews have 0. |
| `App_Version` | String | Version of the app the user was running when the review was submitted. Format varies by app (e.g., `1.2026.076`). May contain missing or null values. |
| `Sentiment_Polarity` | Float | VADER compound sentiment score ranging from -1.0 (most negative) to +1.0 (most positive). A score of 0.0 indicates neutral sentiment. Note: Unicode-styled text may produce a 0.0 polarity even when the review is clearly positive or negative. |
| `Review_Theme` | String | Regex-derived thematic tag. Possible values: **General** (no specific complaint detected), **Pricing** (subscription/paywall complaints), **Bugs** (performance/crash issues), **Accuracy** (hallucination/logic complaints). A single review may be tagged with one theme. |

## Data Quality Notes

1. **BOM Character:** The `App` column header contains a Unicode Byte Order Mark (`﻿`). Parsing libraries may need to handle this (e.g., `encoding='utf-8-sig'` in Python).
2. **Unicode Text:** Some reviews use Unicode-styled characters (bold, italic Unicode) which VADER cannot parse, resulting in a `Sentiment_Polarity` of 0.0 despite clearly emotional text. These cases are worth noting in any sentiment analysis.
3. **App_Version:** May contain null or missing values for some reviews.
4. **Thumbs_Up_Count:** Heavily skewed toward 0; most reviews have no engagement votes.
5. **Review_Theme Distribution:** The majority of reviews are tagged as "General." The Pricing, Bugs, and Accuracy themes represent a smaller but analytically important subset.
6. **No User Identifiers:** The dataset contains no personally identifiable information; user names and profile data were never collected.
7. **Balanced Design:** Exactly 10,000 reviews per app ensures fair cross-application comparisons without needing to normalize for sample size.