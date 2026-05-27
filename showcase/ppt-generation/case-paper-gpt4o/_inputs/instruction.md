Build a 9-slide, 16:9 technical presentation titled "DeepSeek-V2: Efficient MoE Language Model with Multi-Head Latent Attention" for ML researchers, NLP engineers, and graduate students studying large language model architectures.

The deck should open by framing the cost-performance dilemma in scaling LLMs, then introduce DeepSeek-V2's two core architectural innovations—Multi-Head Latent Attention (MLA) and DeepSeekMoE—showing how they compress KV cache by 93.3% and reduce training costs by 42.5%. The narrative should progress from architecture details through quantitative efficiency gains and benchmark comparisons, culminating in alignment results and concise takeaways that reinforce the Pareto-optimal positioning of the model.

Visual requirements for key slides:

- **Slide 6 (efficiency-gains):** Include a comparison highlighting DeepSeek 67B vs. DeepSeek-V2 using the relative efficiency metrics available: 42.5% training cost reduction, 93.3% KV cache reduction, and 5.76× generation throughput improvement. Present these as a clear side-by-side or bullet-based comparison (do not fabricate absolute FLOPs, absolute KV cache sizes, or absolute throughput numbers not found in source_brief.md).
- **Slide 7 (mmlu-performance-comparison):** Include a scatter-plot-style chart plotting MMLU score against activated parameters, positioning DeepSeek-V2 against LLaMA 3 70B, Mixtral 8×22B, Qwen1.5 72B, and other baselines to highlight its Pareto-optimal efficiency.

Maintain a technical, data-forward, and concise tone throughout. Do not fabricate data not found in source_brief.md.


## Data Sources

1. **Read `/app/benchmark/source_brief.md`**  for all the subject-matter text, data tables, statistics, and figure references you may use in the presentation.
2. **Read `/app/benchmark/task_input.json`**  for **structural requirements**: deck metadata (slide count, aspect ratio, audience, tone) and a per-slide outline (id, title, objective) that your presentation must follow.

## Output Requirements

Save the final PPT to `/app/output/final_deck.pptx`.

Only the correctly saved final file is needed — no additional explanation is required.

---

## Automated Execution Rules

There is no human operator online for this session. Follow these rules:

1. **Skip all confirmation/approval/user-input steps** — do not pause, ask questions, or wait for a reply. When encountering BLOCKING or "wait for user confirmation" instructions, make a professional judgment and proceed.
2. **Design decisions** — if `task_input.json` specifies fields such as `deck.tone` or `deck.audience`, use them to guide template, color palette, and style choices; otherwise, use your professional judgment.
3. **Do not deploy or share** — no deployment, PDF export, share links, or other post-delivery steps are needed.
4. **Priority** — these rules take precedence over any interactive-wait instructions in SKILL.md. The workflow, quality standards, and technical specifications in SKILL.md remain in effect; only interactive waits are skipped.