---
title: "Evaluating new frameworks"
slug: "appendices/methodologies/evaluating-frameworks"
section: "appendices"
status: "drafted"
type: "chapter"
track: "methodologies"
order: 8
time_minutes: 12
audience: "engineer"
outcome: "Evaluate the next AI workflow framework with a reusable rubric."
prev: "appendices/methodologies/minimum-viable-wiki"
next: null
pillar: null
belt: null
tags: ["appendix", "frameworks", "rubric"]
updated: "2026-04-26"
---

# N.8 — Evaluating new frameworks (a rubric)

> **What this section is.** The closer for Appendix N. The frameworks profiled in N.2, N.3, and N.4 won't be the last. New ones will ship every quarter: some good, some marketing, some interesting-but-not-for-you. This section is the lens you'll use the next time someone in your team channel says *"hey, I just found this and we should adopt it."*

---

## Why a rubric

The pace of new AI-tooling frameworks shipping in 2026 is aggressive enough that any team will, several times a year, get pulled into a *"should we adopt this?"* conversation. Without a rubric, those conversations are either dominated by the most-vocal voice in the channel or settle into hedge-shaped maybes that don't move anything. Neither is great.

A rubric makes the conversation legible. It tells you *which questions matter* and *in roughly what order*. Two reasonable people running the same rubric on the same framework should reach similar conclusions about its fit — even if they end up favouring different aspects of it. The rubric isn't a verdict generator; it's a question-set that surfaces what to debate.

This section presents an eight-question rubric drawn from the patterns in N.1–N.7, plus a worked example of applying it to each of the three frameworks profiled earlier. After reading, you should be able to evaluate a new framework in about an hour and come back to your team with a structured opinion.

---

## The eight questions

For each, a short version, a longer version, and what a *good* answer looks like.

### 1. Which pillar does it strengthen?

**Short.** Prompt, context, or harness — pick the dominant one.

**Long.** Mapping the framework onto the [three-pillar frame](N5-three-pillars.md). Most frameworks claim to revolutionise everything; few do. Honesty about which pillar a framework is actually moving the needle on tells you (a) whether it complements what you already have or duplicates it, and (b) whether the pillar it strengthens is currently your bottleneck.

**Good answer looks like.** *"This framework is heavy on harness: wave execution, fresh windows, verifier loop. Modest context contribution (the .planning/ directory). Almost nothing on prompts."* Specific, named, defensible.

### 2. What's the maintenance cost?

**Short.** What does it cost to keep this thing working a year from now?

**Long.** Frameworks that ship rapidly (a release every few days) are exciting and *expensive* to track as a dependency. Frameworks that haven't shipped in six months are stable and possibly abandoned. The right answer for your team depends on whether you have someone who can absorb the upgrade cadence and whether your work tolerates the framework moving underneath it.

**Good answer looks like.** *"Active community, releases every 1–2 weeks, breaking changes in roughly half of minor versions. Adoption requires version-pinning and a designated maintainer on our side. Estimated 2–4 hours per week of upkeep."* Or: *"Stable since Jan 2026, no breaking changes, low maintenance. Probably no longer actively developed; might need to fork eventually."*

### 3. Does it require buy-in beyond me?

**Short.** Solo, team, or org?

