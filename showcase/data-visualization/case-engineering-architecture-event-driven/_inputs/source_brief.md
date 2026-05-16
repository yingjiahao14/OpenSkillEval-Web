# Event-Driven Architecture Panorama

## Overview
This dataset describes a complete event-driven microservice architecture comprising 6 services communicating via Apache Kafka topics, with Schema Registry for schema governance, Dead Letter Queues for error handling, configurable retry strategies, and a Prometheus-based monitoring and alerting pipeline.

## Data Source

### microservices
Defines 6 services with fields: `id` (string, unique identifier), `name` (string), `role` (enum: producer|consumer|producer-consumer), `domain` (string), `produces_topics` and `consumes_topics` (arrays of topic name strings), `retry_policy` (string), `health_endpoint` (URL path), `alert_threshold_lag_ms` (integer, milliseconds).

### kafka_topics
11 Kafka topics including 7 business event topics and 4 DLQ topics. Fields: `topic_name` (string), `partitions` (integer, 2-12), `replication_factor` (integer, always 3), `retention_hours` (integer, 72-720), `schema_subject` (string or null for DLQ), `avg_msg_size_bytes` (integer), `peak_throughput_msg_sec` (integer), `category` (enum: order|payment|inventory|shipping|dlq).

### event_flows
33 directed edges representing produce, consume, DLQ-produce, and schema-lookup connections. Fields: `id`, `source`, `target`, `flow_type` (enum: produce|consume|dlq-produce|schema-lookup), `protocol` (async or sync-http), plus optional `consumer_group`, `serialization`, `trigger`, `direction`.

### retry_policies
5 rows defining retry behavior per consumer service. Fields: `strategy` (exponential-backoff|fixed-interval|none), `initial_delay_ms`, `max_delay_ms`, `multiplier`, `max_retries`, `dlq_topic`, `jitter` (boolean).

### monitoring_alerting
15 rows describing the observability pipeline from metric scraping through dashboards to alert routing. Fields: `source`, `target`, `metric_type`, `metric_name`, `scrape_interval_sec` (integer or null).

## Data Notes
- DLQ topics have no associated schema subject as they store raw failed messages with error metadata.
- Peak throughput values are estimates based on load testing scenarios.
- The Analytics Service has no retry policy and no DLQ, as it performs best-effort consumption.
- All async communication uses Avro serialization validated against Schema Registry.