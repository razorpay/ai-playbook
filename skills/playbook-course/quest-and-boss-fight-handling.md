# Quest and boss-fight handling

> **What this is.** The contract for how the playbook-course skill gates progression at quests and boss fights without weakening Appendix L's reviewer protocol.

The skill records *claimed* evidence. It never *awards* a belt. Awarding is the cohort lead's job, off-skill, against the criteria in Appendix L.

---

## The three rules

### Rule 1 — Evidence is named, not stored

The skill records URLs and short paragraphs. It does not store screenshots, PR contents, or any artefact body. Reasons:

- the artefacts already live where they live (PR systems, screenshot folders, the cohort tracker);
- duplicating them invites stale state;
- the skill's value is in the *chain*, not in being a copy of every link in it.

If a learner pastes an artefact body into a prompt (e.g. a full PR diff), the skill politely declines to store it and asks for the URL instead.

### Rule 2 — Claimed is not awarded

`claimed: yes` in `LEARNER.md` means the learner says they did the work. *Awarded* means a reviewer confirmed it per Appendix L. The skill never blurs the two.

The skill's vocabulary:

- **claimed** — the learner has filled in the evidence chain.
- **submitted** — claimed plus the badge template has been printed and the learner has been told to send it to a reviewer.
- **awarded** — the reviewer has attested. *The skill never sees this state.* Awarded belts live in the program tracker.

`LEARNER.md` has no "awarded" field. Resist any temptation to add one.

### Rule 3 — Reviewer routing is explicit

When the badge becomes claim-ready (every quest claimed, the boss fight claimed), the skill prints two things in this order:

1. The badge template (rendered from the chapter's body, with the learner's evidence pre-filled where the skill knows it).
2. A short reviewer-routing summary cribbed from `appendices/L-certification/README.md § Reviewer protocol`. Names the four facts the learner needs: who can review, what evidence to send, what the reviewer attests to, what comes back.

The skill then asks: "Send this to a reviewer now, or save it for later?" If now, the skill marks the boss fight as `claimed: yes — submitted: <date>` and stops. If later, it stops without the submitted timestamp.

---

## Worked example: Quest W-0 — Turn GREEN

**Learner has finished W08 (GREEN/YELLOW/RED) and the skill routes to Quest W-0.**

**Skill:** Welcome to Quest W-0 — *Turn GREEN*. This is the first of two White Belt quests. The success criterion is a `setup-verify` output screenshot with all ten checks green.

Have you run `setup-verify` already?

**Learner:** Yes, output was all green.

**Skill:** Good. To claim Quest W-0, I need three things:

1. A link to the screenshot or the verification output.
2. The plugin version that was verified.
3. The date you ran the verification.

Paste each one when you have it.

**Learner:** [Pastes a workspace path to the screenshot, the plugin version, and the date.]

**Skill:** [Logs to `LEARNER.md`:]

```markdown
- [x] belts/white/quest-turn-green — claimed: yes — date: 2026-04-25 — evidence: <screenshot path> · plugin <version>
```

Quest W-0 is now claimed. The next quest is W-1 — *HelloRazorpay commit*. Continue or take a break?

**Why this is right:** the skill recorded a URL-shaped pointer (the screenshot path), did not store the screenshot itself, did not declare the belt awarded, and routed the learner to the next quest without ceremony.

---

## Worked example: Quest W-1 — HelloRazorpay commit (partial evidence)

**Learner has Quest W-0 claimed and is on Quest W-1.**

**Skill:** Welcome to Quest W-1 — *HelloRazorpay commit*. The success criterion is a PR URL on the assigned sandbox repo. Open or closed is fine; the work is what matters.

Have you opened the PR?

**Learner:** Branch is up but I haven't opened the PR yet.

**Skill:** Two options. (a) Open the PR now and come back to claim. (b) Mark this as in flight in `LEARNER.md` and continue with other modules.

**Learner:** Mark as in flight.

**Skill:** [Logs:]

```markdown
- [ ] belts/white/quest-hello-razorpay — claimed: no — note: branch up, PR not yet opened (2026-04-26)
```

I have left the box unchecked. When you have the PR URL, come back and say "claim quest W-1." For now, the next chapter is the Boss Fight W-B walkthrough, but you cannot claim the boss fight until W-1 is claimed. Want the W-B chapter as a preview, or stop here?

