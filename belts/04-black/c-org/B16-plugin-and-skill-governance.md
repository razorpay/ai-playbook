---
title: "Plugin + skill governance — approval, deprecation, security review"
slug: "belts/black/plugin-and-skill-governance"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 16
time_minutes: 45
audience: "platform-builder"
outcome: "Govern plugin and skill lifecycles cleanly across approval (for new marketplace entries), deprecation (for plugins no team owns anymore), and security review (for plugins handling sensitive data)."
prev: "belts/black/api-council-contributions"
next: "belts/black/boss-fight-pod-ai-uplift"
pillar: "governance"
belt: "black"
tags: ["black-belt", "governance", "plugin-lifecycle"]
updated: "2026-05-07"
---

# B.16 — Plugin + skill governance: approval, deprecation, security review

The closing module of Part C, and the close of Black Belt's reading content before the boss fight and the badge. Where B.14 (RFC) and B.15 (API Council) governed *new* AI surfaces at design time, B.16 governs the *lifecycle*: what happens after a plugin or skill pack ships, gets adopted, drifts, or hits a security-relevant edge.

A platform-builder community without lifecycle governance accumulates orphan plugins, divergent versions, and silent compliance drift. With it, the community has a clean model: every plugin has a named owner, every plugin has a documented lifecycle stage, every transition between stages has a written trigger.

---

## If you're short on time

- Three governance moves: **approval** (for new plugin marketplace entries), **deprecation** (for plugins no team owns anymore), **security review** (for plugins handling sensitive data).
- Each plugin moves through a lifecycle: **published → adopted → deprecated → removed**. Each transition has a named owner and a written trigger.
- The discipline is *quiet*. Governance that bites at the wrong moment is a bottleneck; governance that bites at the right moment prevents the platform from drifting.

---

## Why this is a Black Belt module

You authored a plugin in Quest B-1 (Part A). You shipped it through the program's pinned distribution channel. Two PODs outside your team adopted it within a month. The badge claim, eventually, will need that plugin to *still exist*, *still have an owner*, and *still pass security review* if it touches sensitive data.

That is the work this module covers. Not the building of the plugin — that is Quest B-1. The *care and feeding* of the plugin after it ships, so the platform-builder community does not become a graveyard of orphan packs.

This is also the module where the Black Belt's role changes most sharply. Through Parts A and B, you were *building*. Through Part C, you are *building plus stewarding*. B.16 is the steward's manual.

---

## The lifecycle

```
   ┌────────────────────────────────────────────────────┐
   │              ONE PLUGIN, OVER TIME                   │
   ├────────────────────────────────────────────────────┤
   │                                                      │
   │   PUBLISHED         (v1.0 lands; ≥1 install signal) │
   │      ▼                                               │
   │   ADOPTED           (≥2 outside-team installs;      │
   │                      iterating to v1.x)              │
   │      ▼                                               │
   │   MATURE            (steady-state; v2 if needed;    │
   │                      owner team stable)              │
   │      ▼                                               │
   │   DEPRECATED        (a successor exists, OR no      │
   │                      owner team, OR a security      │
   │                      issue is unfixable; deprecation │
   │                      announcement made)              │
   │      ▼                                               │
   │   REMOVED           (deprecation window elapsed;    │
   │                      plugin removed from channel;    │
   │                      historical entry archived)     │
   │                                                      │
   └────────────────────────────────────────────────────┘
```

Most plugins never reach DEPRECATED. The governance work is for the ones that do, and for the lifecycle-spanning concern of security review.

---

## Move 1 — Approval (for new marketplace entries)

### What it is

Before a plugin appears in the program's pinned distribution channel as an *approved* entry (versus an experimental or personal entry), it is reviewed by the platform-builder community. The review is light (heavyweight gating defeats the platform) but it ensures the plugin has the four basics:

- **Owner.** A team handle, not a personal handle. (The Quest B-1 lesson; restated here because approval is where it bites.)
- **README.** Consumer-facing answers per B.2 (what it does, what it does not do, who owns it, how to install, how to report issues).
- **Tests.** Acceptance scenarios per B.2 / G.7.
- **Compatibility.** Tested against the current pinned plugin versions in the program.

### How it works

A submitter posts in [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW) with a link to the plugin and a one-paragraph "what this is for and why your POD might want it." The platform-builder community reviews; substantive feedback addressed; approval recorded as a pinned message or canvas entry.

### What it is not