**Long.** Some frameworks (gstack's individual builder mode, the LLM Wiki pattern at personal scale) work for one person without anyone else's involvement. Others (GSD's wave execution, an internal MCP pattern) require multiple teammates to be running the same setup for the value to show up. The right kind for you depends on your authority and your team's appetite. Adopting a team framework alone is usually a quiet failure waiting to happen.

**Good answer looks like.** *"Solo-viable for first 2–3 weeks. Requires team buy-in to compound — the .planning/ directory only helps the second teammate if the first one was disciplined. Recommend trial as solo, then propose to team if results are good."*

### 4. What's the deepest concept I have to internalise?

**Short.** What's the *one new mental model* this framework asks me to adopt?

**Long.** Every good framework demands a small mental shift. gstack asks you to *summon roles by command*. GSD asks you to *throw away conversational context per atomic task*. The LLM Wiki asks you to *file query answers back as pages*. The shift is the cost-of-entry; the value is what flows from it. If the framework's deepest concept is something you find awkward, the framework will eventually drift out of your hands.

**Good answer looks like.** *"The hardest shift is treating each plan as a transaction with its own fresh context. Most builders find this unintuitive at first. A 1–2 week adjustment period before the discipline feels natural."*

### 5. What does "minimum viable adoption" look like?

**Short.** What's the smallest version I can try without committing the whole team?

**Long.** Frameworks that *only* work all-in are riskier than frameworks that have a 30%-of-the-value version you can stand up in a day. The 30% version is the right way to evaluate something: adopt the cheap part first, prove it works, then expand. If a framework can't be partially adopted, it's a binary choice that's harder to walk back.

**Good answer looks like.** *"The minimum viable adoption is a `.planning/STATE.md` file plus the discipline of writing atomic plans. Stand-up time: an afternoon. Not adopting wave execution, the verifier loop, or any of the more elaborate parts. Honest take: this 20% is probably 60% of the value."*

### 6. How does it relate to what I already use?

**Short.** Compose, replace, or coexist?

**Long.** A new framework can *compose* with your existing stack (sit alongside without conflict), *replace* a part of it (do better what you already do), or *coexist awkwardly* (introduce duplication and confusion). The third is the most common and the most expensive to discover late. If you can't say clearly which of the three this is, you don't yet understand the framework well enough.

**Good answer looks like.** *"Composes cleanly with our existing CLAUDE.md and Compass plugin. Adds a `.planning/` layer that doesn't conflict. Doesn't replace anything we have. The pre-ship-check skill is roughly redundant with the framework's verifier loop, but neither hurts the other."*

### 7. What's the failure mode?

**Short.** When this framework rots in our hands, what does the rot look like?

**Long.** Every framework has a failure mode. The Wiki pattern fails by being abandoned (lint pass skipped). gstack fails by being gamed (running `/review` without reading the output). GSD fails by being too heavy for the work it's applied to. Knowing the failure mode lets you watch for it and intervene before the rot is total.

**Good answer looks like.** *"Failure mode: builders adopt the structure but stop running the verifier loop because it slows them down. The structure remains; the safety leg disappears. Symptom: the .planning/ directory is full of old plans nobody verified, and confidence in the work eroded."*

### 8. What's the upgrade path away from it?

**Short.** If we adopt this and it doesn't work, how hard is it to back out?

**Long.** This is the question most evaluations skip. A framework that integrates into your repo and your daily commands is *embedded*, and embedded systems are hard to back out of. A framework that adds files but doesn't replace existing files is more reversible. Knowing your exit path before you commit is worth knowing.

**Good answer looks like.** *"Reversible. The framework adds a `.planning/` directory and slash commands. Backing out means deleting the directory and unregistering the slash commands. Maybe a few hours of cleanup; no architectural lock-in."*

---

## How to run the rubric

Pace yourself — it's about an hour for a framework you've already skimmed; two if you're starting cold.

1. **Read the framework's primary source.** The README, the canonical blog post, the gist. Don't read the marketing page. Read what the author actually wrote.
2. **Skim 2–3 example uses.** Either the framework's own examples, or community write-ups. You're looking for evidence of how it actually performs in someone else's hands.
3. **Answer the eight questions in order.** Don't skip ahead to "should we adopt this?" The answer to that question falls out of the eight, not the other way around.
4. **Write a one-page summary** with: pillar, maintenance cost, scale (solo/team/org), the deepest concept, the minimum viable adoption, the relationship to your existing stack, the failure mode, the upgrade path. *Plus* your call: adopt full / adopt partial / pass / revisit in 6 months.
5. **Share it with your team channel.** The summary is the artefact, not the verdict. Other people can disagree with the verdict and still trust the analysis.

This is the rubric's contribution: making evaluation a *process* with an artefact, rather than a vibes-based opinion that lives in one head.

---

## Worked example — the rubric applied to the three frameworks

A short pass on each of the frameworks profiled in this appendix, to show what running the rubric looks like.

### gstack ([N.2](N2-gstack.md))

1. **Pillar.** Prompt + context. The skill bundle is essentially well-shaped prompts; GBrain is a context layer. Harness contributions are mostly inherited from Claude Code.
2. **Maintenance cost.** Active project; releases regularly. Roughly 1–2 hours per week to track, more during major releases.
3. **Scale.** Solo-viable. Team-friendly but doesn't *require* coordination.
4. **Deepest concept.** *Roles as cheap summons.* You stop seeing the AI as one chatbot and start seeing it as a callable cast of specialists.
5. **Minimum viable adoption.** Lift the role-as-skill pattern; write your own three or four review skills. Don't install all 23.
6. **Relationship to existing stack.** Composes cleanly. Razorpay's Compass plugin is structurally similar — adding gstack-style role-skills to Compass is straightforward.
7. **Failure mode.** Builders summon `/review` and ignore the output. The discipline of *acting on review feedback* is harder than installing the skill.
8. **Upgrade path.** Easy. Skills live in a folder; uninstalling is deleting the folder. Maybe an hour of cleanup.
9. **Verdict.** *Adopt the role-as-skill pattern; partial adoption (a few skills) over full adoption.*

### Get Shit Done ([N.3](N3-gsd.md))

1. **Pillar.** Harness, primarily. Strong context contribution via `.planning/`. Modest prompt contribution via XML structure.
2. **Maintenance cost.** Heavy. Releases multiple times a week. Version-pin or expect surprises.
3. **Scale.** Team-shaped. Solo works but underuses the wave execution.
4. **Deepest concept.** *Atomic plans + fresh windows + verifier loop.* The discipline of throwing away conversational context.
5. **Minimum viable adoption.** Adopt the `.planning/` directory and `STATE.md` discipline alone. Skip wave execution and the verifier loop on the first pass.
6. **Relationship to existing stack.** Composes with Claude Code. The verifier loop overlaps with the pre-ship-check skill — pick one rather than running both.
7. **Failure mode.** Adopt the structure, stop running the verifier loop. Or: framework gets too heavy for small work; team applies it everywhere and slows down.
8. **Upgrade path.** Reversible per layer. Easiest to back out of: delete `.planning/`. Hardest: unwind the wave-execution patterns from team muscle memory.
9. **Verdict.** *Lift the directory pattern and the fresh-window discipline. Don't adopt the wave execution unless you have a workload that fits it.*

### The LLM Wiki pattern ([N.4](N4-llm-wiki.md))

1. **Pillar.** Pure context. Says nothing about prompt or harness.
2. **Maintenance cost.** Near zero. The pattern is text in a gist; it doesn't ship updates.
3. **Scale.** Solo-default; team-adaptable with deliberate work.
4. **Deepest concept.** *File the answer back.* Treating queries as contributions, not transactions.
5. **Minimum viable adoption.** Stand up `CLAUDE.md` + `index.md` + `log.md` for one project (the recipe in [N.7](N7-minimum-viable-wiki.md)). One hour, no installation.
6. **Relationship to existing stack.** Composes with everything. The pattern is too light to conflict.
7. **Failure mode.** Lint pass is skipped, wiki rots, becomes untrusted, becomes vestigial.
8. **Upgrade path.** Trivial. Delete `.kb/`. Done.
9. **Verdict.** *Adopt for any project lasting more than two weeks. Effectively no risk; the failure mode is "you stop using it," not "it breaks something."*

If you only have time to apply the rubric to one framework, the LLM Wiki is the easiest study; gstack is the most actionable; GSD is the most architecturally instructive.

---

## What the rubric is *not*

Two cautions before you go.

**The rubric is not a verdict generator.** Two thoughtful people running it on the same framework can reach different verdicts based on how they weight the answers. That's by design. The rubric *surfaces what to argue about*; it doesn't end the argument.

**The rubric is not a substitute for trying.** Even after a thorough rubric pass, you don't actually know how a framework feels in your hands until you've run it for two weeks on real work. The rubric tells you whether the trial is worth running; the trial tells you whether the framework is worth adopting.

A useful pattern: rubric in week zero, partial adoption in weeks one and two, full evaluation by week four. Frameworks that survive that gauntlet earn their place. Frameworks that don't, you've cleanly retired without sunk-cost regret.

---

## Closing the appendix

You've now read the full Appendix N spine — the discipline ([N.1](N1-kb-driven-development.md)), three deep framework profiles ([N.2](N2-gstack.md), [N.3](N3-gsd.md), [N.4](N4-llm-wiki.md)), the supporting frame ([N.5](N5-three-pillars.md)), the spec-first pattern ([N.6](N6-spec-first.md)), the practical recipe ([N.7](N7-minimum-viable-wiki.md)), and now the rubric.

That's the operating-philosophy layer of the playbook complete. From here, the work shifts back to the belts (White through Black) which apply these patterns at progressively larger scales of work and impact.

If you find yourself in a future team conversation about a new framework someone's just discovered, return to this appendix. The rubric here will outlast any specific framework named in it. *That's the durable artefact.*

---

**Up to:** [↑ Appendix N README](README.md) · **Previous:** [← N.7 The minimum viable wiki](N7-minimum-viable-wiki.md) · **Forward:** [Master INDEX](../../INDEX.md)

**Further reading**
- [Simon Willison's blog](https://simonwillison.net/) — for ongoing commentary on new frameworks worth running through this rubric
- [Anthropic's Model Context Protocol](https://modelcontextprotocol.io/) — the open standard most new frameworks are now building on; understanding it deepens every rubric pass
- [Lenny's Newsletter — How to evaluate any new tool](https://www.lennysnewsletter.com/) — for adjacent thinking on tool evaluation generally, beyond AI specifically
