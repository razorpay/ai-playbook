---
name: security-review-subagent
description: Spawn a security-review subagent with the canonical six-check brief and consume the structured findings. The skill reviews a branch's diff for redlines, prompt-injection capability creep, untrusted-input handling, output exposure, injection-vulnerable shapes, and unscoped capabilities. Trigger phrases include "run security-review on this branch", "/security-review", "spawn a security-review subagent for this PR", "security-check this diff". The skill returns a structured Markdown artefact with one section per finding. Use on any PR that touches an agent invocation, an MCP connector grant, untrusted-input ingestion, or a new external surface; the Green Belt boss fight assumes this skill has run on the product-repo PR before review.
---

# Security-Review Subagent

## Overview

This skill spawns a fresh-context subagent with the canonical security-review brief from `brief-template.md` and returns the structured findings to the main session. It is the per-PR security pass that complements `pre-ship-check`'s structural gate (Layer 1's redline scan in particular) and `blade-compliance-reviewer`'s per-file UI scan. Together the three skills form the Green Belt review surface.

The subagent pattern matters. A subagent has no prior conversation context, so its findings are not coloured by the builder's "this should work" pattern. The subagent's working notes do not return to the main session — only the structured artefact does. This protects both the main session's context budget and the impartiality of the security review.

## Hard Rules

- Never modify any code. The skill surfaces; the builder decides.
- Never produce findings without citing files and lines.
- Never include literal redline values in the output; redact to a shape.
- Never invent rules; if a concern does not fit one of the six checks, surface it under a "Notes" section with a clear caveat.
- The subagent's working notes do not return to the main session; only the structured artefact does.
- Never substitute for human security review on high-stakes paths (PCI scope, KYC flows, settlement code paths). The skill is one layer; not the whole defence.
- Never run on a PR with no security surface (a doc-only or CSS-only PR); the skill politely declines and recommends `pre-ship-check` instead.

## Inputs

- The current branch (default: `git rev-parse --abbrev-ref HEAD`).
- The base branch (default: `main`; configurable via the team's CLAUDE.md).
- The brief template (`brief-template.md` next to this SKILL.md).
- The team's CLAUDE.md for any team-specific security conventions (loaded automatically).

If any required input is missing, the skill reports the missing input and stops.

## Outputs

A structured Markdown report with one section per finding, plus a header and a summary line:

```markdown
Security-review subagent report

Branch: <branch-name>
Base: <base-branch>
Run at: <YYYY-MM-DD HH:MM TZ>
Brief version: <version-from-brief-template.md>

[per-finding sections]

Summary: <count> finding(s). <one-line summary or "No security findings under any of the six checks.">
```

Each finding section follows the shape from `brief-template.md`:

```markdown
### Finding <N> — Check <X> (<rule-name>)
File: <path>, line <number>
Risk: <one sentence>
Suggested fix: <one or two sentences>
```

The report is reviewer-readable in under two minutes; downstream tools can extract findings via the `### Finding` markers.

## Workflow

1. **Resolve inputs.** Identify branch and base. Load the brief template. Confirm the team's CLAUDE.md is loadable.

2. **Decide whether to run.** Inspect the diff at a high level. If the diff has no security surface (doc-only changes, CSS-only changes with no agent or connector references), report "no security surface; recommend `pre-ship-check` instead" and stop.

3. **Construct the brief.** Read `brief-template.md`. Substitute `<branch-name>` and `<base-branch>` placeholders. Hold the brief in working memory.

4. **Spawn the subagent.** Pass the brief as the first message to a fresh-context subagent. The subagent has no prior conversation history; its only inputs are the brief and the diff (which the brief instructs it to read).

5. **Wait for findings.** The subagent applies the six checks per the brief. It returns one Markdown artefact.

6. **Compose the report.** Take the subagent's findings and emit them with the canonical header (branch, base, run-at, brief version) and summary line.

7. **Print to chat.** The report goes to the main session for the builder to consume. The builder decides whether to act on each finding (G.21's pushback discipline applies if the subagent is confidently wrong).

## What this skill does NOT do

- It does not modify code.
- It does not replace `pre-ship-check`. The two compose; pre-ship-check is the structural gate, this skill is the per-PR judgement complement.
- It does not run formal security review for high-stakes paths (PCI scope, KYC flows). Those have a separate process; this skill is daily-loop pre-flight.
- It does not write to disk, post to messaging platforms, or send notifications.
- It does not store the subagent's working notes; only the structured artefact returns.

## Trigger phrases

- "run security-review on this branch";
- "/security-review";
- "spawn a security-review subagent for this PR";
- "security-check this diff";
- "is this safe to ship from a security perspective".

## When NOT to use this skill

- A doc-only PR (no agent invocations, no untrusted-input ingestion).
- A CSS-only PR with no behavioural changes.
- A small bug fix in a known-safe file with no security surface.
- A change in PCI scope or KYC flow — those need a *human* security reviewer, not a subagent. The skill is *part of* the defence; it is not the whole defence.

## References

- `brief-template.md` — the canonical brief the subagent receives.
- `README.md` — maintainer notes.
- `test-cases.md` — acceptance scenarios.
- [G.8 — Subagents](../../belts/03-green/a-craft/G08-subagents.md) — the harness pattern.
- [G.21 — Debugging the hard kind](../../belts/03-green/b-practices/G21-debugging-hard-kind.md) — how to push back when the subagent is wrong.
- [G.25 — Prompt injection + output classifiers](../../belts/03-green/c-guardrails/G25-prompt-injection.md) — the threat model the subagent reviews against.
- [G.28 — Using a subagent for security review](../../belts/03-green/c-guardrails/G28-security-review-subagent.md) — the chapter that describes this skill at the contract level.
- [Appendix C — Skills Library](../../appendices/C-skills-library/README.md).
- [Appendix H — Reference Cards](../../appendices/H-reference-cards/README.md) — the canonical redline cards.

## Versioning

This skill is at v0.12 alpha. The brief is the policy; bump the skill version when the brief changes shape or when the output structure changes. Downstream tools depend on shape stability.
