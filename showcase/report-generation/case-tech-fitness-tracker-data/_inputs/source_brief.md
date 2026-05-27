# Fitness Tracker Dataset with Daily Health Metrics

## About the Dataset

This dataset is sourced from Kaggle (faryalrifaz3374/fitness-tracker-dataset-with-daily-health-metrics) and contains **4,000 rows** of synthetic fitness tracker data representing daily health and activity metrics. The data simulates information typically collected by wearable fitness devices such as smartwatches and health trackers.

The dataset spans from **January 1, 2015 to December 13, 2025**, covering simulated users and their daily activity patterns. It includes **15 columns** encompassing demographic information, body measurements, physical activity levels, sleep duration, heart rate statistics, and lifestyle indicators.

**Important:** This dataset is synthetically generated and does not represent real individuals.

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `user_id` | Integer | Unique identifier for each user. Note that the same user_id may appear on multiple dates. |
| `date` | String (YYYY-MM-DD) | The date of the recorded daily metrics. Ranges from 2015-01-01 to 2025-12-13. |
| `age` | Integer | Age of the user in years. |
| `gender` | String | Gender of the user. Expected values include "Male" and "Female". |
| `height_cm` | Float | Height of the user in centimeters. |
| `weight_kg` | Float | Weight of the user in kilograms. |
| `steps` | Integer | Total number of steps recorded for the day. |
| `calories_burned` | Float | Total calories burned during the day. |
| `sleep_hours` | Float | Total hours of sleep recorded for the day. |
| `heart_rate_avg` | Integer | Average heart rate (beats per minute) for the day. |
| `workout_type` | String | Type of workout performed. Expected values include "Running", "Cycling", "Yoga", "Strength Training", "None" (indicating no workout). |
| `workout_duration_minutes` | Integer | Duration of the workout in minutes. A value of 0 typically corresponds to workout_type "None". |
| `water_intake_liters` | Float | Total water intake for the day in liters. |
| `stress_level` | Integer | Self-reported stress level on a numeric scale (lower values indicate less stress). |
| `mood` | String | Self-reported mood for the day. Expected values include "Happy", "Neutral", "Tired", and potentially others. |

## Key Notes for Analysis

- **User granularity:** Each row represents one user's metrics for one day. A single `user_id` may appear across multiple dates, so care should be taken when computing per-user vs. per-record statistics.
- **Workout participation:** When `workout_type` is "None", the `workout_duration_minutes` is expected to be 0. This distinction is important for calculating workout participation rates.
- **Stress level encoding:** The `stress_level` column uses integer values. Based on sample data, values range from low (e.g., 1) to higher numbers. Treat this as an ordinal scale.
- **Mood categories:** The `mood` column is categorical. Analysts should check the full set of unique values in the data before drawing conclusions.
- **Date parsing:** The `date` column is stored as a string in ISO format (YYYY-MM-DD) and should be parsed to a datetime type for temporal analysis.
- **Synthetic data caveat:** Since the data is synthetically generated, statistical patterns may not perfectly mirror real-world health data. Nonetheless, it is suitable for analytics, visualization, and modeling exercises.
- **No known missing values** have been flagged in the metadata, but analysts should verify completeness during initial data profiling.

This dataset is well-suited for exploratory data analysis, health and fitness analytics, demographic segmentation, temporal trend analysis, and machine learning experimentation.