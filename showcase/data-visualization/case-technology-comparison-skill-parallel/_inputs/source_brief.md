# AI Model Capability Benchmark Data

## Overview
Normalized benchmark scores for 10 large language models across 8 capability dimensions, designed for parallel coordinates visualization. Models span 5 families (GPT, Claude, Gemini, LLaMA, Qwen) with both flagship and lightweight variants per family.

## Data Source

### model_benchmarks
Each record represents one AI model with the following fields:
- **model** (string): Model name, e.g., "GPT-4o", "Claude 3.5 Sonnet"
- **family** (string): Model family grouping — one of GPT, Claude, Gemini, LLaMA, Qwen
- **Reasoning** (integer, 0-100): Complex multi-step reasoning benchmark score
- **Code Generation** (integer, 0-100): Programming and code synthesis score
- **Math / Quantitative** (integer, 0-100): Mathematical problem-solving score
- **Language Understanding** (integer, 0-100): NLU and reading comprehension score
- **Multimodal Understanding** (integer, 0-100): Image, video, and cross-modal reasoning score
- **Instruction Following** (integer, 0-100): Adherence to complex user instructions
- **Inference Speed** (integer, 0-100): Normalized throughput (higher = faster)
- **Knowledge Recall** (integer, 0-100): Factual knowledge and world knowledge retrieval

All scores are normalized to a 0-100 scale for cross-dimension comparability.

## Data Notes
- Scores are synthetic composites inspired by publicly reported benchmarks (MMLU, HumanEval, GSM8K, MMMU, MT-Bench, etc.) but do not correspond to exact published numbers.
- Inference Speed is inversely related to model size; lightweight variants score higher.
- Multimodal scores for text-only-focused models (LLaMA, Qwen) are notably lower, reflecting limited native multimodal capability.
- Each family includes one flagship and one smaller/faster variant to illustrate capability-efficiency trade-offs.