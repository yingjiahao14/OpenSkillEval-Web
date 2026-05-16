# ML Infrastructure Architecture Dataset

## Overview
This dataset describes a complete machine learning infrastructure architecture as a directed graph of system components (nodes) and data/control flows (edges). It covers the full ML lifecycle from data ingestion through model serving and operational monitoring, including cross-cutting concerns like data lineage and version control.

## Data Source

### ml_architecture
A graph structure with two arrays: `nodes` and `edges`.

**Nodes** (9 total):
- `id` (string): unique identifier for the component
- `label` (string): display name, may include sub-labels for technology stack
- `layer` (string): architectural layer — one of data, compute, serving, observability, cross-cutting
- `sub_components` (array of strings): specific technologies or sub-systems within the node
- `criticality` (integer, 1–10): operational criticality score
- `category` (string): visual grouping category — data-layer, compute-layer, serving-layer, observability-layer

**Edges** (15 total):
- `source` / `target` (string): node IDs
- `flow_type` (string): one of primary, feedback, lineage
- `throughput_gbps` (float): data throughput in gigabits per second, range 0.1–12.5
- `label` (string): short description of what flows along the edge

## Data Notes
- Throughput values are representative estimates for a mid-scale ML platform
- Criticality scores are subjective team assessments
- The graph contains cycles via feedback edges (monitoring → data platform, monitoring → training cluster)