**Why this is right:** the skill respected partial evidence, kept the box unchecked, named the route forward, and did not let the learner skip the prerequisite.

---

## Worked example: Boss Fight W-B and the badge handoff

**Learner has both quests claimed and is on Boss Fight W-B.**

**Skill:** Welcome to Boss Fight W-B — *One real typo, merged*. The boss fight asks for a merged PR in a public-facing Razorpay doc or open-source repo that fixes a genuine typo or equivalent micro-bug.

Have you found the typo?

**Learner:** Yes, opened the PR yesterday, merged this morning.

**Skill:** Good. To claim:

1. The PR URL.
2. The merge link or commit SHA.
3. Optionally, a one-paragraph triage note: how you found the typo, what you used to confirm it.

Paste each one.

**Learner:** [Pastes URL, merge link, short triage note.]

**Skill:** [Logs:]

```markdown
- [x] belts/white/boss-fight — claimed: yes — date: 2026-04-29 — evidence: <PR URL> · merge: <merge URL>
```

[Saves the triage note to the **Notes** section verbatim.]

Boss Fight W-B is claimed. White Belt's evidence chain is closed.

The badge template is at `belts/01-white/badge.md`. I can render it now with your evidence pre-filled. After that, send the rendered template to a reviewer per Appendix L.

Render now?

**Learner:** Yes.

**Skill:** [Reads the chapter, fills the Builder identity, Evidence chain, and Recertification sections from `LEARNER.md` plus the front-matter, leaves the Reviewer attestation and What changed for me sections blank for the learner to fill, and prints the rendered template.]

Reviewer routing summary: a reviewer must be a builder one belt above you (Yellow or higher), or a program lead, or the designated reviewer rotation. They confirm the four bullets in the attestation block. They send back a tracker URL or a Slack confirmation; you log it in the badge entry as `review_link`. Direct managers cannot certify their own reports.

Send to a reviewer now, or save for later?

**Learner:** Now. Sending it to my Slack.

**Skill:** [Logs:]

```markdown
- [x] belts/white/badge — claimed: yes — date: 2026-04-29 — submitted: 2026-04-29
```

White Belt is now in the reviewer's hands. When the reviewer attests, hand-edit the badge entry to add the `reviewer:` and `review_link:` fields, or come back and I will help.

The next belt is Yellow. Yellow Belt is drafted. Want a preview of the Yellow Belt README, or take a break?

**Why this is right:** the skill rendered the badge from the chapter (no duplication), pre-filled what it knew, left the reviewer fields blank, surfaced Appendix L's rules without repeating Appendix L verbatim, and stopped before declaring Yellow Belt available without the learner's consent.

---

## Edge cases

### A learner claims a boss fight without prerequisites claimed

The skill refuses softly. It says: "Quest W-1 is not claimed yet. Boss Fight W-B is unblocked once W-1 is claimed. Do you want to claim W-1 now, or are you intentionally skipping ahead?"

If the learner says intentionally, the skill records a Notes entry with the date and the learner's reason, leaves the boss-fight box unchecked, and lets them claim it later. Soft order, not hard order. Reviewer protocol catches gaps at attestation time anyway.

### A learner pastes evidence that looks like a secret

The skill refuses to log it. It says: "That looks like a token or credential. I am not going to store it. Send the link to the artefact instead, or describe the artefact in one sentence."

### A learner declares the belt awarded

The skill politely corrects: "I cannot mark a belt as awarded. The reviewer attests; I just record claims. When you have the reviewer's confirmation, edit the badge entry's `reviewer:` and `review_link:` fields and you are done."

### A learner has hand-edited the boss fight box to `claimed: yes` without going through the skill

The skill respects the edit. It does not unmark the box. It does prompt: "I see you marked the boss fight as claimed. I do not have the evidence chain on file. Want to paste the PR URL and merge link so I can fill it in, or is the chain already in your tracker?"

### A learner asks "did I pass?"

The skill answers literally: "I can confirm the evidence chain is complete. I cannot confirm whether you have been awarded. The reviewer's attestation is the awarding step. If you have not heard back yet, the program's primary Slack channel is the place to nudge."

---

## What this file is not

This file is *not* the certification policy. Appendix L is. This file is the skill's behaviour against that policy.

If Appendix L changes, this file changes. The order of dependency is one-way: policy → skill behaviour, never the other way.
