---
title: "Lightweight agents"
slug: "ops-101/lightweight-agents"
section: "foundation"
status: "drafted"
type: "chapter"
track: "ops-101"
order: 7
time_minutes: 30
audience: "pm-designer-ops"
outcome: "Recognise when a repeated recipe deserves a configured agent, choose an event or schedule trigger, then make recurring work verifiable."
prev: "ops-101/document-workflows"
next: "ops-101/minimum-viable-wiki"
pillar: null
belt: null
tags: ["ops-101", "agents", "event-driven"]
updated: "2026-09-06"
---

# 0B.7 — Lightweight agents (when "automate this for me" earns its keep)

> **⏱ 30 minutes · 👥 PMs, ops, anyone whose recipes are starting to repeat · 🎯 Leaves with:** the line between *recipe* and *agent*, a trigger decision, a copyable verified-loop design, three concrete patterns, and a way to keep recurring work observable.

---

## The graduation from recipe to agent

Chapters 0B.3 through 0B.6 teach *recipes*: you start the prompt and review the output before it ships. Keep that shape until the work has a stable cadence, such as a weekly digest or each new ticket in one queue.

A **lightweight agent** runs that tested recipe from a schedule or event without waiting for you to press go. The prompt may barely change; the operating contract does. You now need a trigger, runtime, bounds, failure signal, owner, and kill-switch. The rest of this chapter helps you define them without turning a useful recipe into unattended theatre.

---

## What a lightweight agent is, exactly

A lightweight agent has:

- **A trigger.** Either a schedule (every Monday at 9am) or an event (every time a new ticket arrives in queue X).
- **A prompt.** What the agent runs when triggered — usually a recipe you've already battle-tested as an on-demand version.
- **An output channel.** Where the result goes: a Slack post, an email draft, a doc updated, a ticket created.
- **An "I'm done" condition.** When does the agent stop? Most lightweight agents run one bounded pass: they fire, produce, check if needed, and finish. Open-ended chains and multi-agent orchestration are Black Belt topics; we're in much simpler territory here.

That is enough for a private, reversible draft. Multi-agent orchestration comes later.

Start from a recipe you have already run by hand across representative cases. A calendar duration alone does not prove readiness: a daily workflow may collect useful evidence quickly, while a monthly workflow needs longer. Graduate when you know the normal path, at least one empty or failed-input path, the review owner, and what must never happen automatically.

---

## Recipe → agent: the conversion

Use three evidence gates:

1. **Prove the recipe manually.** Run it across normal, empty, stale, and malformed inputs. Record what you corrected and which decisions still require a person.
2. **Add the trigger and runtime contract.** Keep the prompt, connectors, and review discipline; define schedule or event, bounds, retries, output, owner, and kill-switch.
3. **Observe real triggered runs.** Start privately. Review every run until the schedule, runtime, rate limits, and unattended inputs have all been exercised. Expand only when the receipts show the expected coverage and failures are loud.

The boss fight uses a two-week measurement window, so use it when it produces representative runs. Do not promote a weekly or low-volume agent merely because the calendar elapsed. Trust means *review by evidence and exception*, not *forget it exists*.

---

## Choose the trigger: event or schedule

The trigger changes the workload. A polling schedule asks, “What changed since the last run?” even when nothing changed. An event says, “This specific thing changed; handle it.” That difference is small at ten records and expensive at ten thousand.

Use this decision path before reaching for a five-minute cron:

```text
Does the source already emit a stable event for the business moment you need?
├─ Yes → Prefer the event. Pass the affected entity ID and event ID to one
│        bounded run; deduplicate repeated delivery.
└─ No  → Is the output a periodic snapshot or digest rather than a response
         to one exact change?
         ├─ Yes → Use a schedule with a cursor, overlap guard, and cost limit.
         └─ No  → Can a bounded poll meet the freshness, rate, and cost limits
                  without mutating or locking the source?
                  ├─ Yes → Poll a bounded window; back off, deduplicate, and
                  │        define when volume forces another trigger design.
                  └─ No  → Keep it manual and ask the source owner for an
                           event or connector. A faster cron is not a fix.
```

