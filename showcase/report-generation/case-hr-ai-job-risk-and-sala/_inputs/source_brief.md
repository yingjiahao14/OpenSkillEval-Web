# AI Job Impact & Salary Dataset (2015–2035)

## About the Dataset

This dataset explores the evolving relationship between Artificial Intelligence, global job markets, skills, and salaries over a 21-year horizon from 2015 to 2035. It is sourced from Kaggle (shree0910/ai-job-risk-and-salary-dataset-20152035) and is designed for analytical, educational, and modeling purposes. The data is synthetically generated using realistic assumptions inspired by global job market patterns, AI adoption rates, and salary distributions.

- **Source:** Kaggle
- **Rows:** 12,343
- **Columns:** 13
- **Time Range:** 2015–2035
- **Data Type:** Synthetic + Trend-Based (Realistic Simulation)

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `job_title` | String | The job role or occupation (e.g., Data Scientist, Software Engineer, Data Analyst). Represents distinct career categories in the dataset. |
| `country` | String | The country where the job is located (e.g., USA, India, Canada). Enables geographic comparisons. |
| `experience_level` | String | Professional experience tier. Expected values include "Entry", "Mid", and "Senior". |
| `education_level` | String | Highest education attainment. Expected values include "Bachelor", "Master", and "PhD". |
| `year` | Integer | The calendar year of the record, ranging from 2015 to 2035. Supports time-series and trend analysis. |
| `salary` | Float | Annual salary in USD. Values vary significantly by country, role, and experience level. |
| `ai_risk_score` | Float | A continuous score between 0 and 1 representing the probability that the job will be significantly impacted or automated by AI. Higher values indicate greater risk. |
| `primary_skill` | String | The most important or representative skill for the job (e.g., Python, Java, SQL). Indicates the core competency associated with the role. |
| `skill_demand_score` | Integer | A score (likely 0–100) reflecting how in-demand the primary skill is in the job market for that year. |
| `job_openings` | Integer | The number of job openings available for the role in the given country and year. |
| `job_survival_class` | Integer | A classification target variable indicating job survival prospects. Observed values include 0 (at risk / unlikely to survive), 1 (moderate survival), and 2 (strong survival). |
| `salary_bucket` | String | A categorical bucketing of the salary value. Expected values include "Low", "Medium", and "High". |
| `ai_risk_category` | String | A categorical label derived from the ai_risk_score. Expected values include "Low Risk", "Medium Risk", and "High Risk". |

## Key Analytical Notes

- **Target Variable:** `job_survival_class` serves as a classification target for machine learning and can also be used as a key segmentation variable in reporting. Values 0, 1, and 2 represent increasing levels of job resilience against AI disruption.
- **Derived Columns:** `salary_bucket` and `ai_risk_category` are pre-computed categorical columns derived from `salary` and `ai_risk_score` respectively. These are visualization-ready and useful for grouping and filtering.
- **Time Dimension:** The dataset spans both historical (2015–2024) and projected future (2025–2035) periods. Analysts should note that future years represent simulated projections, not observed data.
- **Geographic Scope:** Multiple countries are represented, enabling cross-country salary and risk comparisons. Salary values are in USD and should be interpreted with awareness of purchasing power differences.
- **Data Quality:** As a synthetic dataset, there are no expected missing values or encoding issues. All columns are consistently populated across the full 12,343 rows.

## Intended Use

This dataset is well-suited for trend analysis, workforce planning insights, interactive dashboard creation, and predictive modeling around AI's impact on employment.