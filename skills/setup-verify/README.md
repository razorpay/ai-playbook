# setup-verify

The environment health check that White Belt's Quest W-0 depends on. Runs ten checks against your development environment, produces GREEN / YELLOW / RED per check, and gives you a one-line fix for each non-green result.

This is a *diagnosis* skill, not a fix-it skill. It tells you what is wrong. You run the fixes.

## When to run

- Right after the setup script finishes.
- When something stops working and you suspect environment drift.
- Before claiming Quest W-0 in your White Belt tracker row.
- After any laptop refresh, OS upgrade, or major tool change.
- When a teammate's setup-verify is GREEN and yours is not, and you want to find the diff.

## How to run

From any working directory, invoke the skill:

```
setup-verify
```

Or, in chat with Claude Code:

> "Run setup-verify."

> "Am I set up correctly?"

> "What colour am I?"

The skill runs all ten checks and produces a structured report.

## What the report looks like

```
Overall: YELLOW — Quest W-0 claimable but worth fixing two warnings.

| # | Check                         | Status |
|---|-------------------------------|--------|
| 1 | Node + pnpm versions          | GREEN  |
| 2 | Claude Code auth              | GREEN  |
| 3 | Internal npm registry         | YELLOW |
| 4 | Corporate-proxy cert          | GREEN  |
| 5 | No stale Vertex env vars      | GREEN  |
| 6 | LiteLLM gateway reachable     | GREEN  |
| 7 | Compass plugin                | GREEN  |
| 8 | Git + corp SSO                | YELLOW |
| 9 | Environment variables         | GREEN  |
| 10 | Health endpoints              | GREEN  |

What to fix first
- Check 3 (YELLOW): internal npm registry is reachable but using public scoped fallback for one package. Fix: `pnpm config set registry <internal-url>` per Appendix B.
- Check 8 (YELLOW): Git is configured with personal credential helper; switch to corp SSO. Fix: re-run the auth setup from W.4.

Escalation: If any RED persists after one hour of fixes, post this report in the program's primary support channel.
```

## When to escalate

If you have a RED check that has persisted for more than one hour after applying the one-line fix, paste your full setup-verify output into the program's primary support channel. Do not paste partial output. Do not paste "it's broken". The full output gives the support channel what they need to help quickly.

## What this skill is not

**Not a fixer.** The skill does not modify your environment. It runs the checks and tells you what to fix.

**Not a one-shot validator.** A GREEN result today does not mean your setup is permanent. Re-run after changes.

**Not the canonical setup script.** That is a separate artefact owned by the platform team. setup-verify checks that the script worked; it does not perform the setup itself.

**Not customisable.** The ten checks are what the curriculum depends on. Adding checks (or removing them) is a charter-revision-shaped change handled by the Council, not a per-user customisation.

## Maintenance

The skill is owned by the platform team. The ten checks are pinned; adding, removing, or modifying a check requires a charter revision and a curriculum update. The one-line fixes evolve more fluidly as common-issue patterns emerge.

To suggest a new check or a fix update, open a PR against this skill's directory. The platform team reviews monthly.

## Related

- [Quest W-0](../../belts/01-white/quest-W0-turn-green.md) — the quest this skill gates.
- [W.8 — GREEN / YELLOW / RED](../../belts/01-white/W08-green-yellow-red.md) — the chapter that introduces the status framing.
- [Appendix B — Environment Setup](../../appendices/B-environment-setup/README.md) — the reader-facing reference.
- [Appendix D — Known Issues](../../appendices/D-known-issues/README.md) — where common one-line-fix failures get documented as deeper-fix entries.
