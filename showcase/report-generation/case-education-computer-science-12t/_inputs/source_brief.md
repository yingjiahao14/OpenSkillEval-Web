# BIEK Computer Science 12th Class Past Papers (2015–2025)

## About the Dataset

This dataset is a community-compiled question bank of **Computer Science** examination questions for **12th Class (HSC Part-2 / Intermediate Second Year)** under the **Board of Intermediate Education Karachi (BIEK)**. It was sourced from the Kaggle dataset published by user *sadamumer* and covers examination years from **2015 to 2025**.

The dataset contains **327 rows** and **4 columns**, with each row representing a single examination question. Questions span three types: Multiple Choice Questions (MCQs), Short Questions, and Long Questions.

**Source**: Official past papers published by BIEK (https://www.biek.edu.pk/) and publicly available scanned papers from educational platforms. Questions were manually extracted, typed, and verified for accuracy.

**Scope**: Focuses on Computer Science Paper-II (theory portion). Practical questions and Paper-I content are not included unless they overlap with Paper-II topics.

## File Information

- **File name**: `cs-12th-question-bank-biek-su.csv`
- **Encoding**: UTF-8
- **Total rows**: 327
- **Total columns**: 4

## Column Schema

| Column Name | Type    | Description |
|-------------|---------|-------------|
| `id`        | Integer | Unique identifier for each question (sequential). |
| `year`      | Integer | Year of the BIEK examination (ranges from 2015 to 2025). |
| `type`      | String  | Type of question. Possible values: `"MCQs"`, `"Short"`, `"Long"`. |
| `question`  | String  | The full text of the question. For MCQs, answer options are separated by a `$` delimiter. For Long Questions, multiple sub-parts may also be separated by `$`. |

## Key Column Details

### `year`
Integer values representing the BIEK examination year. The dataset spans 11 years: 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, and 2025. Note that some years may include questions from both annual and supplementary examinations, though this distinction is not explicitly encoded in a separate column.

### `type`
A categorical string column with exactly three possible values:
- **MCQs** — Multiple Choice Questions, typically with four options
- **Short** — Short-answer questions requiring brief explanations or definitions
- **Long** — Long-answer or essay-type questions, often with multiple sub-parts

### `question`
Free-text column containing the question content. A special **dollar sign (`$`)** delimiter is used within this field to separate MCQ answer choices or to delineate sub-parts within long questions. When analyzing this column for topic extraction or keyword frequency, the `$` separator should be accounted for during text preprocessing.

## Data Quality Notes

- The dataset is relatively clean with no reported missing values in the core columns.
- The `question` column uses a non-standard `$` delimiter rather than line breaks, which requires parsing logic during text analysis.
- This is a **non-official, community-compiled dataset** — minor transcription errors may exist.
- The dataset does not distinguish between annual and supplementary examination papers.
- With only 327 rows, this is a compact dataset well-suited for pattern analysis but may have limited statistical power for fine-grained topic-level trend detection.
- All text is in English, consistent with the BIEK Computer Science examination medium.