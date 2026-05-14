# security-review-subagent — Maintainer README

> **What this is.** Maintainer-facing notes for `skills/security-review-subagent/`. The Razorpay-shipped per-PR security pass that spawns a fresh-context subagent with a canonical brief.

---

## Why this skill exists

A reviewer's main session has the builder's bias — "this should work." A fresh-context subagent does not. The skill exists to put deterministic, auditable security review into the daily PR loop without paying the cost of a full main-session detour.

Three properties that justify the subagent over a main-session check:

1. **Fresh context.** No prior conversation; no bias toward the change being right.
2. **Bounded brief.** The subagent receives a fixed brief; results are deterministic across runs.
3. **No context pollution.** The subagent's working notes do not return to the main session; only the structured artefact does.

The skill is one layer of the daily-loop security defence. It composes with `pre-ship-check` (PR-level structural gate) and `blade-compliance-reviewer` (per-file UI scan). Together the three skills make Green Belt review surface deterministic.

---

## Files in this directory

| File | Purpose |
|---|---|
| `SKILL.md` | The skill definition Claude Code loads. |
| `README.md` | This file. Maintainer notes. |
| `brief-template.md` | The literal brief the skill passes to the spawned subagent. The contract. |
| `test-cases.md` | Acceptance scenarios. |

---

## How the brief composes

The `brief-template.md` carries:

- six numbered security checks (redlines, capability creep, untrusted-input, output exposure, injection-vulnerable shapes, unscoped capabilities);
- the literal output shape the subagent must produce;
- explicit refusals (no code modifications, no literal redline values, no invented rules).

The skill substitutes branch and base placeholders at runtime; everything else is fixed. This is intentional: a fixed brief produces deterministic results. A varying brief produces inconsistent reviews.

---

## When to update each file

| Change | Action |
|---|---|
| New security check (e.g., a new threat shape) | Add a numbered check to `brief-template.md`; update SKILL.md Workflow; add a test case. |
| Tightening an existing check | Edit the check text in `brief-template.md`; add a test case if the failure mode changes. |
| Output shape changes | Edit `brief-template.md` OUTPUT SHAPE section AND SKILL.md Outputs section; bump skill version. |
| Trigger-phrase additions | Edit SKILL.md frontmatter description. |
| New "do NOT use" pattern | Edit SKILL.md "When NOT to use this skill" section. |

The dependency direction is: chapter (G.25 / G.28) → policy (`brief-template.md`) → skill behaviour. Always update upstream first.

---

## Running the skill locally

```
claude
> run security-review on this branch
```

The skill expects:

- a checked-out git branch with a remote-tracked base;
- the team's CLAUDE.md loadable;
- the brief template loadable (lives next to the SKILL.md).

If the diff has no security surface, the skill politely declines and recommends `pre-ship-check` instead. This is intentional — running the skill on a doc-only PR is overhead with no value.

---

## Vendoring into the program plugin

Same path as the other v0.12 skills: in-repo for v0.12; vendored into the Compass plugin in a later cycle. The skill name `security-review-subagent` is intended to be unique within the loaded plugin.

---

## Testing

`test-cases.md` covers four scenarios: clean PR with security surface, capability-creep finding, prompt-injection finding, output-exposure finding, plus a "no security surface" path. Manual run for v0.12; cohort use generates real-test signal.

---

## Boundary with chapters

This skill applies the threat model from G.25 (prompt injection + output classifiers) and the harness pattern from G.8 (subagents). If the chapters' policies change, the brief follows. The skill never substitutes for the chapters; reading G.25 and G.28 is what teaches the *why* behind each finding.

---

## Boundary with formal security review

The skill is *part of* the security defence, not the whole. For high-stakes paths — PCI scope, KYC flows, settlement code paths — the program runs a separate formal security review. The subagent does not substitute for that process; it makes the daily-loop pre-flight more reliable.

If a finding from this skill suggests a high-stakes change is in flight, the right move is to escalate to the formal security review process, not to argue with the subagent about whether the finding is severe enough.

---

## Content rules

This skill follows the playbook's content rules:

- no personal names;
- no internal-doc paths;
- no FSB-1/2/3 vocabulary;
- public references (Anthropic Claude Code skill docs, Simon Willison on prompt injection, Appendix H) are fine when they earn a footnote.

The lint sweep on a release greps the standard violation list across this directory.
