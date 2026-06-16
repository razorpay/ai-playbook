---
title: "Meet the people"
slug: "prologue/roles-and-forums"
section: "prologue"
status: "drafted"
type: "chapter"
track: null
order: 6
time_minutes: 5
audience: "everyone"
outcome: "Know where to ask for help and which support surface fits which problem."
prev: "prologue/tool-tour"
next: "prologue/operating-principles"
pillar: null
belt: null
tags: ["orientation", "support", "directory"]
updated: "2026-06-16"
---

# 0.6 — Meet the people (roles, forums, the support surface)

> **⏱ 5 minutes · 👥 Everyone · 🎯 Leaves with:** the right place to ask when you're stuck, and a feel for which roles and forums shape this program.

---

## If you're short on time

When you hit a wall — a tool won't install, a skill won't trigger, a reviewer hasn't responded, a prompt keeps failing — the answer is almost always *"ask the right place, fast."* The right place is rarely a private DM. It's almost always one of a handful of public channels and forums maintained for exactly this purpose. The five minutes you spend learning where to ask is worth several hours of unblocked work over the coming weeks.

The single most useful habit: when you're stuck, ask in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) within ten minutes of getting stuck. Don't wait. Don't try harder alone first. The cost of asking is low; the cost of staying stuck is enormous.

---

## Why we name both roles and people

You'll notice this chapter is structured around *roles* and *forums*, with current role-holders named inline as of the date in the frontmatter. Both halves are deliberate.

Roles are durable. *"The program lead"* is the right person to ask whether the role-holder rotates twice in a year. *"The Compass plugin owner"* is the right person to ping whether the team behind it has restructured. The role descriptions in this chapter are written to outlast specific tenures.

But role names alone are not actionable on Day 1. A new joiner needs to know who to ping right now — and asking around to find out *"who is the program lead this quarter?"* is friction the playbook is supposed to remove. So each role below lists the current holder with their Slack handle, dated by the `updated` field at the top of the page. If a holder has rotated since that date, the playbook is stale, not the structure — ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) and this page gets refreshed in the next quarterly review.

This dual-naming also makes the playbook *shareable*. A reader outside Razorpay can follow the role structure without needing to know our hiring history; a reader inside Razorpay can act on the names today.

---

## The roles you'll meet most often

The handful of named roles (by what they do, not by who currently does them) that show up in nearly every reader's first month.

### The program lead

The person ultimately accountable for the org-wide AI rollout, the LiteLLM gateway, the access provisioning, and the support channel. They run the cadence, set the OKRs, and adjudicate edge cases when the rules don't quite fit a situation. On the engineering rollout side, they pair with the engineering co-lead who owns the setup-script tooling and the infrastructure plumbing.

> **Current as of 2026-05-13:** Bhanu Prakash Rayapati (`@Bhanu Prakash Rayapati`) leads the program; Kaushik Bhat (`@kb`) is the engineering co-lead. The setup-script tooling specifically is owned by Prafulla Anurag (`@prafulla`), and `@RKV` is the standard escalation for usage-cap and Vertex-migration questions.

When to engage: when you're not sure whether something counts as belt-progress, when a recipe in this playbook seems wrong-shaped for your team, when you have feedback that should change the playbook itself. For setup/install/access friction, the first hop is the support channel ([`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD)) rather than the program lead directly — the channel routes faster.

### The program sponsor

The senior leader who owns the *strategic* level of the program — the executive who said yes to the investment, the person whose roadmap this lives on. Usually one or two levels up from the program lead.

> **Current as of 2026-05-13:** TBD — the sponsor row is being confirmed in the next revision. Ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) for the current name if you need to escalate before that.

When to engage: rarely directly. The program sponsor's main role from your perspective is that the program *has weight* because they back it. If you find a structural blocker (*"my manager doesn't think I should be spending time on this"*) the escalation path runs through the program lead first; the sponsor is the second layer.

### The design transformation lead

The role responsible for the design-organisation-side of this program — the person making sure designers (not just engineers) have a coherent path from "I've never touched code" to "I'm shipping production work." Often co-owns the cohort program with the program lead.

