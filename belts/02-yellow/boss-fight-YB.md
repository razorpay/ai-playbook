---
title: "Yellow Belt boss fight"
slug: "belts/yellow/boss-fight"
section: "belts"
status: "drafted"
type: "boss-fight"
track: "yellow"
order: 99
time_minutes: 45
audience: "everyone"
outcome: "Find an open bug in your area, fix it with AI assistance, and open the PR that earns Yellow Belt."
prev: "belts/yellow/quest-30-day-challenge"
next: "belts/yellow/badge"
pillar: "harness"
belt: "yellow"
tags: ["yellow-belt", "boss-fight"]
updated: "2026-06-16"
---

# 🏁 Yellow Belt Boss Fight — Find a bug in your area and fix it

> **Belt unlocked on completion:** 🟡 Yellow Belt
> **Time budget:** 2–6 hours (most of it triage and reading; the actual fix is small on purpose)
> **Prerequisite:** ⚪ White Belt (i.e. environment GREEN, first sandbox PR closed, Compass plugin verified)
> **What you'll prove:** that you can run the full *find → triage → fix → ship* loop using Claude Code, git, and the connectors you already have — not just the AI part.

---

## The contract, in one paragraph

Pick one nagging bug or papercut in a Razorpay product surface you actually use weekly: your dashboard, an internal tool, a checkout flow, a settings page, anything you live in. Find it. Use Claude Code together with `git` history, the relevant Slack threads (via the Slack connector), and any open ticket in the ticketing system (via the connector for it) to *triage* it: figure out roughly where it lives, what changed, what was tried before. Propose a fix. Ship the PR. Tag the surface owner for review.

The point of this boss fight is **not the size of the change** — the smaller the better, actually. The point is the *full loop*. You're proving you can identify a real-world problem, gather context across tools, propose a fix, and land it. The AI part is a single beat in a longer melody.

---

## Why this is the boss fight

Earlier drafts of the Yellow Belt boss fight asked for "any merged PR." That worked, but a fair few learners gamed it: they shipped a one-line PR they'd been holding, ticked the box, and missed the actual lesson.

The lesson Yellow Belt is trying to install is *the loop*: notice → triage → propose → ship. Real-world bug-fixing is the most honest way to test it. Every step of the loop touches a different part of the toolchain you'll lean on for the rest of your career as a builder:

- **Notice** trains the muscle of paying attention. You can't fix what you don't see, and most engineers spend more time learning to *spot* problems than to *fix* them.
- **Triage** is where Claude really earns its place. Reading a codebase you didn't write, scanning git history for the change that broke things, pulling the related Slack thread, finding the open ticket — this is exactly the work an LLM with the right connectors is best at, and exactly the work that's most painful to do manually.
- **Propose a fix** trains your judgement. There are usually several plausible fixes. The right one depends on conventions and trade-offs you can't get from the code alone.
- **Ship** closes the loop. The PR that doesn't land is just an interesting note.

If you've already shipped a PR in any Razorpay org repo and want it to count for Yellow Belt, that's fine — file the retro and you're done. But if you haven't, this boss fight is going to teach you something. Pick a real bug. Resist the urge to ship something tiny just to clear the gate.

---

## Step-by-step

### Step 1 — Pick the bug (15 minutes)

Look at the surfaces you use every working day. Not the ones you think you should use. The ones you actually use: your dashboard tab, the tool you check three times a day, the page you tap through every week.

Now think about the last time one of them frustrated you. Maybe a button didn't update its state after you clicked it. Maybe a date was rendered in the wrong format. Maybe the loading state hung longer than it should. Maybe a search returned weird results in a known way. Maybe a tooltip was wrong. Maybe a number wasn't comma-separated when other numbers around it were.

Write the symptom down in one sentence. Resist the urge to immediately jump into the code or guess at the fix. The sentence is the artefact. Examples:

- *"On the merchant settings page, the 'Save' button stays disabled even after I edit a field."*
- *"The transactions list shows amounts as `1234.5` instead of `₹1,234.50`."*
- *"On mobile, the side-panel close icon overlaps the page title."*

If you can't think of one, spend ten minutes inside your most-used surface and write down the first three things that feel a bit off. Pick the smallest of the three.

