---
title: "Publishing a skill pack — naming, versioning, governance"
slug: "belts/black/skill-pack-publishing"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 2
time_minutes: 30
audience: "platform-builder"
outcome: "Bundle one or more SKILL.md artefacts into a pack and publish it so other PODs can install, pin, and adopt it without re-deriving the workflow."
prev: "belts/black/internal-mcp-server"
next: "belts/black/cowork-plugin-marketplace"
pillar: "context"
belt: "black"
tags: ["black-belt", "skill-pack", "publishing", "governance"]
updated: "2026-04-29"
---

# B.2 — Publishing a skill pack

Green Belt taught you to author a SKILL.md (G.7) and contributed `playbook-course` and three Part C skills to the program library (v0.8 and v0.12). Black Belt teaches you to bundle skills into *packs* — installable artefacts other PODs can adopt with one command. This module is about the publishing layer: naming, versioning, governance.

---

## If you're short on time

- A skill pack bundles related skills behind one install. Consumers install once; they get the pack's contents at the pinned version.
- Three governance properties matter: a clear *owner*, a versioning story, and a deprecation path.
- Most packs fail not because the skills are bad but because nobody owned them after the original author moved teams.

---

## What is a skill pack

```
   ┌────────────────────────────────────────────────┐
   │              SKILL PACK SHAPE                    │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   pack-name@version                             │
   │   ├── pack.yml             (metadata, contents) │
   │   ├── README.md            (consumer-facing)   │
   │   ├── skills/                                   │
   │   │   ├── skill-1/                              │
   │   │   │   ├── SKILL.md                          │
   │   │   │   └── reference files                  │
   │   │   ├── skill-2/                              │
   │   │   │   └── SKILL.md                          │
   │   │   └── ...                                   │
   │   └── tests/               (acceptance tests)  │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The pack is a directory with a metadata file (`pack.yml`), a consumer README, the skills themselves, and test scenarios. A consumer installs the pack; their Claude Code picks up the skills.

---

## Naming

Three rules for pack names.

**Rule 1: Verb-noun or noun-noun, lowercased, hyphenated.** `release-pipeline-toolkit`, `dashboard-debugging-pack`, `merchant-onboarding-skills`. Avoid generic names; "helpers" attracts clutter.

**Rule 2 — Scoped to the job, not the team.** A pack named after the team (`team-foo-pack`) ages badly when the team renames or splits. A pack named after the job (`merchant-onboarding-skills`) survives org changes.

**Rule 3 — Unique within the program registry.** Check the program's published-pack list before any new name; collisions confuse consumers who can't tell which pack they have.

---

## Versioning

Semantic versioning, same shape as MCP servers and the Compass plugin:

- **Major bump (`1.x → 2.x`).** A breaking change to a skill's trigger, output shape, or hard rules. Consumers must opt in.
- **Minor bump (`1.0 → 1.1`).** A backward-compatible addition: a new skill, a new optional input, a new output field.
- **Patch (`1.0.0 → 1.0.1`).** A bug fix. Consumers get this on next install with no behaviour change.

Pin one major version per consumer. Document major-version changes in the pack's CHANGELOG; the changelog is what consumers read at upgrade time.

---

## The metadata file (`pack.yml`)

Every pack ships with a `pack.yml` that names:

- pack name and current version;
- the owner (a team handle, not a person — owners outlive individuals);
- a one-paragraph description suitable for a registry listing;
- the list of skills the pack contains, with their slugs and trigger phrases;
- compatibility: which version of the program-pinned plugin the pack was tested against;
- the deprecation signal: any skill in the pack flagged for retirement, with the timeline.

A consumer reading `pack.yml` should be able to decide in 60 seconds whether to install. A pack whose `pack.yml` cannot answer "what is this for and what does it cost" is a pack that does not get adopted.

---

## Governance — the three load-bearing properties

### Property 1 — Named owner (a team, not a person)

Every pack has a team owner. The team's handle is in `pack.yml`. When the original author moves teams, the new author inherits ownership; if the owning team dissolves, the pack moves to a sibling team or to the program's plugin maintainers.

The trap: a pack owned by an individual. Individuals move; packs do not. A pack whose owner field reads as a single person is a pack that goes orphan in 6–18 months.

### Property 2 — Versioning story

A consumer who installed the pack at v1.0 should be able to upgrade to v1.4 without breakage. Major-version changes ship with a deprecation cycle: warn at v2.0-rc, deprecate at v2.0, remove at v3.0.

### Property 3 — Deprecation path

Deprecating a pack is a real act. The owner team announces in [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW); the pack's README adds a "DEPRECATED" banner; the registry marks the pack with a sunset date; consumers get a deprecation warning when they invoke deprecated skills.

A pack without a deprecation path becomes the program's accumulated debt.

---

## Publishing flow

Five steps from "I have skills" to "another POD has installed them":

1. **Bundle.** Create the pack directory; populate `pack.yml`, README, and the skills.
2. **Test.** Run the test scenarios against a stub branch. Lint clean.
3. **Pin.** Tag the pack at v1.0.0 (or the next appropriate version).
4. **Publish.** Push to the program's pinned distribution channel. The exact mechanics are program-specific; the pattern is "checksummed package, single pinned URL, audit trail of who published what when."
5. **Announce.** Post in [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW). Name the pack, the install command, the use case, the owner.

Quest B-1 is the practical test of this flow. The flow is small; doing it once teaches you everything later packs need.

---

## What goes in a pack — and what does not

**Goes in:**

- Skills your team owns and maintains, including their reference files and test scenarios.
- A consumer-facing README that explains the pack's job, its install command, and its trigger phrases.
- Acceptance test scenarios covering the canonical paths.

**Does not go in:**

- Skills owned by other teams (those are in their packs).
- Internal-only debugging skills the team uses in its own session but other teams should not load.
- Experimental skills that have not yet survived the SKILL.md authoring discipline (G.7's three-runs-by-hand-first rule).
- Personal preferences (those go in a builder's `CLAUDE.local.md`, not in a shared pack).

---

## Worked sketch — a `release-pipeline-toolkit` pack

Imagine a team that owns a backend service with a release pipeline. Three skills that have run cleanly multiple times by hand:

1. `pre-release-check`: scans a branch for release-blocking conditions specific to this service.
2. `release-notes-drafter`: drafts the release notes from merged PRs since the last release.
3. `post-release-smoke`: runs the smoke-test sequence after deploy.

Bundled as `release-pipeline-toolkit@1.0.0`:

- `pack.yml` names the team owner, the three skills, and pins compatibility.
- `README.md` reads "If your team owns a backend service with a release pipeline, install this pack to get the three workflows the original team uses on every release."
- Each skill has its own SKILL.md with the standard anatomy.
- `tests/` covers the canonical paths.

Three teams adopt it in the first quarter. The pack's owner team accepts contributions; one external team opens a PR for a fourth skill, which lands in v1.1.0. The pack is alive, owned, useful.

---

## Common failure modes

**Personal-name owner.** A pack owned by a person who changes teams becomes orphan. Fix: team handle, not personal handle.

**No deprecation path.** A pack accumulates skills nobody uses. Fix: quarterly review; deprecate skills that have not been invoked in two quarters.

**Breaking-change without a major bump.** Consumers are surprised; trust erodes. Fix: SemVer discipline; major-version bumps for breaking changes.

**Mixing experimental and stable skills.** Consumers who installed for the stable skill get the experimental noise too. Fix: keep experiments in a separate `<pack-name>-lab` pack until they earn promotion.

**No README.** Consumers cannot evaluate whether to install. Fix: every pack has a consumer-facing README answering "what is this for, what does it cost, how do I install, who owns it."

**No test scenarios.** Skills drift; nothing catches the drift. Fix: acceptance tests in `tests/`; run them on every release candidate.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I can bundle two-or-more skills into a pack with proper metadata, version it sanely, and publish via the program's pinned channel; my packs have team owners and deprecation paths.
- 🟡 YELLOW — I have authored skills but have not bundled them into a pack with full governance.
- 🔴 RED — I do not yet know what a skill pack is.

---

## What you can say after this module

> "I publish skill packs with named team owners, semantic versioning, deprecation paths, and consumer-facing READMEs — not orphan skills my teammates use once and forget."

---

## Where to go next

B.3 (*Building a plugin marketplace entry for Razorpay Cowork*) is the next surface. A skill pack lives in the program's pinned channel; a plugin marketplace entry lets non-engineer teammates install one-click via Cowork.

**Previous:** [← B.1 Authoring an internal MCP server](B01-internal-mcp-server.md) · **Next:** [→ B.3 Cowork plugin marketplace](B03-cowork-plugin-marketplace.md)

**Further reading**

- [G.6 — Skills overview](../../03-green/a-craft/G06-skills-overview.md)
- [G.7 — Writing your first SKILL.md](../../03-green/a-craft/G07-writing-your-first-skill.md)
- [Appendix C — Skills Library](../../../appendices/C-skills-library/README.md)
