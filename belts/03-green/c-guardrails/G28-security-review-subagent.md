---
title: "Using a subagent for security review"
slug: "belts/green/security-review-subagent"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 28
time_minutes: 20
audience: "experienced-builder"
outcome: "Spawn a subagent for security review with a clean brief, consume the structured findings, and act on what is real without wasting context on noise."
prev: "belts/green/blade-compliance-skill"
next: "belts/green/boss-fight"
pillar: "harness"
belt: "green"
tags: ["green-belt", "security-review", "subagent", "skill-pattern"]
updated: "2026-04-29"
---

# G.28 — Using a subagent for security review

The last named skill in Part C. Where G.26 is the PR-level structural gate and G.27 is the per-file UI scan, **the security-review subagent** is the per-PR security pass — a focused, fresh-context agent that reads the diff specifically for security-shaped concerns. The subagent pattern from G.8 makes this work without polluting the main session's context.

---

## If you're short on time

- Spawn a subagent with a tight brief: "review this diff for the four redline categories, prompt-injection escalation paths, capability creep, and any of these specific patterns." Get a structured artefact back.
- The subagent's working notes do not pollute your main session. Only the findings return.
- Treat the subagent as a stuck-but-careful colleague: name disagreements with evidence; do not capitulate to confident wrongness (G.21 applies).

> **Where this lives.** The skill is at [`skills/security-review-subagent/`](../../../skills/security-review-subagent/). The chapter describes the pattern; the skill packages it. The skill's brief is the canonical security-review brief — edit it once, every invocation gets the new policy.

---

## Why a subagent

Two properties make a subagent the right harness for security review.

**Property 1 — A fresh context window.** A subagent has no prior conversation context. The findings are not coloured by your "this should work" pattern. Same logic as G.8: a fresh agent reads the diff with no bias.

**Property 2 — Bounded brief, bounded result.** A subagent is a one-shot specialist. You write a tight brief; it produces a structured artefact; only the artefact returns to your main session. The diff itself, the analysis chain, the dead-end hypotheses — all stay in the subagent's context, not yours.

The same logic could route through a skill that spawns a subagent (the program-pinned plugin may package this as `/security-review`). For Green Belt builders, knowing the *pattern* matters more than knowing the specific invocation; the pattern composes whether the trigger is a slash command, a manual subagent spawn, or a hook firing on PR creation.

---

## The brief

A useful security-review brief, copy-paste shape:

> Read the current branch's diff against `<base>`. Review specifically for security-shaped concerns. Apply these checks:
>
> **1. Redlines.** Any plaintext credentials, money-handling identifiers, raw PII, or regulator-protected fields surviving in the diff. Cite the line.
>
> **2. Prompt-injection capability creep.** Any new agent invocation in the diff that gives an agent broader capability than its task requires (e.g., a summary agent that can also send emails). Cite the file and the missing capability limit.
>
> **3. Untrusted input handling.** Any new code path that ingests untrusted text (customer messages, webhook payloads, scraped content) and treats it as instructions to an agent rather than as data. Cite the line and the trust-boundary failure.
>
> **4. Output exposure.** Any new code path that returns model output to an end user without going through an output classifier. Cite the line and the classifier-bypass.
>
> **5. SQL or injection-vulnerable shape.** Any new database query that interpolates user input directly. Cite the line.
>
> **6. Unscoped capabilities.** Any new permission, MCP connector grant, or hook that increases the scope of what an agent can do without an explicit justification in the PR description. Cite.
>
> For each finding, name: the rule violated, the file and line, the specific risk in one sentence, a suggested fix. If no findings, say so explicitly. Do not modify any code. Return Markdown with one section per finding.

That brief takes thirty seconds to copy-paste-modify. The subagent does the work in under a minute. The result returns as a structured Markdown artefact your main session can consume in another two minutes.

---

## A worked example

Suppose your PR adds a customer-content summary feature. You spawn the subagent with the brief above.

**Subagent's findings:**

> **Finding 1 — Layer 2 (Capability creep)**
> File: `apps/agents/customer-summary.ts`, line 47.
> Rule: agents that read customer content should not also have outbound-email capability.
> Risk: a successful prompt injection in a ticket body could direct the agent to send the customer database to an external email.
> Suggested fix: separate the summary agent from any send-capable agent; route summary results through a controlled endpoint that does not have email scope.
>
> **Finding 2 — Layer 4 (Output exposure)**
> File: `apps/agents/customer-summary.ts`, line 92.
> Rule: model output to end users must route through the output classifier.
> Risk: a summary that leaks PII the classifier would have caught reaches the user.
> Suggested fix: add the classifier call before returning; or route through the proxy's standard response path.
>
> **Findings 3–6:** No issues identified.
>
> Summary: 2 findings, both addressable without major rework.

You read the artefact, agree with both findings, fix both (Finding 1 is a thirty-minute refactor that separates the summary agent from email scope; Finding 2 is a five-minute wire-up to the classifier), re-run, ship.

---

## When to push back