**Sanity check before continuing.** The bug should be real (you can reproduce it) and small (a few-line fix is the goal, not a re-architecture). If your candidate bug requires a backend change or feels like it might unblock multiple downstream issues, *that's a great Green Belt boss fight, not a Yellow one*. Pick something smaller.

### Step 2 — Open the relevant repo in Claude Code (5 minutes)

Use the repo orientation skill to get oriented quickly. The skill will skim the file tree, identify the major folders, and point at where the dashboard / tool / settings page actually lives. If you're not sure which repo to open, ask in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) — the answer is usually one DM away.

Once oriented, in Claude Code, ask something like:

> "I'm trying to fix a bug where [paste your one-sentence symptom]. Where in this repo is the code that renders this likely to live? Don't fix anything yet — just locate it."

Claude will usually find the right neighbourhood in a few minutes. If it's circling without converging, the prompt was too vague — go back and add detail.

### Step 3 — Triage with the connectors (30 minutes)

This is the part that's specific to this boss fight. Most learners skip it and go straight to "fix the bug." Don't.

Three sub-steps, each ~10 minutes:

**3a. `git` history.** Ask Claude to run `git log` and `git blame` on the file(s) where the bug likely lives. You're looking for: when was this code last touched, by which commits, with what message. A bug in a file that hasn't been touched in two years is a different beast from a bug in a file that was changed last week. Claude can summarise the relevant history for you in plain English.

**3b. The Slack connector.** Search Slack for the symptom: the user-facing words, the relevant component name, the surface name. Maybe someone has already complained about this. Maybe an engineer half-fixed it last quarter and got pulled to something else. The thread you're looking for might be archived, but it's still readable. Even if you find nothing, *the search itself is part of the loop*.

**3c. The ticketing connector.** Search the ticketing tool for the same symptom and any nearby keywords. Open tickets are the most useful: the bug might already have a ticket with notes, a repro, and a "won't fix yet" comment from a tech lead. If a ticket exists, you'll want to comment on it before you ship a PR — coordinating beats duplicating.

After triage you should have:

- The file(s) where the bug almost certainly lives.
- The most recent meaningful change to those files.
- Any prior conversation about this bug or its neighbourhood.
- The ticket, if one exists.

Write a one-paragraph triage summary. This goes into your PR description later.

### Step 4 — Propose a fix (30–60 minutes)

Now the AI does what it's best at. Ask Claude something like:

> "Here's the symptom: [paste]. Here's what triage turned up: [paste your one-paragraph summary]. Read the relevant file(s) and propose two or three different fixes, with the trade-offs of each. Don't apply anything yet."

You'll usually get a short menu. Pick the one that's smallest, least invasive, and most consistent with how the surrounding code is already written. If you're not sure which is which, ask Claude to compare them on those axes specifically.

Once you've picked a direction, *then* ask Claude to apply the fix. Use plan mode the first time — it lets you see what it intends before any file is changed. Review the diff carefully. The fix is small; reviewing should take a few minutes.

If the change touches more than ~10 lines of code, you've probably wandered out of "papercut fix" and into "small feature." Pull back.

### Step 5 — Test it locally (15 minutes)

Run the dev server. Reproduce the original symptom — confirm it was real. Apply your branch's change. Reproduce the symptom again — confirm it's gone. If the change touches anything visual, take a screenshot of the before and after for the PR.

If your fix accidentally broke anything else, you'll usually feel it in the first minute. Roll back the bit that broke things. The fix that fixes one thing without breaking anything is the only fix that ships.

### Step 6 — Ship the PR (20 minutes)

Use the PR-guardrail skill to create the PR. The skill will scaffold a description from your commits and your triage summary, and it'll flag anything that fails the pre-ship check (compliance, design, dependencies, conflicts, accessibility, screenshot).

Two non-negotiables in the PR description:

- **The triage paragraph.** What you found in `git`, in Slack, in the ticketing system. This is the most useful thing in your PR for a reviewer who didn't see this bug coming.
- **The before/after.** A screenshot, a GIF, or a one-line "before this PR, the button stayed disabled; after, it enables on edit." Make the change visible.

