---
title: "Appendix D: Known Issues + FAQ"
slug: "appendices/known-issues"
section: "appendices"
status: "drafted skeleton"
type: "readme"
track: "known-issues"
order: 0
time_minutes: 8
audience: "everyone"
outcome: "Find the known fix for a problem you have hit, or the contribution path for a problem you have just solved."
prev: null
next: null
pillar: null
belt: null
tags: ["appendix", "known-issues", "faq", "skeleton"]
updated: "2026-05-08"
---

# Appendix D: Known Issues + FAQ

> **Status: drafted skeleton.** The categorisation and contribution pattern are committed. Specific entries seed from real operational signal as the program runs. A reader landing here may find some categories with detailed entries and others with placeholders awaiting first contribution.

## What this appendix is

A living document of problems builders have hit and the fixes that worked. Organised by stack layer so a reader who knows roughly where their problem lives can find the relevant entries quickly.

The appendix is not exhaustive at first publish. It seeds from prior Builder Day retros and the UI-debugging skill's accumulated patterns. New entries land as builders hit and solve gaps. The cohort lead reviews contributions monthly.

## How to use this appendix

If you have a problem:

1. Identify which stack layer it lives in (categories below).
2. Read the entries in that category.
3. If your problem matches, follow the documented fix.
4. If the fix does not work, escalate per the category's escalation path.

If you solved a problem and want to contribute:

1. Identify the category your fix belongs in.
2. Add an entry using the format below.
3. Open a PR against this appendix.
4. The cohort lead reviews and merges at the next monthly cadence.

## Categories

The categorisation reflects the [Enablement Stack layers](../../prologue/04-enablement-stack.md). When in doubt, the lower-numbered layer is usually the right home.

### Layer 0: Foundation (environment, access, setup)

Problems with the laptop setup, the environment script, the corporate-proxy cert, the internal package registry, the LLM gateway, or the GREEN/YELLOW/RED health check.

Common patterns from prior cohorts:

- Corporate-proxy cert not trusted by the package manager.
- Node or pnpm version mismatch.
- LLM gateway authentication failures.
- Internal npm registry access.
- gcloud auth in unusual states.

Specific entries seed from the White Belt cohort experience.

**Escalation path:** the program's primary support channel.

### Layer 1: Compass plugin

Problems with installing, verifying, or running the program-pinned plugin bundle. Hook failures, version drift, skill discovery issues.

Common patterns:

- Plugin version checksum mismatch.
- Hook execution permissions on first install.
- Skill discovery not picking up newly installed packs.
- Plugin commands timing out.

**Escalation path:** the program's plugin maintenance channel.

### Layer 2: Design and dashboard

Problems with the Figma MCP, Blade compliance, the design preview platform, frontend tooling.

Common patterns:

- Figma MCP authentication or token issues.
- Blade compliance checks producing false positives.
- Local dev server CORS issues with mocked auth.
- Mobile viewport rendering off in the design preview platform.

**Escalation path:** the design system channel.

### Layer 3: Skills and agents

Problems with skill invocation, MCP server timeouts, agent loops, subagent handoff, custom agents built on the SDK.

Common patterns:

- Skill not activating despite matching trigger.
- MCP server timing out under load.
- Agent loop hanging on a specific prompt shape.
- Subagent context handoff incomplete.
- Output classifier flagging legitimate content.

**Escalation path:** the program's primary AI builder channel.

### Layer 4: Infrastructure (devstack)

Problems with internal infrastructure that the program depends on: CI, deploy, internal proxy, Vertex billing, secrets management.

Note: most Layer 4 problems are out of scope for this appendix; they belong to the devstack team. Entries here cover the *interaction* between AI workflows and the devstack (e.g., agent skills that depend on a specific CI behaviour).

**Escalation path:** the devstack team's support channel.

## Entry format

Each entry follows this shape:

```
### <Title> (Layer X, status: open / fixed / workaround)

**Symptom.** What the user sees.

**Diagnosis.** What is actually happening, with the diagnostic steps to confirm.

**Fix.** The known fix. Step-by-step.

**When to escalate.** If the fix does not work, where to escalate and what to include.

**First seen.** Approximate date / cohort.

**References.** PRs, RFCs, related kb/ entries, or external links.
```

## Contribution

The contribution flow:

1. Hit a problem.
2. Solve it (or get it solved by escalating per the category's path).
3. Write up the entry using the format above.
4. Open a PR against this appendix.
5. The cohort lead reviews monthly; entries merge in batches.

## Why this appendix is a skeleton at first publish

Two reasons.

First, the program is at the start of running the curriculum at scale. The patterns that warrant entries are surfaced through real cohort experience, not curated up front. Pre-populating speculative entries would fill the appendix with content that does not match what real builders hit.

Second, the curriculum already covers many of the patterns in their own chapters. White Belt covers Layer 0 setup; Yellow Belt covers Compass plugin and tool atlas; Green Belt covers skill authoring and design tooling; Black Belt covers skill governance. The chapters are the canonical reference for the patterns; this appendix is the running ledger of the deviations.

The skeleton-status framing means the appendix is honest about its current state. As the program runs, the skeleton densifies into a useful reference. The shape committed here is the durable shape; the entries change.

## Cross-references

- [Prologue §0.4 — The Enablement Stack](../../prologue/04-enablement-stack.md), which defines the layers used here.
- [Appendix B — Environment Setup](../B-environment-setup/README.md), which covers Layer 0 patterns at the curriculum level.
- [Appendix F — Slack Channels](../F-slack-channels/README.md), which names the escalation paths referenced in each category.
- [B.16 — Plugin and skill governance](../../belts/04-black/c-org/B16-plugin-and-skill-governance.md), the lifecycle that produces some of the Layer 1 entries over time.

---

*This appendix ships as a drafted skeleton. The categorisation and the contribution pattern are stable; specific entries land as the program runs. Expected first densification cadence: monthly cohort lead review for the first six months, then quarterly.*
