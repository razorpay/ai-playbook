---
title: "Slack MCP + Google Workspace MCP"
slug: "belts/yellow/slack-and-gworkspace-mcps"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 10
time_minutes: 30
audience: "daily-builder"
outcome: "Use messaging and workspace connectors to gather task context safely and summarize it for repo work."
prev: "belts/yellow/figma-mcp"
next: "belts/yellow/bug-hunting"
pillar: "context"
belt: "yellow"
tags: ["yellow-belt", "slack", "google-workspace", "connectors"]
updated: "2026-07-16"
---

# Y.10 - Slack MCP + Google Workspace MCP

Most work context is not in the repo. It is in messages, docs, comments, meeting notes, spreadsheets, and tickets. Connectors help you retrieve that context. Yellow Belt teaches you to turn it into a short, safe context packet for action.

The connector is not the work. The work is the handoff from context to a reviewable change.

---

## If you're short on time

- Search connectors with a named question, not broad curiosity.
- Summarize useful context before bringing it into Claude Code.
- Redact or omit sensitive material that is not needed for the task.

---

## The mental model

```text
Question -> connector search -> short summary -> repo action -> PR evidence
```

Good connector work produces a smaller prompt, not a bigger one.

---

## What to search

For Slack or messaging:

- symptom wording;
- component name;
- surface name;
- teammate-provided keywords;
- recent incident or release terms;
- known user-facing phrase.

For Google Workspace:

- decision docs;
- meeting notes;
- requirement docs;
- launch checklists;
- copy docs;
- spreadsheet rows relevant to the task.

Do not search for broad private categories. Search for the task.

---

## Worked example: turn a thread into repo context

Question:

```text
Has anyone discussed the dashboard empty state after date filtering?
```

Connector output summary:

```text
Relevant thread found from last week.
Useful points:
- issue appears after date filter;
- one teammate suspected date range transform;
- no owner confirmed a fix;
- no ticket linked in the thread.
No sensitive user details needed for this task.
```

Handoff to Claude Code:

```text
Context from messaging search:
- users see an empty state after date filtering;
- the thread suspected date range transform;
- no ticket was linked.

Goal: locate likely frontend files.
Scope: dashboard route, filter, and empty-state code.
Constraints: do not edit yet.
Success criteria: list likely files and separate evidence from inference.
```

That is enough. The repo task does not need the whole thread.

---

## Workspace documents

Docs and spreadsheets are useful when they answer:

- What was intended?
- Who owns the decision?
- What states should exist?
- What copy is approved?
- What constraints were agreed?

Summarize them like this:

```text
Doc context:
- intended behaviour:
- explicit non-goals:
- approved copy:
- open questions:
- source doc title:
```

Avoid pasting full documents unless the approved surface and task require it.

---

## Try a shipped workflow: evidence-first sprint retro

The shared [`devrev-sprint-retro` skill](https://github.com/razorpay/agent-skills/tree/master/generic-helpers/skills/devrev-sprint-retro) turns several connectors into one reviewable PM workflow. It uses DevRev for sprint state, the pod scorecard for the published score, and Slack plus Gmail or Drive for delivery context. The result is a draft retro with next-sprint suggestions, not a pile of search results.

Start with a bounded request:

```text
Run the sprint retro for <pod>.
Use DevRev for issue state, the pod scorecard for the published score,
and the stand-up source for context. Draft only; do not post or write back.
```

Confirm these anchors before the run:

- the pod or team name;
- the DevRev sprint link, ID, or exact date window;
- the authoritative scorecard sheet;
- the relevant stand-up source, such as the recurring meeting or channel.

The sources do different jobs. Keep them separate:

| Source | Use it for | Do not use it for |
|---|---|---|
| DevRev | sprint dates, issue IDs, state, owner, committed work | explaining why work moved |
| Scorecard | the published numeric sprint score | reconstructing issue state |
| Slack / stand-up notes | blockers, decisions, handoffs, delivery friction | changing the score |
| Gmail / Drive | meeting artefacts and missing context | silently overriding DevRev |

### Evidence gate: review before sharing

Use this checklist on the draft:

- [ ] Every shipped, open, or dropped-work claim has a DevRev issue ID.
- [ ] The numeric score is copied from the authoritative scorecard, not recomputed from chat context.
- [ ] Cancelled work is classified as dropped rather than disappearing from the ledger.
- [ ] Slack or meeting context explains delivery friction without changing score math.
- [ ] Missing or inaccessible sources are named explicitly.
- [ ] Next-sprint pickups are suggestions with evidence links, not silent commitments.
- [ ] Nothing was posted or written back without an explicit confirmation.

If a source conflicts with another source, surface the conflict in the draft. A retro that says “DevRev shows open; stand-up notes say shipped” is useful. A retro that quietly chooses one is tidy-looking fiction.

This is the connector pattern to remember:

```text
canonical state + authoritative metric + human context
    -> evidence ledger -> reviewed draft -> optional write-back
```

---

## Common failure modes

**"The connector found too much."** Narrow the query by surface, component, date range, or exact phrase.

**"I pasted the thread raw."** Summarize first. Raw threads are noisy and may include unnecessary details.

**"The doc contradicts Slack."** Name the conflict. Do not silently choose.

**"The connector result became stale."** Re-check before shipping if the task spans days.

**"I searched messages to avoid asking a person."** Connectors help, but a one-line human clarification is sometimes faster and safer.

**"The retro looks complete, but one source was unavailable."** Mark the missing source and rerun when access returns. Do not let polished prose hide incomplete coverage.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can search with a named question;
- you can produce a five-line context summary;
- you can avoid unnecessary sensitive detail;
- you can carry context into Claude Code cleanly.

You are **YELLOW** if:

- search results are noisy;
- you are unsure which doc is canonical;
- Slack and docs conflict.

You are **RED** if:

- connector access is broken;
- output contains sensitive material you do not need;
- the task depends on private data rather than a general symptom.

---

## What you can say after this module

> "I can turn connector context into a small safe packet for action."

---

## Further reading

- [Slack MCP server overview](https://docs.slack.dev/ai/slack-mcp-server/) for the public Slack MCP feature set, rate limits, authentication, and security notes.
- [Google Workspace MCP server configuration](https://developers.google.com/workspace/guides/configure-mcp-servers) for the public Google Workspace remote MCP server model across Gmail, Drive, Calendar, Chat, and People.
- [Model Context Protocol introduction](https://modelcontextprotocol.io/docs/getting-started/intro) for the shared protocol vocabulary behind both connector families.

---

**Previous:** [Y.9 Figma MCP for non-engineers](Y09-figma-mcp.md) - **Next:** [Y.11 Bug hunting with AI](Y11-bug-hunting.md)