Tag the surface owner for review. If you don't know who that is, the repo's CODEOWNERS file or a quick ask in the team's Slack channel will get you there in a few minutes.

### Step 7 — The retrospective (15 minutes)

This is the artefact that earns the belt, not the PR itself.

Write a short retro covering three things:

- *How you found the bug.* What were you doing when you noticed it? Could you have noticed it sooner? Are there bugs in your area you've been mentally tagging but never written down?
- *What context the AI had to read to triage it.* List the files Claude looked at, the Slack threads you fed it, the tickets it surfaced. This is the most reusable artefact — it shows the *connector pattern* that worked for this kind of bug, and you can re-run it for the next one.
- *What surprised you about the fix.* The reason it surprised you — that's the bit worth remembering. Most of us don't have a great mental model for what's hard versus easy in a codebase we don't own; surprises calibrate that model.

Save the retro alongside your PR description. If your team uses a public retro channel, post it there too. The next learner will read it.

---

## Success criteria

To earn Yellow Belt, you need:

- [ ] **A merged PR (or a PR under active review by a named teammate)** in a Razorpay org repo. Both count.
- [ ] **A triage paragraph in the PR description.** It must reference at least one piece of information from outside the code itself: a `git` history note, a Slack thread, a ticket, or a code-review comment from a prior PR.
- [ ] **A before/after demonstration.** Screenshot, GIF, or a clear one-line description.
- [ ] **A short written retro** covering the three points above. Saved alongside the PR or in a team channel.

That's it. The PR doesn't have to be impressive. It has to be *real* and *triaged*.

---

## What this boss fight does *not* require

So that nobody talks themselves out of the gate:

- It does not require you to write a backend change. That's a Green Belt move.
- It does not require you to invent a new component. The Blade library has what you need; if it doesn't, you're past Yellow Belt scope.
- It does not require Playwright tests or a `pre-ship-check` six-layer pass. Those are Green Belt.
- It does not require the bug to be impressive. *Find a small thing, fix it well, ship it.*
- It does not require you to do this alone. Pair with a teammate if it helps. Both of you can earn the belt off the same PR if both of you contributed meaningfully and both wrote retros.

---

## Common failure modes (and how to avoid them)

**"I picked a bug that turned out to require a backend fix."** Stop. Drop it. Pick a smaller frontend-only bug. The boss fight is not about heroics; it's about the loop. You'll get to backend changes at Green Belt.

**"Claude kept proposing fixes that touched ten files."** Your prompt was probably too vague. Restart with a tighter symptom statement and a narrower file scope. Ask Claude explicitly: *"What is the smallest possible fix?"*

**"I can't reproduce the bug locally."** Two possibilities. Either your local environment isn't quite the same as production (run setup-verify again to be sure), or the bug is environmental (a race condition, a data-shape thing) and you're now in much harder territory. Either escalate to the surface owner before going further, or pick a different, more reproducible bug.

**"The PR sat unreviewed for three days."** Tag a specific reviewer in the team's Slack channel with a one-line context. The repo's owners are busy; a polite poke is normal. If still no movement, ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) — someone there will know how to escalate.

**"I shipped the fix but the retro felt like overhead."** Write it anyway. The retro is for the next learner, not for you. It's also the bit that makes this *Yellow Belt* and not *just-shipped-a-PR*.

---

## What you can say after this belt

> "I build with AI daily. I find and fix things in the surfaces I care about."

Yellow Belt earned. Welcome.

---

**Previous:** [Quest Y-2 — The 30-day 2-minute challenge](quest-Y2-30-day-challenge.md) · **Next:** [Yellow Belt badge](badge.md)

**Further reading**
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/) — the prompt × context × harness frame, and why "give the AI good context first, then ask it to act" is the single most reliable pattern for this kind of work
- [Anthropic on Claude Code best-practices](https://code.claude.com/docs/en/best-practices) — official patterns for plan mode, file scoping, and review discipline
- [Lenny's Newsletter — 25 proven AI-adoption tactics](https://www.lennysnewsletter.com/p/25-proven-tactics-to-accelerate-ai) — the broader case for "small, real wins" as the on-ramp