The subagent is sometimes confidently wrong. G.21's discipline applies.

**Tell 1.** A finding cites a contradiction with something you know is true ("this code path is a write" when you can see it is read-only).

**Tell 2.** A finding is conveniently complete, explaining everything in one rule when the situation has nuance.

**Tell 3.** The subagent's "rule cited" does not match the program's actual policy.

**Tell 4.** Your reasoning has stopped; you are copying the subagent's findings into a ticket without thinking.

The push-back move is the same as G.21: state the disagreement with evidence; ask the subagent to reconcile; if two rounds do not converge, spin up a fresh subagent or escalate to a human reviewer.

---

## When NOT to use the subagent

**A change with no security surface.** A doc-only PR, a CSS-only PR, a PR that touches no agent invocations and no untrusted-input paths. The pre-ship-check Layer 1 already handles redline scanning; a full security subagent is overkill.

**A small change.** A one-line bug fix in a known-safe file. Run pre-ship-check; do not spawn a subagent.

**A change in a high-stakes path.** PCI scope, KYC flow, settlement code paths. These need a *human* security reviewer, not a subagent. The subagent is *part of* the defence; it is not the whole defence.

**The boss fight in Part C** explicitly requires a teammate's sign-off on prompt craft (sub-requirement (e)); for high-stakes changes, the reviewer is also the security-shaped reviewer. The subagent helps the reviewer's prep; it does not replace the reviewer.

---

## How this composes with G.26 and G.27

**G.26 — pre-ship-check (PR gate).** Six layers; Layer 1 is redlines. Necessary for every PR.

**G.27 — Blade-compliance reviewer (per-file UI scan).** File granularity; design-system focus.

**G.28 — Security-review subagent (per-PR security pass).** Per-PR; security focus; spawned on demand for changes with non-trivial security surface.

The three compose. A typical Green-Belt-grade product PR runs all three: pre-ship-check on the whole PR (G.26), Blade-compliance on UI files (G.27), and the security-review subagent on the diff (G.28). Total time: under fifteen minutes. The boss fight in Part C expects all three.

---

## What this chapter is not

**Not a substitute for human security review.** The subagent surfaces; the human reviewer judges. Especially for high-stakes paths.

**Not a "scan once, ship forever" tool.** Run on every PR with non-trivial security surface. Caching the brief makes this cheap.

**Not a way to bypass formal security review.** The program has a separate process for changes that need formal security signoff (PCI scope, KYC flows, etc.). The subagent is part of the daily-loop pre-flight; it is not the formal process.

---

## Common failure modes

**Spawning the subagent without a brief.** "Check this for security issues." The subagent generates plausible-sounding findings without grounding. Fix: copy-paste a real brief.

**Capitulating to a confidently wrong finding.** Same anti-pattern as G.21. Fix: name disagreements with evidence; force reconciliation.

**Treating the subagent as the whole defence.** It is one layer. Fix: G.26 + G.27 + human review still apply.

**Letting the subagent's working notes leak into the main session.** That defeats the budget benefit. Fix: confirm your invocation pattern keeps the subagent's context separate.

**Skipping it on PRs that "look safe."** A PR that adds an agent invocation always has security surface. Fix: any PR that touches an agent gets the subagent.

**Running it after the human review.** The subagent is pre-flight; the human review is the destination. Fix: subagent before opening the PR, or as part of the pre-PR sequence.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I spawn a security-review subagent with a tight brief on every PR with non-trivial security surface, push back on confidently wrong findings, and use it as one layer alongside G.26 / G.27 / human review.
- 🟡 YELLOW — I have used the pattern but sometimes skip it on PRs I assume are safe.
- 🔴 RED — I have not used a security-review subagent and have shipped agent-invocation PRs without an explicit security pass.

---

## What you can say after this module

> "I spawn a security-review subagent with a tight brief on every PR that touches an agent invocation or untrusted input. I read the structured findings, push back on confidently wrong ones, and treat the subagent as one layer alongside the pre-ship-check, the Blade-compliance reviewer, and human review."

---

## Where to go next

You have finished Part C. **Boss Fight G-B — The double-ship** is the test of all three Parts together. Two merged PRs (one product, one greenfield), the five sub-requirements, the cross-belt retro, the teammate sign-off on prompt craft.

**Previous:** [← G.27 Blade-compliance reviewer skill](G27-blade-compliance-skill.md) · **Next:** [→ Boss Fight G-B](boss-fight-GB-double-ship.md)

**Further reading**

- [G.8 — Subagents](../a-craft/G08-subagents.md) — the harness pattern this chapter builds on
- [G.21 — Debugging the hard kind](../b-practices/G21-debugging-hard-kind.md) — how to push back when the subagent is wrong
- [G.25 — Prompt injection](G25-prompt-injection.md) — the threat model the subagent reviews against
- [G.26 — pre-ship-check skill](G26-pre-ship-check-skill.md) — the structural complement
- [Appendix C — Skills Library](../../../appendices/C-skills-library/README.md)