- Not a quality bar above the four basics. The marketplace is a discovery surface, not a curation surface; plugins compete on their own merits.
- Not a security review. Security-shaped plugins go through Move 3 *additionally*.
- Not a substitute for the API Council on AI-facing surfaces (B.15) — Council review is for the API surface; approval is for the lifecycle entry.

### Common failure modes

- **Personal-handle owner.** Approval should bounce until the owner is a team handle.
- **Missing README.** Approval should bounce until the README answers the six questions.
- **Tested only on the author's machine.** Approval should require tests that run against a clean working directory.

---

## Move 2 — Deprecation (for plugins no team owns anymore)

### What it is

Sometimes a plugin's owner team disbands, transfers ownership, or moves on to a different focus. Sometimes a successor plugin exists and the original is no longer the right surface. Sometimes the plugin's dependencies have moved (a connector class changed; a model the plugin depends on is itself deprecated) and updating is non-trivial.

Deprecation is the named move that says: this plugin is on its way out. Adopters should plan migration. After the deprecation window, the plugin will be removed from the channel.

### How it works

Three triggers for deprecation, each with its own announcement shape.

**Trigger A — A successor exists.** A new plugin handles the same use case better, and the platform-builder community has consensus that the new one should replace the old. Announcement: "Plugin X v1.x is deprecated as of <date>. Successor: Plugin Y. Migration guide: <link>. Removal date: <date+90 days>."

**Trigger B — No owner team.** The owner team disbanded or transferred away, and no successor team has picked it up. The platform-builder community runs a brief "is anyone willing to own this?" call; if no taker after 30 days, the plugin is deprecated. Announcement: "Plugin X is deprecated as of <date> due to no active owner. If your POD relies on it, the migration paths are: <list>. Removal date: <date+60 days>."

**Trigger C — An unfixable security issue.** A security review (Move 3) has flagged the plugin and a fix is not viable. Announcement: "Plugin X is deprecated as of <date>; do not install or run new instances. Security advisory: <link>. Removal date: <date+30 days>."

### The deprecation window

The window is a function of the trigger. Successor-driven deprecation: 90 days (most generous; users have time to evaluate the successor). No-owner deprecation: 60 days (the plugin still works, but adopters should have time to find an alternative). Security-driven deprecation: 30 days, sometimes shorter (the security concern dictates urgency).

The window is named *in the announcement*. Drift on the window ("we'll keep it around a bit longer") undermines the discipline. If the window must move, that is a new announcement, not a quiet extension.

### What deprecation is not

- Not removal. The plugin still works during the window; adopters can still run it. Removal is the *next* state.
- Not a quality judgment. A deprecated plugin may have been excellent; deprecation reflects lifecycle, not value.
- Not a way to abandon a plugin without consequence. The owner team (or platform-builder community, if no owner) is responsible for the deprecation announcement and the migration path.

### Common failure modes

- **Silent abandonment.** A plugin's owner team transfers focus and the plugin sits with no maintenance and no announcement. Fix: the platform-builder community runs a quarterly "ownership audit" of the marketplace; orphaned plugins enter the no-owner deprecation track.
- **Announcement without migration path.** Adopters have nowhere to go. Fix: the announcement *names* the migration path or the alternatives.
- **Deprecation window that drifts.** The 90 days becomes 180 becomes "we'll figure it out." Fix: the date in the announcement is binding; if it moves, announce the move.
- **Deprecating without warning the adopters.** Adopters find out when the plugin disappears. Fix: the deprecation announcement reaches the program's main forum *and* notifies the known adopters directly.

---

## Move 3 — Security review (for plugins handling sensitive data)

### What it is

Plugins that handle regulator-protected data (PII per G.24; payment card data per the PCI scope; data subject to RBI rules; security-sensitive data the program defines internally) require security review. The review is *additional* to API Council review (B.15) and approval (Move 1).

### When it triggers

Three triggers:

- **At approval.** A plugin's intended scope, declared at approval time, includes sensitive data. Security review runs before approval is granted.
- **At a scope change.** A plugin originally scoped to non-sensitive data later adds a tool or connector that touches sensitive data. The scope change triggers a fresh review.
- **At a security event.** An incident, a near-miss, or a third-party advisory reveals a risk in a plugin's data handling. The plugin enters security review even if its scope has not changed.

### What the review covers

The review applies the discipline G.24 (PII / PCI / RBI), G.25 (prompt injection + output classifiers), and the `security-review-subagent` skill (G.28) cover, *plus* the plugin-lifecycle specifics:

- **Data flow.** Where does sensitive data enter the plugin? Where does it leave? What models or third-party services see it?
- **Auth surface.** What credentials does the plugin handle? How are they stored? How are they rotated?
- **Logging.** Does the plugin log sensitive data? In what form? Where do the logs go?
- **Failure modes.** What does the plugin do when a sensitive-data flow fails — does it leak, or fail closed?
- **Update path.** How are security patches delivered to adopters? Is there a forced-update mechanism for severe issues?

### Verdicts

- **Pass.** The plugin handles sensitive data within the platform's policy. Approval (Move 1) can proceed.
- **Pass with conditions.** Specific issues must be fixed before the plugin reaches `published`. Conditions are tracked and verified.
- **Fail.** The plugin's design has a sensitive-data issue that cannot be patched in-place. Either the design is reworked, or the plugin is deprecated under Trigger C.

### What security review is not

- Not a substitute for the redline reflex (per G.22). Builders applying the redline reflex catch the obvious cases; the security review catches the structural cases that the reflex cannot see.
- Not a substitute for the proxy's safety layer (per G.23). The proxy catches some classes of failure at runtime; the security review catches design-time issues that the proxy cannot.
- Not a one-time event. The triggers above mean security review can recur over a plugin's lifetime.
- Not gatekeeping for non-sensitive plugins. A plugin that does not touch sensitive data does not need a security review; the threshold is *intentional* and conservative — the threshold should be applied honestly, not stretched.

### Common failure modes

- **Scope drift without re-review.** A plugin starts in non-sensitive scope and a new tool quietly broadens it. Fix: the scope is part of the plugin's `pack.yml` (per B.2); changes to scope trigger fresh review.
- **Logging sensitive data for debugging.** A v1.x adds a debug-mode log that captures sensitive data. Fix: the security review's logging check covers this; debug-mode behaviour is part of the plugin's surface.
- **Storing credentials in `pack.yml`.** Should never happen, occasionally does. Fix: the approval check (Move 1) and the security review (Move 3) both look for this; failed credential handling is automatic Fail.
- **Treating a Pass as permanent.** A v1 Pass does not mean v2 is automatically Pass. Fix: substantive changes to data flow, auth, or logging trigger re-review; the change-list review is part of approval for plugin v-bumps.
- **Failing closed without telling the user.** A security-sensitive failure that the plugin handles by silently doing nothing leaves the user with no signal. Fix: the security review's failure-modes check covers this; failures that involve sensitive data should produce a clear, non-leaking error message and surface that the operation did not complete.

---

## How the three moves interact

The three moves are not parallel; they compose.

```
   ┌────────────────────────────────────────────────────┐
   │   Submitter posts new plugin                         │
   │              │                                       │
   │              ▼                                       │
   │   Approval (Move 1) — has README, owner, tests, etc │
   │              │                                       │
   │              ▼                                       │
   │   Sensitive data scope?                              │
   │     no  → published                                  │
   │     yes → Security review (Move 3) → Pass / Pass-w/ │
   │           -conditions / Fail                         │
   │              │                                       │
   │              ▼                                       │
   │   Published, Adopted, Mature                         │
   │              │                                       │
   │              ▼                                       │
   │   Deprecation trigger (Move 2)?                      │
   │     A: successor       → 90-day window               │
   │     B: no owner        → 60-day window               │
   │     C: security        → ≤30-day window              │
   │              │                                       │
   │              ▼                                       │
   │   Removal (after window elapses)                     │
   └────────────────────────────────────────────────────┘
```

A Black Belt running this lifecycle for their own plugins, *and* contributing to the lifecycle for peers' plugins, is the platform-builder steward role in concrete form.

---

## Worked example — a deprecation timeline

A redacted shape. Names removed; numbers illustrative.

> **Plugin.** `weekly-status-pack` v1.x; a skill pack for automating recurring status reports.
>
> **Trigger.** A successor plugin, `org-status-pack` v1.0, has shipped. The successor handles three additional report shapes that `weekly-status-pack` does not, and the platform-builder community has consensus that the successor replaces the original.
>
> **Day 0.** Owner team posts in [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW): "`weekly-status-pack` v1.x is deprecated as of <today>. Successor: `org-status-pack` v1.0. Migration guide: <link to a one-page doc walking the change>. Removal date: <today + 90 days>." The post is pinned. The known adopters (5 PODs) get a direct mention with the migration link.
>
> **Day 30.** Owner team posts a status update: 3 of 5 known adopters have migrated. The remaining 2 have specific blockers. The blockers are documented; the migration guide is updated to address them.
>
> **Day 60.** Status update: 5 of 5 migrated. Older versions of `weekly-status-pack` may still be installed in unknown locations; final-window message is scheduled.
>
> **Day 75.** Final-window post: "`weekly-status-pack` will be removed on <day 90>. If your POD has installed it and not migrated, please do so or reach out for help."
>
> **Day 90.** Plugin removed from the program's pinned channel. A historical entry remains in the marketplace's archived list (link to README, link to migration guide, removal date). The plugin's repo stays accessible read-only.

