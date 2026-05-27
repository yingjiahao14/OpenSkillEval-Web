# E-Commerce Platform Architecture

## Overview
This dataset describes a microservices-based e-commerce platform architecture comprising 3 application tiers (Access, Business, Data), 12 application services, shared infrastructure components, and an observability/service-mesh layer. Nodes and edges define the full topology.

## Data Source

### architecture
A graph structure with `nodes` and `edges`.

**Nodes** (23 total): Each node has:
- `id` (string): unique identifier in kebab-case
- `label` (string): human-readable name
- `tier` (string): one of "Access", "Business", "Data", "Observability"
- `type` (string): "service", "infrastructure", "observability", or "service_mesh_control"
- `subtype` (string, optional): "cache", "message_queue", or "database" for infrastructure nodes
- `service_mesh` (boolean): whether the node has an Istio sidecar proxy

**Edges** (44 total): Each edge has:
- `source` / `target` (string): node IDs
- `connection_type` (string): "sync" or "async"
- `protocol` (string): communication protocol (gRPC, Kafka, SQL, Redis, REST, etc.)
- `proxied` (boolean): whether the call is routed through the service-mesh sidecar

## Data Notes
- The 12 application services span Access (API Gateway, CDN Edge, Auth, Rate Limiter) and Business (Product Catalog, Order, Payment, Inventory, User Profile, Recommendation, Notification, Search) tiers.
- Infrastructure nodes include Redis, Kafka, PostgreSQL (primary + replica), Elasticsearch, and MongoDB.
- Observability components (Jaeger, Prometheus, Grafana, EFK) collect telemetry from all mesh-enabled services via Istio; these implicit telemetry edges are not enumerated individually to reduce clutter.
- Async edges represent event-driven communication via Kafka or database replication.