# Aider LLM Polyglot Coding Leaderboard 2025

## What Is This Benchmark?

Aider is an AI pair-programming tool that runs in the terminal. To evaluate which large language models (LLMs) are best at autonomous code editing, Aider maintains a **polyglot coding leaderboard**. The benchmark tests each model on **225 challenging Exercism coding exercises** spanning **six programming languages**: C++, Go, Java, JavaScript, Python, and Rust. Models must follow instructions and produce correct code edits without any human intervention.

The primary metric is **percent correct** — the share of exercises where the model's code passes all tests after two attempts. Secondary metrics include total cost per benchmark run, correct edit format rate (how reliably the model follows the required diff format), and qualitative indicators like syntax errors and exhausted context windows.

## Top 15 Models — Ranked by Accuracy

| Rank | Model | Percent Correct | Cost | Edit Format | Correct Format % |
|------|-------|----------------|------|-------------|------------------|
| 1 | GPT-5 (high) | 88.0% | $29.08 | diff | 91.6% |
| 2 | GPT-5 (medium) | 86.7% | $17.69 | diff | 88.4% |
| 3 | Claude 4.0 Opus | 85.3% | $22.14 | diff-fenced | 97.3% |
| 4 | Claude 4.0 Sonnet | 84.0% | $9.47 | diff-fenced | 96.9% |
| 5 | Gemini 2.5 Pro | 82.7% | $4.92 | diff-fenced | 95.1% |
| 6 | o3 (high) | 82.2% | $18.35 | diff | 90.7% |
| 7 | GPT-5 (low) | 81.3% | $8.12 | diff | 85.8% |
| 8 | DeepSeek R1-0528 | 80.4% | $3.88 | diff-fenced | 93.2% |
| 9 | Claude 3.7 Sonnet | 79.6% | $7.81 | diff-fenced | 96.0% |
| 10 | o3 (medium) | 78.7% | $10.22 | diff | 89.3% |
| 11 | Gemini 2.5 Flash | 76.4% | $1.28 | diff-fenced | 93.8% |
| 12 | GPT-4.1 | 74.7% | $5.60 | diff | 88.0% |
| 13 | DeepSeek V3-0324 | 72.9% | $1.95 | diff-fenced | 91.5% |
| 14 | Claude 3.5 Sonnet | 72.0% | $6.33 | diff-fenced | 95.5% |
| 15 | o4-mini (high) | 71.1% | $4.47 | diff | 87.2% |

## Cost vs. Accuracy Highlights

Cost varies enormously across models. GPT-5 (high) delivers the best accuracy at **88.0%** but costs **$29.08** per full benchmark run. Meanwhile, **Gemini 2.5 Flash** achieves a respectable **76.4%** for just **$1.28** — roughly 23× cheaper. DeepSeek R1-0528 offers a compelling middle ground at **80.4% for $3.88**, making it one of the best value options on the board.

For teams optimizing cost-efficiency, models in the $1–$5 range (Gemini 2.5 Flash, DeepSeek V3, Gemini 2.5 Pro) deliver over 72% accuracy, which may be sufficient for many real-world coding tasks.

## Edit Format Compliance

Reliably following the edit format is critical for automated pipelines. Models using the **diff-fenced** format tend to have higher compliance rates (93–97%) compared to those using plain **diff** (85–92%). Claude models consistently lead in format compliance, with Claude 4.0 Opus reaching **97.3%** well-formed edits.

## Key Takeaways

- **GPT-5 (high) leads the board** at 88.0% accuracy but at a premium cost of ~$29.
- **Anthropic Claude 4.0 models** offer the best balance of accuracy and format reliability.
- **DeepSeek and Gemini models** provide strong performance at a fraction of the cost.
- The benchmark covers **6 languages and 225 exercises**, making it one of the most comprehensive polyglot code-editing evaluations available.
- Edit format choice matters: diff-fenced yields more reliable automated edits than plain diff.