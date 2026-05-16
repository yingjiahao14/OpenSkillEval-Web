Build a 9-slide, 16:9 analytical presentation titled "Auditing Model Substitution in LLM APIs: Why Software Tests Fail and Hardware Attestation Wins" for ML researchers, AI security practitioners, and cloud infrastructure engineers evaluating LLM API integrity.

The narrative arc begins by establishing the economic incentives behind covert model substitution in commercial LLM APIs, then systematically demonstrates through empirical evidence why software-based detection methods—statistical tests, log-probability fingerprinting, and benchmark comparisons—are fundamentally unreliable. The deck concludes by presenting Trusted Execution Environments as the provably secure, actionable alternative for verifiable inference.

For the "Quantization Benchmark Drop" slide, include a structured data table comparing original vs. FP8-quantized scores across MMLU, GSM8K, MATH, and GPQA Diamond for five model families, using values from the source brief. For the "Software-Only Auditing Methods" slide, present a comparison matrix summarizing the three failure modes (text-based statistical tests, log-probability methods, adversarial countermeasures) with columns for method type, weakness, and practical limitation. Reference figure_1.jpg for the temperature-scaling slide and figure_5.jpg for the log-probability nondeterminism slide where applicable.

Maintain an evidence-driven, technical tone throughout. Do not fabricate data not found in source_brief.md.


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
