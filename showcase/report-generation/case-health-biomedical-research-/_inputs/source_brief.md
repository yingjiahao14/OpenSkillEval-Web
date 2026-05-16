# Biomedical Research Abstracts 2024–2026

## About the Dataset

This dataset contains **126,832 cleaned biomedical research abstracts** sourced from the NCBI PubMed database, covering publications from **January 2024 through March 2026**. It was published on Kaggle (kanchana1990/biomedical-research-abstracts-20242026) and provides a rich snapshot of recent biomedical research output worldwide.

Each record includes the full abstract text, publication metadata, MeSH-indexed keywords, author count, country of first-author affiliation, and open-access status.

**File:** `biomedical_research_abstracts_2024_2026.csv`  
**Rows:** 126,832  
**Columns:** 17

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| `pmid` | Integer | Unique PubMed identifier for each article |
| `title` | String | Full article title |
| `abstract` | String | Full cleaned abstract text (50–1,000 words after QA filtering) |
| `abstract_words` | Integer | Word count of the abstract |
| `journal` | String | Name of the publishing journal |
| `pub_year` | Integer | Publication year; values are 2024, 2025, or 2026 |
| `pub_month` | String | Publication month as text (e.g., "Jan", "Feb"); may be "Unknown" |
| `pub_month_num` | Integer | Publication month as integer (1–12); 0 indicates unknown month |
| `month_year` | String | Combined label, e.g., "Jan-2024" or "Unknown-2024" |
| `doi` | String | Digital Object Identifier; may be empty for some records |
| `authors_count` | Integer | Number of listed authors on the publication |
| `country` | String | Country of the first author's affiliation |
| `research_type` | String | PubMed publication type(s), e.g., "Journal Article", "Review", "Case Report", "Systematic Review", "Preprint"; may contain multiple types |
| `keywords` | String | MeSH descriptor terms, semicolon-separated; may be empty |
| `major_topic` | String | Primary MeSH major topic; may be empty |
| `language` | String | Publication language — all records are English ("eng") |
| `open_access` | Boolean | True if the article is available via PubMed Central (PMC) |

## Key Data Quality Notes

1. **Temporal imbalance by design:** Approximately 80% of records are from 2024, reflecting real-world PubMed indexing patterns where older publications accumulate more indexed entries over time. 2025 and 2026 have progressively fewer records. This is intentional and should be acknowledged in any temporal analysis.

2. **Unknown months:** Some records have `pub_month` = "Unknown" and `pub_month_num` = 0. The `month_year` field will read "Unknown-2024" etc. These should be handled carefully in monthly trend analyses.

3. **Missing MeSH data:** The `keywords` and `major_topic` columns can be empty strings for records that have not yet been MeSH-indexed. This is common for newer publications.

4. **Missing DOIs:** The `doi` field may be blank for some articles (e.g., conference proceedings).

5. **Multi-value research_type:** The `research_type` field may contain multiple publication types separated by delimiters for a single record.

6. **Country field:** Represents the first author's country of affiliation. Common values include "USA", "UK", "China", "India", "Spain", "Indonesia", etc. Some records may have missing or non-standardized country names.

7. **QA/QC applied:** The dataset underwent deduplication by PMID and title, garbage/placeholder text removal, XML corruption detection, abstract length filtering (50–1,000 words), and date-range scope filtering prior to publication.

## Analytical Considerations

When analyzing this dataset, keep in mind that the temporal skew is a real-world artifact, not a data error. Comparisons across years should use rates or normalized metrics rather than raw counts. The MeSH keyword and major topic fields are valuable for topic analysis but require handling of missing values. The `authors_count` field serves as a useful proxy for collaboration intensity across countries and research types.