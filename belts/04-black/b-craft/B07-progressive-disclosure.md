---
title: "Progressive disclosure — skills that stay small"
slug: "belts/black/progressive-disclosure"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 7
time_minutes: 25
audience: "platform-builder"
outcome: "Design skills that stay small by progressively disclosing their depth — concise at discovery, focused when invoked, and deeper only when needed."
prev: "belts/black/b-craft"
next: "belts/black/memory-systems"
pillar: "context"
belt: "black"
tags: ["black-belt", "progressive-disclosure", "skill-design", "voice-anchor"]
updated: "2026-08-06"
---

# B.7 — Progressive disclosure

Voice anchor for Part B. Where Part A taught you to *publish* skills, Part B teaches you to *sharpen* them — and the first sharpening discipline is keeping skills small. Progressive disclosure is the design pattern that lets a skill stay short for the common path while still going deep when the situation requires it. Black Belt builders ship skills others adopt; the difference between a skill that gets installed once and a skill that gets installed by ten teams is often the discipline of staying small at the top.

---

## If you're short on time

- A skill has two budgets: discovery metadata at startup and body content when the skill is selected. Keep both focused.
- Three levels: **name + description** (always indexed), **SKILL.md body** (loaded when relevant), **supporting files** (loaded only when needed).
- A 100-line skill that compresses 600 lines of policy through references is the right shape. A 600-line skill that ships everything in the body is wrong.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              PROGRESSIVE DISCLOSURE              │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   Level 1 — Discovery metadata (always indexed)│
   │   Name + concise description: what the skill   │
   │   does and when the agent should use it.       │
   │                                                  │
   │   Level 2 — SKILL.md body (loaded if relevant) │
   │   Hard rules, inputs, outputs, and workflow.    │
   │                                                  │
   │   Level 3+ — Supporting files (as needed)      │
   │   References, templates, scripts, examples,    │
   │   and external pointers followed by the agent. │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The pre-ship-check skill (v0.12) is a real example. Its name and description are Level 1. Its 109-line SKILL.md body is Level 2. Its `layer-specs.md`, `redline-patterns.md`, and `output-shape.md` are Level-3 supporting files that load only when the workflow needs them. Links to Appendix H and chapter G.22 go deeper still: the agent follows them only when the task needs that context.

The total policy weight is hundreds of lines. Startup pays only for the discovery metadata; a relevant invocation adds the body; the active workflow adds only the supporting detail it uses.

---

## The three rules

### Rule 1 — Discovery metadata is concise

Every installed skill's `name` and `description` are indexed at startup so the agent can decide whether the skill applies. The description should say **what the skill does and when to use it**. Workflow steps, policy, and examples belong in the body or supporting files.

One concise description is cheap. A catalogue full of vague, essay-length descriptions is not free — and it makes skill selection worse as well as larger.

### Rule 2 — The default body is short

Aim for under 150 lines for a SKILL.md body (excluding frontmatter). A body longer than 200 lines is a signal that policy detail belongs in a reference file, not in the body.

The body answers: *what are the inputs and outputs, what does the skill refuse, and how does the workflow run?* It does not repeat the discovery description or carry the full policy behind every rule. That is what supporting files are for.

### Rule 3 — Supporting files load on demand

A supporting file is named in the SKILL.md body but not inlined. When the skill needs the file's content (during an invocation that touches the policy the reference covers), the file is loaded; otherwise it is not. The agent's context window pays for what it uses.

The pattern: `layer-specs.md` for per-layer policy. `redline-patterns.md` for scan-pattern detail. `brief-template.md` for the literal brief a subagent receives. `output-shape.md` for the canonical artefact shape. Each reference is bounded; together they hold policy depth without bloating the triggered body.

External pointers follow the same rule. When the skill defers to a public doc or a chapter elsewhere in the playbook, the body links rather than copies. The agent fetches the link only when the task needs that depth.

The trap: copying public-doc content into the SKILL.md "for offline access." Public docs evolve; copies go stale; consumers end up reading two versions of the same rule. Link, do not copy.

---

## Worked comparison

