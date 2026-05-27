# Student Performance Dataset — Bangladesh

## About the Dataset

This dataset captures academic and socio-economic factors affecting student performance at the SSC (Secondary School Certificate) and HSC (Higher Secondary Certificate) levels in Bangladesh. It was sourced from Kaggle (ihasan88/student-performance-dataset) and is designed for educational research, data analysis, and machine learning applications.

- **Total records:** 1,000 students
- **Total columns:** 14
- **File:** `bangladesh_student_performance.csv`

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| Student_ID | Integer | Unique identifier for each student (1–1000). |
| Gender | String | Student gender. Values: `Male`, `Female`. |
| Age | Integer | Student age, typically ranging from 15 to 18. |
| District | String | Region in Bangladesh where the student resides. Expected values include Dhaka, Chattogram, Rajshahi, Rangpur, Barisal, Mymensingh, Khulna, Sylhet, and potentially others. |
| School_Type | String | Type of school attended. Values: `Public`, `Private`. |
| Study_Hours_per_Week | Integer | Number of hours the student studies per week outside of school. |
| Attendance | Integer | Percentage of classes attended (0–100 scale). |
| Parent_Education | String | Highest education level of the student's parents. Values: `Primary`, `Secondary`, `Higher Secondary`, `Graduate`. |
| Family_Income_BDT | Integer | Monthly family income in Bangladeshi Taka (BDT). |
| Internet_Access | String | Whether the student has internet access at home. Values: `Yes`, `No`. |
| Private_Tuition | String | Whether the student receives private coaching/tuition. Values: `Yes`, `No`. |
| Previous_GPA | Float | Student's previous GPA on a 0–5 scale (common grading system in Bangladesh). |
| SSC_Result | Float | GPA obtained in the SSC examination (0–5 scale). |
| HSC_Result | Float | GPA obtained in the HSC examination (0–5 scale). This is the most recent academic result and can serve as the primary outcome variable. |

## Key Notes

### Grading Context
Bangladesh uses a GPA scale of 0 to 5. A common classification framework is:
- **Excellent:** GPA ≥ 4.5
- **Good:** GPA 4.0–4.49
- **Average:** GPA 3.0–3.99
- **Poor:** GPA < 3.0

A pass threshold is typically GPA ≥ 2.0.

### Data Quality
- The dataset contains 1,000 rows with no documented missing values based on the provided metadata.
- All categorical columns use consistent string labels (e.g., `Yes`/`No`, `Public`/`Private`).
- `Family_Income_BDT` is recorded as an integer representing monthly income; values in the sample range from approximately 35,000 to 58,000 BDT.
- GPA columns (`Previous_GPA`, `SSC_Result`, `HSC_Result`) are floating-point values on the 0–5 scale. Some values may reach exactly 5.0.

### Analytical Considerations
- The dataset enables analysis across multiple dimensions: gender, geography (district), school type, socio-economic status (income, parent education), learning environment (internet access, private tuition), and student behavior (study hours, attendance).
- The three GPA columns allow longitudinal analysis of academic progression from previous performance through SSC to HSC.
- District-level analysis can reveal regional educational disparities across Bangladesh.
- The combination of binary features (Internet_Access, Private_Tuition) with continuous outcomes makes this dataset suitable for both segmentation analysis and correlation studies.