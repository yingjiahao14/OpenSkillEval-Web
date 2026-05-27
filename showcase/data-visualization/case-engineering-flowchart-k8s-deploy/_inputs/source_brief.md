# Kubernetes Multi-Environment Deployment Pipeline

## Overview
This dataset describes a Kubernetes deployment pipeline spanning four environments (dev, staging, canary, production) with automated rollback mechanisms, blue-green traffic switching at the production stage, and HPA (Horizontal Pod Autoscaler) scaling decision points at every environment.

## Data Source

### pipeline_nodes
34 nodes representing pipeline steps. Fields: `id` (string, unique identifier), `label` (string, human-readable name), `lane` (string: dev | staging | canary | production | global), `type` (string: action | check | decision | hpa_decision | hpa_action | rollback | terminal), `order` (integer, sequencing hint). Some nodes carry additional threshold fields such as `cpu_threshold_pct`, `mem_threshold_pct`, `error_rate_threshold_pct`, `p99_latency_ms_threshold`, `traffic_pct`, and `duration_min`.

### pipeline_edges
48 directed edges. Fields: `from` and `to` (node id references), `type` (string: forward | rollback | hpa_branch | blue_green), `label` (string, condition or annotation on the edge).

### hpa_policies
4 rows, one per environment. Fields: `environment`, `min_replicas`, `max_replicas`, `cpu_target_pct`, `mem_target_pct`, `scale_up_cooldown_sec`, `scale_down_cooldown_sec`. Replica counts are integers; thresholds are percentages.

### environment_config
4 rows. Fields: `environment`, `namespace`, `gate_error_rate_pct` (float), `gate_p99_latency_ms` (integer or null), `traffic_strategy` (string: direct | weighted_canary | blue_green), `rollback_auto` (boolean), `approval_required` (boolean).

## Data Notes
- Threshold values tighten progressively from dev to production (e.g., error-rate gate: 5% → 2% → 1% → 0.5%).
- The canary stage uses three progressive traffic ramp steps (10% → 25% → 50%) before the production gate.
- Blue-green switching applies only to the production environment; other environments use direct or weighted-canary strategies.
- HPA scale-up and scale-down nodes are shared (global lane) and referenced from each environment's HPA check.