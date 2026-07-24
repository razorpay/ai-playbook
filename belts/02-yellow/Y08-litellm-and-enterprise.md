---
title: "LiteLLM and Claude workspace access"
slug: "belts/yellow/litellm-and-enterprise"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 8
time_minutes: 15
audience: "daily-builder"
outcome: "Choose the Claude workspace or LiteLLM route you have actually been provisioned for."
prev: "belts/yellow/permissions-and-hooks"
next: "belts/yellow/figma-mcp"
pillar: "harness"
belt: "yellow"
tags: ["yellow-belt", "litellm", "claude-workspaces", "claude-team", "model-routing"]
updated: "2026-07-24"
---

# Y.8 - LiteLLM and Claude workspace access

Yellow Belt readers do not need to operate model infrastructure. You do need enough vocabulary to stop confusing a Claude workspace plan with the route Claude Code uses to reach a model.

Razorpay currently has more than one Claude access shape. Enterprise workspace access still exists, selected users may be moved to Claude Team, and terminal Claude Code can run through enabled LiteLLM routes. Access to one does not imply access to the others.

---

## If you're short on time

- **Claude Enterprise** is an org workspace for approved hosted chat and knowledge work.
- **Claude Team** is a separately provisioned, seat-limited subscription path. Use it only after support explicitly moves you there.
- **LiteLLM** is the gateway route for the models enabled on your key. It is not a workspace or a knowledge source.
- Use the route you were provisioned for. A second login is not a second budget.

---

## The mental model

```text
Workspace plan:    where your hosted Claude account and projects live
Model route:       how Claude Code reaches a model
Knowledge surface: what approved context the assistant can search
Working surface:   terminal, browser, Desktop, or an approved connector
```

The confusion usually sounds like:

```text
I was invited to Claude Team, so my LiteLLM key should work the same way.
```

Not necessarily. Support may move a provisioned user to the Team subscription path and change which frontier routes remain on that user's LiteLLM key. Follow the migration route you were given; do not splice credentials from two paths together.

Another confusion:

```text
LiteLLM knows the answer.
```

No. Routing infrastructure is not the knowledge source. It helps manage model calls.

---

## Choose your current route

Work through this top to bottom:

1. **Did support explicitly provision Claude Team and send the migration SOP?** Follow that SOP and use the specified Team workspace or subscription route. Do not assume an old Enterprise workspace, Team workspace, and LiteLLM key share access or history.
2. **No Team provision?** Keep using your existing Enterprise workspace for approved hosted work and terminal Claude Code through the models enabled on your LiteLLM key. Team access is not a prerequisite for the belt. If Desktop credits run out, do not request an extension: current support no longer extends them and routes further work to LiteLLM. Follow [W.5's canonical setup](../01-white/W05-installing-the-stack.md) if your terminal route is not ready.
3. **Need org knowledge?** Choose an approved workspace or connector that can see that context. A model route alone cannot search Slack, docs, or design files.
4. **The route changed or fails?** Preserve the exact error, selected model, and surface, remove secrets, then post in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD). Do not request another plan as a generic quota bypass.

The decision is deliberately boring: use the access path assigned to you, then choose the working surface for the task. Boring is good when the alternative is debugging three auth systems at once.

---

## Worked example

Task:

```text
I need to understand why a team chose a particular dashboard flow, then fix a small UI bug.
```

Better sequence:

1. Use your approved workspace or connector search to find the decision note or discussion summary.
2. Summarize the relevant context in five lines.
3. Open the repo in Claude Code.
4. Ask Claude Code to locate the component.
5. Use the code route you were provisioned for—Claude Team if support migrated you there, otherwise an enabled LiteLLM route—to edit, test, and PR.

Do not try to make one surface do all of it.

---

## What daily builders need to know

You should know:

- which Claude workspace plan and code route you were provisioned for;
- which tool is approved for repo edits;
- which surface is approved for org knowledge search;
- which setup check verifies your local model path;
- where to route auth or quota failures;
- how to avoid pasting sensitive context into the wrong surface.

You do not need to know:

- provider routing internals;
- fallback model policy;
- trace storage design;
- quota allocation logic;
- infrastructure ownership maps.

Those are later-belt or platform topics.

---

## Common failure modes

**"I treated a Team invite as extra LiteLLM quota."** They are separate access paths. Use the route support assigned; do not combine credentials or assume budgets transfer.

**"I assumed Enterprise and Team share workspace history."** Do not assume cross-workspace continuity. Verify the destination named in the migration SOP before relying on projects or prior chats.

**"I ran out of Desktop credits and requested more."** Desktop credits are no longer extended. Continue through the LiteLLM route enabled on your key; if that route is not configured, follow W.5 rather than improvising another account or credential.

**"I treated routing errors like prompt errors."** If every prompt fails before reasoning starts, route the model path issue.

**"I assumed all tools share memory."** They do not. Carry concise context between surfaces.

**"I tried to bypass the approved route."** Stop. The approved route is part of the safety and support model.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can distinguish model route from knowledge surface;
- you can name whether your current code route is Claude Team or LiteLLM;
- you know which surface edits repo files;
- you can route model-path failures without improvising.

You are **YELLOW** if:

- you know which tool to open but not why;
- workspace plan, model route, and connector context blur together;
- you need help interpreting an auth or quota error.

You are **RED** if:

- you consider unapproved model paths;
- you paste sensitive context into the wrong surface;
- all model calls fail after setup repair.

---

## What you can say after this module

> "I can name my Claude workspace, my code route, and the context surface for this task without mixing them up."

---

**Previous:** [Y.7 Permissions, hooks, slash commands](Y07-permissions-and-hooks.md) - **Next:** [Y.9 Figma MCP for non-engineers](Y09-figma-mcp.md)