An abandoned-cart workflow is naturally event-triggered when the checkout system can publish a cart-recovery event. A Friday portfolio digest is naturally scheduled because its job is to summarise a period. Do not make the digest pretend to be real-time, and do not make the cart agent rescan every merchant because the clock rang.

### Copy this trigger contract

Fill this before you configure the runtime. If the trigger can deliver twice, miss a run, or scan more work as adoption grows, the contract should say what happens.

```text
BUSINESS MOMENT: <what should cause one run>
SOURCE: <system that emits the event or owns the scheduled query>
MODE: <event | schedule | bounded polling>
ACTIVE PATH: <the one trigger currently allowed to produce effects>
IDENTITY: <business event ID or cursor shared across old and new paths>
SOURCE SAFETY: <read-only query; no lock or mutation caused by collection>
BOUND: <maximum records, runtime, calls, and spend per run>
RECOVERY: <retry/backoff; replay window; alert after final failure>
CUTOVER: <shadow proof; old-trigger disablement; in-flight replay check>
POLLING REVIEW: <volume/date that forces a redesign; replacement owner; or n/a>
```

During a trigger migration, **shadow does not mean both paths may act**. Run the new path in observation-only mode or send its output to a test sink. Before enabling its effects, disable the old path and keep one business identity across both paths so an in-flight overlap is deduplicated. If you cannot name the single active path, pause the cutover.

Test duplicate delivery and a failed trigger before launch. For a scheduled query, also test an empty window and a window larger than the bound. For an event, test out-of-order delivery. During a cutover, send one input through both old and new paths: expect one applied receipt and one deduplicated or skipped receipt, never two customer or team actions. The trigger is ready when the applicable cases produce a receipt or a loud failure, not a duplicate action.

### Acceptance is not completion

An asynchronous trigger can acknowledge a request before the work finishes. That is useful, but the acknowledgement proves only that the runtime accepted the request. It does **not** prove that every item completed, that a dependency stayed healthy, or that the run stopped within its limits.

If work continues after the trigger responds, add this boundary to the trigger contract:

```text
ACCEPTED: <response that proves the runtime took responsibility; not “completed”>
RUN ID: <stable ID returned to the caller and used in logs, retries, and receipts>
STATUS: <where the owner can see queued | running | partial | completed | failed | cancelled>
DEADLINE: <maximum wall-clock time; what the runtime cancels at expiry>
WORK BOUND: <maximum items and concurrency; what is deferred or refused>
ITEM RESULT: <success/failure recorded per item; no silent skip>
TERMINAL RECEIPT: <counts, duration, failed-item IDs, retry state, and final reason>
ALERT: <who hears when the deadline or final retry fails>
```

For an HTTP-triggered workflow, return an acceptance response with the run ID and status location rather than a success-shaped response that implies completion. The exact transport can vary; the product contract cannot. “Accepted” starts an observable run. A terminal receipt ends it.

Before launch, run one small failure drill: make a dependency exceed its timeout midway through a multi-item batch. The trigger may acknowledge promptly, but the status must remain non-terminal while work continues; the deadline must stop unbounded execution; successful and failed items must both appear in the receipt; and a retry must not repeat completed effects. If the owner has to search raw logs to learn whether item 197 ran, the workflow is not observable enough.

---

## Choose where the agent runs

An agent runs on a machine, not in the abstract. The machine may be your laptop or a persistent approved runtime. It can use only the files, browser sessions, connectors, credentials, and network routes available there.

That boundary is easy to miss when converting a manual recipe. A recipe that works beside you may depend on a local template folder or a signed-in browser. Moving only its prompt to a cloud schedule does not move those dependencies with it. The clock fires; the agent arrives with none of its luggage.

Use this decision path before choosing the scheduler:

```text
Does the recipe need a local file, desktop/browser session, device bridge,
keychain credential, or machine-only connector?
├─ Yes → Run it on that computer, or first move the dependency to an
│        approved service the persistent runtime can reach.
└─ No  → Must it run while your computer is asleep or offline?
         ├─ Yes → Use an approved persistent runtime and provision every
         │        dependency there.
         └─ No  → Either can work; choose the simpler runtime to operate.
```

Do not choose “cloud” and assume reachability will sort itself out. If the workflow is mixed — for example, local browser collection followed by remote summarisation — split it into explicit stages with an approved handoff, or keep it manual until that handoff exists.

### Copy this runtime preflight

Run one dry run **from the actual scheduled runtime**, not from the interactive session where you wrote the recipe.

```text
RUNTIME: <this computer | approved persistent runtime>
MUST RUN WHILE THIS COMPUTER IS OFF: <yes/no>
INPUTS: <each file, API, browser session, connector; where it lives>
AUTH: <how this runtime receives approved access; no pasted secrets>
NETWORK: <routes this runtime must reach>
OUTPUT: <destination and write permission>
DRY RUN: <proof each dependency was read and the output was delivered>
FAIL CLOSED: <what posts or records a skipped run when any dependency is missing>
```

The last line matters. Missing context must produce a visible skip, not a polished digest built from partial inputs. After the preflight passes, configure the trigger and continue with the verified-loop checks below.

---

## When the agent should become a verified loop

A schedule gives you repetition, not reliability. Once a run informs a team decision, compares today with last week, or publishes beyond your private workspace, graduate the agent into a **verified loop**:

```text
trigger → skill → maker → checker → gate → state
   ↑                                           │
   └──────────────── next trigger ─────────────┘
```

This is still lightweight. The maker and checker are roles in one workflow, not necessarily separate agents or models.

| Part | The question it answers | Daily-health example |
|---|---|---|
| **Trigger** | When should the work start? | Every weekday at 10 AM |
| **Skill** | Which stable instructions, sources, and output contract apply? | Read the approved metric definitions; compare the same cohorts and time windows |
| **Maker** | What produces the candidate result? | Draft a Green/Amber/Red health summary with source links |
| **Checker** | What can disprove or block that result? | Confirm every required source returned data, time windows match, and each claim has evidence |
| **Gate** | What may publish, and what must stop or escalate? | Auto-post a complete Green draft privately; hold missing-data runs; require a human for incident or customer-facing action |
| **State** | What must the next run and the owner remember? | Run time, source coverage, verdict, output link, checker result, and any human override |

The checker should be cheaper and more deterministic than the maker where possible: row counts, required fields, freshness timestamps, source links, and thresholds beat “ask another model if this looks right.” The gate is a rule, not automatically a person. Low-risk private output may pass when checks succeed; external, irreversible, or sensitive action keeps a human gate.

State is a **run receipt**, not a transcript landfill. Store the minimum needed to compare runs, diagnose failure, and learn from overrides. Link to approved source systems instead of copying sensitive customer or employee data into a new file.

### Copy this loop card

Fill this before scheduling a team-facing workflow. If you cannot fill the checker, gate, and state fields, keep running the recipe manually.

```text
LOOP: <name and business outcome>
OWNER: <person or team responsible>
TRIGGER: <schedule or event; timezone; duplicate-run rule>
SKILL: <instructions; approved sources; output contract>
MAKER: <what produces the draft or recommendation>
CHECKER: <coverage, freshness, evidence, and threshold checks>
GATE: <auto-publish, hold, or human-confirm conditions>
STATE: <minimal run receipt and where it lives>
FAILURE: <where a failed or skipped run alerts>
KILL-SWITCH: <how the owner pauses the loop>
```

Start with one known-answer run. Then test three uncomfortable cases before turning on the trigger: an empty source, a stale source, and a result that crosses the escalation threshold. A loop that only works on a cheerful Tuesday is still a demo.

Common failure modes:

- **The checker repeats the maker's opinion.** Replace “does this look right?” with evidence and coverage checks.
- **The gate has no hold path.** Missing data becomes a confident-looking post. Define what stops publication and who gets alerted.
- **State grows without a data boundary.** Keep receipts and links; do not create a shadow customer-data store.
- **The next run cannot learn from an override.** Record the human decision and reason so the same false alarm does not recur silently.

---

## Three patterns to adapt

Each pattern starts from a recipe in the preceding chapters. Keep the first outputs private, measure review effort against your own manual baseline, and test the named failure before widening the audience.

### 1. Morning briefing

- **Trigger:** a weekday schedule timed before your normal triage window.
- **Output:** apply the 0B.3 triage recipe, then post `ACTS_ON_ME / FYI / ROUTES / ARCHIVE` buckets to a private Slack channel. Do not archive or route anything.
- **Review gate:** you inspect the source links and decide what to act on. Team distribution requires a separate acceptance check.
- **Failure drill:** run an empty day and a duplicate schedule. Add the pause or disable step to your PTO checklist so absence produces a visible skip, not a pile of stale briefings.

### 2. Status digest

- **Trigger:** a weekly schedule that leaves a real review window before the update is due.
- **Output:** apply the 0B.4 summary recipe, save a dated private draft, then send the owner its link and review deadline. Do not share or email it.
- **Review gate:** the owner verifies evidence, edits the headline and asks, and sends the update. Compare that review time with the measured manual baseline; do not promise a fixed saving.
- **Failure drill:** remove or stale one input. The run must name the missing source and hold the draft rather than confidently summarising a partial week.

### 3. New-ticket triage

- **Trigger:** a new ticket in one bounded queue.
- **Output:** read the ticket, linked context, and ticket history; suggest an owner with confidence and reasoning. For medium or low confidence, ask the disambiguating question.
- **Review gate:** always require confirmation before routing. A streak of correct suggestions does not prove that rare high-cost misroutes are safe.
- **Failure drill:** reopen a previously routed ticket and deliver the event twice. The suggestion should consider the prior owner, and confirmation must produce at most one routing action.

---

## Where this pattern fits

| Good fit | Keep manual or move to Black Belt |
|---|---|
| Scheduled snapshots, bounded event responses, fixed-format aggregation, and “ping me when X happens” watchers | Open-ended multi-step reasoning where one result changes the plan |
| Drafts with an explicit review or deterministic low-risk gate | Customer-facing, production, or irreversible actions without proven controls |
| Work with affordable, rate-bounded triggers | Work whose polling frequency makes cost, locks, or load unacceptable |
| Recommendations whose decision owner is available | Political, emotional, or escalation judgement that depends on live context |

The durable boundary is simple: **the trigger runs a proven recipe; it does not inherit the owner's judgement.** Name which outputs can pass a deterministic gate and which still need a person.

---

## Keep the agent from becoming shelfware

Three habits make drift visible:

1. **Review receipts on a fixed cadence.** Check expected-versus-completed runs, source coverage, held outputs, and overrides—not just whether a message appeared.
2. **Keep the kill-switch obvious.** Record one tested disable path beside the owner and alert route. Pausing should not depend on remembering hidden settings.
3. **Fail loudly.** Expired credentials, rate limits, source changes, and skipped runs must alert the owner with the run ID and reason. Silence is not a successful empty run.

Review cadence should match consequence and frequency. A daily team-facing agent may need weekly review; a low-frequency private draft may not. Set the cadence in the loop card and tighten it after incidents or source changes.

---

## Connecting back to the boss fight

A lightweight agent can be a strong measurable boss-fight artefact because each triggered run can produce a receipt. It is not automatically the best choice.

Before committing one:

- **Start with a proven manual recipe.** Bring examples that cover normal input and at least one failure or empty-input case.
- **Choose the trigger the business moment needs.** Do not increase frequency merely to manufacture more measurements. Across the boss fight's two-week window, report how many eligible runs occurred and how many completed, held, failed, or were reviewed.
- **Measure your actual baseline.** Compare manual effort, review effort, corrections, and missed or duplicate runs. “Time saved” is an outcome to measure, not a property of scheduling.
- **Ship the stop path.** Include the owner, alert route, and tested disable instruction with the recipe contribution.

---

## What you should carry into the next chapter

- A **lightweight agent** is a tested recipe plus a trigger, runtime, bounded output, terminal receipt, owner, and stop path.
- Prefer an **event trigger** for one business change and a **schedule** for a periodic snapshot; poll only when the source is safe and the freshness, rate, and cost bounds hold.
- An asynchronous acknowledgement means **accepted, not completed**; return a run ID and status route, enforce time and work bounds, and finish with an itemised terminal receipt.
- Team-facing recurring work graduates to a **verified loop**: trigger → skill → maker → checker → gate → state.
- Graduate from manual to triggered work when representative evidence—not elapsed days—shows the normal and failure paths are understood.
- Morning briefings, status digests, and new-ticket triage all keep effects behind explicit review gates.
- Review receipts on a risk-based cadence, keep the kill-switch obvious, and make failure loud.
- The next chapter ([0B.8 — Building your own minimum viable wiki](08-minimum-viable-wiki.md)) is the operating-philosophy capstone of the Ops 101 track: knowledge-base-driven development, applied to ops work, in an hour.

---

**Previous:** [← 0B.6 Document workflows](06-document-workflows.md) · **Next:** [→ 0B.8 Building your own minimum viable wiki](08-minimum-viable-wiki.md)

**Further reading**
- [Product Agent Marketplace — accepted cart-recovery work ran unbounded for 29 minutes](https://razorpay.slack.com/archives/C0A94EJ38NP/p1786538573099029?thread_ts=1786538384.838939) — an internal case where a prompt HTTP response hid ongoing sequential work and a per-item dependency timeout
- [RFC 9110 §15.3.3 — 202 Accepted](https://datatracker.ietf.org/doc/html/rfc9110#section-15.3.3) — the protocol contract: acceptance is noncommittal, and the response ought to describe status and point to a status monitor
- [Product Agent Marketplace — duplicate dispute executions during cron-to-event migration](https://razorpay.slack.com/archives/C0A94EJ38NP/p1786357202255279?thread_ts=1786356982.507259) — 21 merchants were processed by both active paths before the cron path was disabled
- [Product Agent Marketplace — moving cart recovery from polling to events](https://razorpay.slack.com/archives/C0A94EJ38NP/p1786346248385549?thread_ts=1786345999.831889) — an internal case where the polling-based cart agent locked about 10% of the time
- [AWS Prescriptive Guidance — publish-subscribe pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/publish-subscribe.html) — an official overview of asynchronous event distribution, trade-offs, and failure modes
- [AI Daily Digest runtime failure in `#ai-code-champions`](https://razorpay.slack.com/archives/C08BU395ZEJ/p1784612067110319) — a cloud schedule correctly skipped when its browser bridge and templates existed only on the local device
- [GitHub Docs — GitHub-hosted runners](https://docs.github.com/en/actions/concepts/runners/github-hosted-runners) — an official example of jobs executing on a separate hosted machine
- [Product AI Labs — a shipped daily-health loop](https://razorpay.slack.com/archives/C0A7B848RS7/p1782211644575319) — internal example of a scheduled health skill with Slack delivery and durable history
- [Loops for PMs — Aakash Gupta](https://www.news.aakashg.com/p/loops-pms) — a current PM-oriented treatment of trigger, skill, maker, checker, gate, and state
- [Anthropic on scheduled tasks and triggers](https://www.anthropic.com/) — the official patterns for trigger-shaped agent work
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/) — for why "single-shot, human in the loop" is the safer default than multi-step autonomous chains
- [Will Larson — Operations is a feature](https://lethain.com/) — for the broader discipline that keeps automated systems from rotting in your hands
