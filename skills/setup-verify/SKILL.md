---
name: setup-verify
description: Runs the 10-point environment health check the playbook uses to gate White Belt's Quest W-0. Produces GREEN / YELLOW / RED status per check with one-line fixes for any non-green result. Activate when the user runs the setup script, finishes onboarding, or asks "am I set up correctly".
---

# setup-verify

## Triggers

Activate when the user says "run setup-verify", "verify my setup", "am I set up correctly", or "what colour am I". Activate proactively when the user has just finished running the setup script. Activate when the user reports that something is not working and the cause might be environmental.

## Body

The skill runs ten checks in order. Each check produces one of three statuses.

- **GREEN.** The check passes. No action needed.
- **YELLOW.** The check passes but with a caveat (version slightly behind pinned, optional component missing, non-blocking warning). The setup is functional; the user should fix when convenient.
- **RED.** The check fails. The user cannot proceed with the curriculum until this is resolved.

The ten checks are documented in `checks.md`. Each check has a fix documented in `one-line-fixes.md`. The output format is documented in `output-shape.md`.

### Workflow

1. Read the user's environment state. Use the shell to query versions, run health probes, and check installed components. Do not modify the environment.
2. Run each of the ten checks in order. Record status (GREEN / YELLOW / RED) and the specific signal (version number, error message, command output) that produced it.
3. For each non-green check, look up the one-line fix from `one-line-fixes.md`.
4. Produce a structured report per `output-shape.md`. The report is ready to paste into `#ai-help` if the user is YELLOW or RED after one hour of attempting fixes.
5. Surface the overall colour: GREEN if all ten checks are GREEN, YELLOW if any are YELLOW (and none RED), RED if any are RED.

The skill does not modify the user's environment. It diagnoses. The user runs the fixes themselves.

## Modes

The skill has two modes.

- **Default mode.** Runs all ten checks. Used by Quest W-0 and by any "am I set up" prompt.
- **Single-check mode.** Runs a named check only. Used when the user knows which check is failing and wants to re-verify after a fix attempt. The user names the check by its number or short name (for example, "re-run check 7" or "re-verify Compass plugin").

## When to refuse

- The user asks the skill to *fix* the environment. The skill diagnoses; it does not modify. Refuse and surface the relevant one-line fix instead.
- The user asks the skill to bypass a RED status to proceed with the curriculum. Refuse; the gate exists for a reason. Surface the fix and offer to re-verify once the user has applied it.
- The user is running the skill in a non-development environment (production server, shared CI host). Refuse with a clear note; setup-verify is for individual developer machines.

## Output shape

See `output-shape.md` for the structured format. The summary form:

- A header line naming the overall colour and the cohort-relevant context (e.g., "Overall: RED — Quest W-0 not yet claimable").
- A per-check table showing each check's status and the specific signal.
- A "What to fix first" section listing the RED checks (then YELLOW), each with the one-line fix from `one-line-fixes.md`.
- A footer line naming when to escalate ("Post this report in #ai-help if any RED check persists after one hour").

## Reference files

- `checks.md` — the ten checks in detail, the environmental signal each one reads, and the criteria for each status.
- `one-line-fixes.md` — the one-line fix for each non-green status, with deeper-fix pointers where the issue is structural.
- `output-shape.md` — the structured report format and the worked example.
- `test-cases.md` — acceptance scenarios used to verify the skill behaves correctly.

## External references

- [W.4 — Your auth setup](../../belts/01-white/W04-auth-setup.md), [W.5 — Installing the stack](../../belts/01-white/W05-installing-the-stack.md), [W.6 — The LLM Gateway](../../belts/01-white/W06-llm-gateway.md), [W.7 — Compass plugin](../../belts/01-white/W07-compass-plugin.md), [W.8 — GREEN / YELLOW / RED](../../belts/01-white/W08-green-yellow-red.md). The White Belt chapters that produce the environment this skill verifies.
- [Quest W-0 — Turn GREEN](../../belts/01-white/quest-W0-turn-green.md). The quest this skill gates.
- [Appendix B — Environment Setup](../../appendices/B-environment-setup/README.md). The reader-facing reference for the same material.