Suppose your team is publishing a "team-status-summary" skill (the v0.7-ish example from G.13's discussion). Two ways to write it.

### The wrong way (one big SKILL.md)

A 600-line SKILL.md that includes:

- the workflow steps;
- the full list of valid status fields the summary may include;
- the team's tone CLAUDE.md inlined as a section;
- the redline-pattern list inlined for safety;
- three worked examples for different team shapes;
- a CHANGELOG of past versions inlined.

When the skill is selected, all 600 lines enter context regardless of which path the workflow takes. Every session also indexes the name and description in frontmatter.

### The right way (progressive disclosure)

A 120-line SKILL.md with concise frontmatter, hard rules, inputs, outputs, and a numbered workflow. The workflow cites:

- `valid-status-fields.md` (Level 3, ~80 lines, loaded only when constructing the summary);
- the team's CLAUDE.md (already loaded by the harness; not duplicated);
- `redline-patterns.md` (Level 3, ~100 lines, loaded only when scanning);
- one worked example inlined; the other two link to `examples/team-shape-A.md` and `examples/team-shape-B.md` (Level 3+, fetched only when the workflow needs the depth);
- a link to the CHANGELOG (Level 3+, almost never fetched).

When selected, the skill adds roughly 120 lines plus whichever supporting files that path actually needs. Most invocations use around 200–300 lines in total. The policy depth is preserved, while startup still pays only for concise discovery metadata.

---

## The discipline that makes this hard

Three patterns where builders accidentally bloat the SKILL.md.

**"Future readers might want this in one place."** They can want it; that is what the references are for. Don't optimise for one mythical reader at the cost of every actual invocation.

**"Just one more example."** Each example is a Level-3 candidate. Inline one canonical example; link the rest.

**"This rule is short, why not inline it?"** A short rule today is a long rule tomorrow. The discipline of references is what lets the rule grow without paying every-invocation cost.

The fix in all three cases: when a SKILL.md crosses 200 lines, ask "what would I move to a reference file?" The answer is almost always something.

---

## What this looks like in v0.12's skills

The v0.12 Part C skills are real applications of progressive disclosure:

- `pre-ship-check/` — SKILL.md at 109 lines; layer-specs.md (156), redline-patterns.md (96), output-shape.md (175) loaded on demand.
- `blade-compliance-reviewer/` — SKILL.md at 109 lines; the Blade vocabulary loads from the connector at scan time, not from a reference file (because it changes with the design system).
- `security-review-subagent/` — SKILL.md at 114 lines; brief-template.md (120) is the policy holder, loaded only when the subagent is spawned.

A Black Belt builder who studies these as references can match the discipline. A Black Belt builder who does not is likely shipping skills with bloated bodies.

---

## Common failure modes

**Inlining everything for "completeness."** Body grows; every invocation pays. Fix: extract to references.

**Reference files that nobody loads.** A reference file the SKILL.md never cites at runtime is dead weight. Fix: confirm the workflow actually loads the references it names.

**Updating the body when policy changes.** Means the body holds policy detail; means it is the wrong shape. Fix: policy lives in reference files; the body is an orchestrator.

**Linking to public docs that drift.** Level-3 pointers go stale. Fix: pin where possible; review external links quarterly.

**Treating the 150-line target as a hard rule.** It is a budget, not a law. A skill that genuinely needs 200 lines to do its job is fine. The discipline is the question, not the number.

**Missing the startup cost.** Builders shorten the body but leave a long, vague description that every session indexes. Fix: keep the description to what the skill does and when to use it; move every workflow detail down a level.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I design skills with concise discovery metadata, a short default body, and on-demand supporting files. My SKILL.md bodies stay under 150 lines for typical skills; policy depth lives in references.
- 🟡 YELLOW — I understand the pattern but my recent skills have bodies in the 200–300 line range with policy detail inlined.
- 🔴 RED — I ship 600-line SKILL.md bodies and have not extracted reference files.

---

## What you can say after this module

> "I keep skills small with progressive disclosure: concise discovery metadata, a focused body, and supporting files loaded only when needed."

---

## Where to go next

B.8 (*Memory systems*) is the next layer up. Once your skills are small, the next sharpening is how state and memory thread between sessions and between agents.

**Previous:** [← Part B README](README.md) · **Next:** [→ B.8 Memory systems](B08-memory-systems.md)

**Further reading**

- [G.7 — Writing your first SKILL.md](../../03-green/a-craft/G07-writing-your-first-skill.md)
- [G.2 — Why context windows fill](../../03-green/a-craft/G02-context-windows.md) — the constraint this discipline is downstream of
- [Anthropic — *Equipping agents for the real world with Agent Skills*](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — the three levels of skill progressive disclosure
- The v0.12 Part C skills as reference implementations
