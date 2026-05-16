# Data Lakehouse Architecture – Pipeline & Governance

## Overview
This dataset describes a modern data lakehouse architecture following the medallion pattern (Bronze → Silver → Gold). It captures 10 data sources across 5 categories, 3 ingestion modes, 5 medallion-layer datasets per tier, 6 consumption endpoints, 15 governance controls, and transformation summaries per layer.

## Data Source

### architecture_nodes
Each record represents a component in the architecture. Fields: `node_id` (string, unique identifier), `label` (display name), `layer` (one of: source, ingestion, bronze, silver, gold, consumption), `category` (grouping within layer), `daily_volume_gb` (numeric or null for consumption nodes), `format` (data format or technology). 34 nodes total.

### architecture_edges
Directed edges between nodes. Fields: `edge_id` (string), `source` and `target` (node_id references), `volume_gb` (numeric or null), `mode` (streaming | batch | cdc | query), `latency` (descriptive string). 38 edges total.

### governance_controls
Governance policies applied per layer. Fields: `control_id`, `layer` (architecture layer or cross-layer), `control_type`, `tool`, `scope`, `enforcement` (automated | policy-based | manual | scheduled). 15 records.

### transformation_summary
Counts of transformation types per medallion layer. Fields: `layer`, `transformation_type`, `count` (integer), `complexity` (low | medium | high). 12 records across bronze, silver, and gold.

## Data Notes
- Volume figures are illustrative daily averages; actual volumes vary by day.
- Some bronze volumes exceed source totals due to log fan-out and metadata enrichment.
- Consumption-layer nodes have null volume as they represent query-based access.
- Governance controls tagged as "cross-layer" apply to the entire pipeline.