The discipline: announcement at day 0, status update at day 30, status update at day 60, final-window at day 75, removal at day 90. The dates are not optional; they are the contract.

---

## What this is not

**Not a bottleneck on builders.** Governance that bites at the wrong moment slows the platform. The discipline names the moments where governance bites (at approval, at deprecation, at security-relevant events) and stays out of the way otherwise.

**Not a substitute for the platform team's judgement.** When edge cases surface, the platform-builder community (or the cohort lead) makes the call. The lifecycle is a default; explicit decisions can deviate, with a written reason.

**Not a venue for taste-based gatekeeping.** Approval is "has the four basics," not "is this plugin worth shipping." The marketplace decides value.

**Not a way to enforce code style.** Code style belongs in the plugin's repo and in the language's tooling. The lifecycle covers structural concerns, not stylistic ones.

**Not a one-Black-Belt show.** The lifecycle requires a community: multiple builders to review approval, multiple builders to spot deprecation triggers, multiple builders (with security expertise) to run security review. A Black Belt who tries to be the *only* lifecycle steward will burn out and the lifecycle will collapse.

---

## Common failure modes (summary, across moves)

The per-move sections each named theirs; a cross-cutting list:

- **Skipping approval because "it's a small plugin."** Plugins do not stay small once adopted. Fix: every plugin entering the channel goes through approval.
- **Letting plugins ride into the marketplace as personal handles.** The first orphan event surfaces this. Fix: ownership audit; the personal-handle pattern is not approved.
- **Treating security review as a one-time gate.** Triggers recur. Fix: the lifecycle accommodates re-review.
- **Deprecation announcements that are vague.** Adopters do not know what to do. Fix: the announcement names the path forward and the dates.
- **Removal without archive.** Adopters who relied on the plugin lose the install link, the README, and the migration history. Fix: archived entries stay reachable.
- **Lifecycle work falling on one Black Belt.** Burnout follows. Fix: cohort the stewardship; the platform-builder community shares the load.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I run the lifecycle for my own plugins (named owner, tested, scope declared, deprecation announced when due) and contribute to peers' lifecycle work; my plugins move through the lifecycle deliberately.
- 🟡 YELLOW — I run approval and security review but the lifecycle is informal; deprecation announcements are ad-hoc; orphan plugins persist in the marketplace.
- 🔴 RED: My plugins ship without owner-team handles, without security scope declaration, or without a written deprecation path; the marketplace under my watch is drifting.

---

## What you can say after this module

> "I steward plugin and skill lifecycles: approval (with the four basics), deprecation (with named triggers and announcements), security review (at approval, at scope changes, and at security-relevant events). The platform-builder community I am part of treats the marketplace as a maintained surface, not a graveyard."

---

## Where to go next

You have closed Part C's reading content. The Black Belt capstone (Boss Fight B-B) exercises Parts A, B, and C in concert: a one-month embed with a POD outside your own, with a signed-off metric lift and a one-pager case study. The boss fight is what turns the chapters into evidence.

**Previous:** [← B.15 API Council contributions](B15-api-council-contributions.md) · **Next:** [→ Boss Fight B-B](boss-fight-BB-pod-ai-uplift.md)

**Further reading**

- [B.2 — Publishing a skill pack](../a-platform/B02-skill-pack-publishing.md) — the publishing flow that approval (Move 1) operates on top of.
- [G.24: PII, PCI, RBI](../../03-green/c-guardrails/G24-pii-pci-rbi.md) — the regulator-protected-data definitions that determine when Move 3 triggers.
- [G.25 — Prompt injection + output classifiers](../../03-green/c-guardrails/G25-prompt-injection.md) — the runtime safety layer that complements security review.
- [The `security-review-subagent` skill](../../03-green/c-guardrails/G28-security-review-subagent.md) — the agent-shaped review that this module's Move 3 invokes.