> **Current as of 2026-05-13:** Saurabh Soni (`@Saurabh Soni`). Also owns [`#design-system`](https://razorpay.slack.com/archives/CMQ3RBHEU), [`#ai-in-design`](https://razorpay.slack.com/archives/C08P2EU96EP), and [`#product-design-bulletin`](https://razorpay.slack.com/archives/C07KLQKSB6U).

When to engage: anything design-track-specific that the playbook doesn't quite cover — design-system contributions, the Figma connector, the design-preview platform, design-reviewer expectations.

### The Compass plugin owners

The role maintaining the Compass plugin: the bundle of skills, hooks, MCPs, slash-commands, and subagents that ships into your Claude Code at White Belt. Owns version pinning, distribution, and the validation script. Co-owned between a PM-side lead and a builder-side lead so the plugin balances reader needs against contributor needs.

> **Current as of 2026-05-13:** Aravinth P K (`@Aravinth P K`) and Vaibhav Dhir (`@Dhir`) co-own the plugin. Skill authoring questions also flow through [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW) and [`#devex-skills`](https://razorpay.slack.com/archives/C0A8QFH9KEF).

When to engage: when a skill won't load, when a Compass-shipped component breaks after an update, when you want to contribute a new skill back to the bundle, when you have feedback on what *should* be in Compass that isn't.

### The Blade design-system leads

The roles maintaining Blade: the component library, the design tokens, the contribution pipeline. Multiple people; usually a designer-lead and an engineer-lead working together.

> **Current as of 2026-05-13:** Saurabh Soni (`@Saurabh Soni`) on the design side, Varun Achar (`@Varun Achar`) on the frontend-engineering side. For routed help, the [`#experience_fe_core`](https://razorpay.slack.com/archives/C01H13RTF8V) bookmarked support-ticket flow gets you to whoever is on duty fastest.

When to engage: when you're trying to use a Blade component in a non-obvious way, when you want to *contribute* a component (the contribution pipeline is gradually improving — see Black Belt), when you're not sure whether something belongs in Blade or in your team's local components.

### The playbook author and curator

The role responsible for the playbook itself: chapter drafts, readability passes, accepting contributions back, deciding what belongs in which belt, running the periodic structural refactors. Distinct from the program lead — the program lead runs the *program*; the author runs the *document* that orients people into the program.

> **Current as of 2026-05-13:** Vaibhav Dhir (`@Dhir`). Also a Compass plugin co-owner and a PM-side cohort lead, so a single contact for most playbook-shaped feedback.

When to engage: when a chapter reads wrong, when a section is missing the thing you needed on Day 1, when you want to contribute a Known Issue or a Reference Card, when you spot stale information that should be patched.

### Your manager

The role with the most leverage on whether you actually have time to do the work in this playbook. Most builders' biggest blocker isn't a tool problem — it's that their manager hasn't explicitly OKed the time spent. *Talk to them early.*

> **Current as of 2026-05-13:** This row stays generic by design — *your* manager is the person you report to, not a single named individual.

When to engage: before starting a belt, before booking a multi-week cohort, before agreeing to embed with another POD for a Black Belt boss fight. Their support is operational; without it the program is a side project.

### The cohort facilitators

If you're enrolled in the structured Ship-to-Learn track, your cohort has dedicated facilitators: the people running your weekly check-ins, the office hours, the project-pairing. They're often previous cohort graduates or senior builders.

> **Current as of 2026-05-13:** For the PM cohort, Aravinth P K (`@Aravinth P K`) and Vaibhav Dhir (`@Dhir`) lead facilitation. Engineering cohorts are facilitated by the program lead's team — ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) for the current facilitator on your specific cohort.

When to engage: weekly, in your scheduled times. Plus any time you're stuck on cohort-specific questions.

### The mentors

For Builder Days, structured cohorts, and the more elaborate boss fights, named mentors are assigned — typically senior engineers or experienced builders willing to spend a few hours with each candidate. The 1:3 mentor-to-builder ratio is one of the things that makes the program work.

> **Current as of 2026-05-13:** Mentor pairings are assigned per-cohort and per-Builder-Day; the active roster lives in the relevant cohort channel pinned-message. If you're between assignments and need a mentor referral, ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD).

When to engage: in your scheduled mentor sessions; for short async questions outside those sessions, but not for long debugging support — that's what the public channels are for.

---

## The forums

The places to *post*. Each has a purpose. Each has rules. Use them well and the program runs smoothly; use them badly and you contribute to the noise that makes them less useful for everyone.

> **Where the actual channel handles live.** [Appendix F — Slack Channels & Rules of Engagement](../appendices/F-slack-channels/README.md) is the live directory with every channel listed, dated, and linked. This chapter describes the *shape* of each forum; Appendix F has the addresses.

### The program's primary Slack channel

The most-important channel in this whole program. Public. Asynchronous. Searchable forever.

This is where:
- Setup help is posted (full output, not "it's broken").
- Compass plugin issues are reported.
- Builder Day prep happens.
- The version-locked plugin link and verification checksum are pinned.
- Wins are celebrated (with a link to the merged PR).
- The next cohort or event is announced.

The single most-important rule is **post publicly, not in DM**. Your question is almost certainly someone else's question. The thread you start helps the next reader who searches the channel for the same problem. *DM saves you face; public posting compounds the playbook.*

The second-most-important rule: **post the full diagnostic output**. *"It doesn't work"* gets you nowhere. The output of `setup-verify`, the exact error message, the command you ran, the version of the tool you're on — that's what lets the channel diagnose in three minutes instead of an hour.

### The celebrations channel

Where merged PRs, completed boss fights, and earned belts get posted. It's a public recognition channel and an honest one — every entry has a link, every link is real.

Why it matters: the *visibility* of progress is part of what keeps the program going. Builders who see other builders shipping believe they can ship. The celebrations channel is the social proof layer of the program.

When to post: the moment you have a merged PR, an earned belt, a completed boss fight. Don't wait. Don't be modest — your win is a model for someone else's.

### The devstack support channel

Where infrastructure-level problems get triaged. Devstack is downstream of this program (chapter [§0.4](04-enablement-stack.md), Layer 8) (owned by a separate team) but builders depend on it constantly. When devstack is slow or down, this channel is where you check first.

When to post: only after confirming the issue isn't your local setup. If `setup-verify` is green and your environment was healthy yesterday, devstack is a reasonable suspect. Otherwise, post in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) first.

### The design-system internal channel

Where Blade questions get answered. Component variants, accessibility patterns, contribution proposals. The Blade leads are usually responsive here within hours.

When to post: any Blade-specific question that the playbook (or your local Compass skills) didn't cover.

### The cross-POD signal forum

A weekly cadence where leads from different PODs surface localised blockers — *"my designers can't get cloud-IDE access," "this connector keeps timing out for half my team."* This forum is one of the more important Layer-6 (observability) artefacts the program has, because it's how local pain gets surfaced to the program team.

When to engage: if you're a team lead, attend or send notes. If you're an individual builder, the forum is consumed asynchronously through summaries posted to the primary channel.

### Builder Day channels

For each Builder Day, a dedicated channel exists for prep, day-of chatter, post-event retros. These are time-boxed — created when registration opens, archived a few weeks after the event.

When to post: during the prep window if you're registered. Don't post out-of-band questions in old archived BD channels; nobody's reading them.

---

## The rules of engagement

A short list that, if followed, makes the public channels work. If ignored, they degrade into noise.

**Post publicly.** Repeated for emphasis. The channel is a knowledge base; DMs are not. *Future-you* benefits from your question being public when you re-search it three months later.

**Post the full output.** *"setup-verify says one thing is RED"* is not a question; it's a riddle. *"Here's the full output, the offending line is X, here's what I tried"* is a question.

**Search before you ask.** Your problem has almost certainly been hit by someone else. Two minutes of searching the channel often turns up the answer. If you searched and didn't find, *say so in your post* — it tells the channel that the answer isn't already there and you've done your share of the work.

**Celebrate publicly too.** Merged PRs and earned belts go in [`#ai-bulletin`](https://razorpay.slack.com/archives/C08NRSW1BUZ), the org-wide "share your AI wins" channel. The visibility helps everyone, especially the people on the fence about whether the program is real.

**Don't paste PII into any channel.** Ever. Customer data, account numbers, credentials, anything sensitive. The safety brief ([§0.11](11-safety-brief.md)) covers this in detail; the rule applies to public channels too.

**When you solve a problem, contribute.** Add an entry to the known-issues appendix (or whatever the FAQ surface is for your team). The playbook compounds because the people using it leave it sharper than they found it.

---

## The program is a community, not a dispatch desk

A small framing thing worth saying explicitly.

The temptation when you're stuck is to think of the channels as a *help desk* — somewhere you submit a problem and wait for an answer. That framing is wrong, and the channels feel different when you treat them that way.

The right framing is *community*. Everyone here is a builder. Everyone has been stuck on something. Everyone has been helped. The expected exchange is: you ask, you get help, you stay in the channel after, and three weeks later you're answering someone else's question with what you learned. The program runs because that loop is closed by every member, not because a few people are designated answerers.

If you treat the channels this way (*I'm part of this, I help when I can, I ask when I'm stuck*) the program works for you the way it's supposed to. If you treat it as a help desk, the program will feel transactional and the help will feel sparse.

This is also why the playbook has contribution flows at every belt. Yellow Belt's boss fight ends with a teammate sign-off. Green Belt's boss fight contributes a skill. Black Belt's boss fight contributes a 1-pager case study back to the playbook. The program's institutional knowledge isn't owned by one team; it's grown by everyone using it.

---

## What you should carry into the next chapter

- **Roles and the people in them.** The role descriptions in this chapter are durable; the named holders are dated. If a name is stale, the playbook is wrong — ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) and it gets patched.
- **The setup-and-access channel is the highest-leverage place to post.** Public. Within ten minutes of getting stuck. With full diagnostic output. The handle is [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD); the full channel directory is in [Appendix F](../appendices/F-slack-channels/README.md).
- **Several specialised channels exist**: celebrations, devstack support, design-system, AI community channels, per-Builder-Day channels. Appendix F has them, organised by purpose.
- **The rules of engagement** are: post publicly, post the full output, search before asking, celebrate publicly, don't paste PII, contribute back when you solve.
- **The program is a community, not a help desk.** Treat it that way and it works for you.
- The next chapter ([§0.7 — Operating Principles](07-operating-principles.md)) is the operating philosophy that ties every belt together — knowledge-base-driven development as the unifying discipline.

---

*Last reviewed: 2026-06-16. Named-holder rows are refreshed quarterly and on-demand. If a row is stale, ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) and this page gets patched.*

---

**Previous:** [← 0.5 Meet your tools](05-tool-tour.md) · **Next:** [→ 0.7 Operating Principles](07-operating-principles.md)

**Further reading**
- [Lenny's Newsletter — How to make a thriving Slack community](https://www.lennysnewsletter.com/) — for the discipline that makes async-public channels actually work
- [Anthropic on community-driven product feedback](https://www.anthropic.com/) — the broader pattern of programs that grow through participation
