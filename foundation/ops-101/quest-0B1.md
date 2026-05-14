---
title: "Quest 0B-1: The 30-minute teardown"
slug: "ops-101/quest-30-minute-teardown"
section: "foundation"
status: "drafted"
type: "quest"
track: "ops-101"
order: 9
time_minutes: 30
audience: "pm-designer-ops"
outcome: "Replace one recurring 30-minute ops task with a Claude-assisted workflow and measure the before/after."
prev: "ops-101/minimum-viable-wiki"
next: "ops-101/quest-agent-diary"
pillar: null
belt: null
tags: ["ops-101", "quest", "automation"]
updated: "2026-04-27"
---

# Quest 0B-1 — The 30-minute teardown

> **🎮 Quest · ⏱ 30 minutes · 🎯 Win condition:** one recurring ops task replaced by a Claude-assisted workflow, with before/after time captured.

---

## The task

Pick one ops task you do every week that takes at least 30 minutes.

Good candidates:

- writing a standup digest;
- summarising a long Slack thread;
- triaging a ticket queue;
- turning meeting notes into action items;
- preparing a weekly stakeholder update;
- collecting scattered context before a review.

Bad candidates:

- a one-off task;
- anything involving customer PII you cannot safely redact;
- anything where the value depends on private judgement the AI cannot inspect;
- anything so sensitive you would not be comfortable documenting the recipe.

The goal is not to automate your whole job. The goal is to prove one small repeatable workflow can be made lighter.

---

## The 30-minute run

Use this structure:

**Minutes 0-5: baseline.** Write down what the task is, how often you do it, and how long it normally takes.

**Minutes 5-10: gather inputs.** Collect the non-sensitive sources the AI needs. Redact anything that crosses the safety brief.

**Minutes 10-20: build the workflow.** Use Claude.ai, Cowork, Slash, or the approved connector surface that fits the task. Ask for the actual output, not a plan for the output.

**Minutes 20-25: review.** Fix what is wrong. Tighten the prompt or connector scope. Note where human judgement still matters.

**Minutes 25-30: write the recipe.** Capture the before/after and the exact repeatable steps.

---

## Required evidence

Your quest note should include:

- the task you replaced;
- the old time cost;
- the new time cost;
- the AI surface used;
- the prompt or recipe, with sensitive details removed;
- what you still reviewed manually;
- whether you would run it again next week.

If the workflow did not save time, that is still useful evidence. Name why: bad source quality, missing connector, vague prompt, too much manual verification, or a task that should not have been automated.

---

## Success criteria

You pass the quest when:

- the task is real and recurring;
- the AI-assisted workflow produces usable output;
- you can show before/after timing;
- the recipe is documented well enough for a teammate to try;
- the workflow does not violate the safety brief.

---

## What you should carry into the next quest

- Small repeatable tasks are the best first automation targets.
- Time saved is evidence; vibes are not.
- The review step is part of the workflow, not an admission of failure.
- The next quest, [0B-2 — The agent diary](quest-0B2.md), turns this from one win into a two-week habit.

---

**Previous:** [← 0B.8 Minimum viable wiki](08-minimum-viable-wiki.md) · **Next:** [→ Quest 0B-2 The agent diary](quest-0B2.md)
