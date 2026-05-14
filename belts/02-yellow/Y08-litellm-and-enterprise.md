---
title: "LiteLLM and Claude Enterprise"
slug: "belts/yellow/litellm-and-enterprise"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 8
time_minutes: 15
audience: "daily-builder"
outcome: "Understand the difference between model routing infrastructure and enterprise knowledge surfaces at a daily-builder level."
prev: "belts/yellow/permissions-and-hooks"
next: "belts/yellow/figma-mcp"
pillar: "harness"
belt: "yellow"
tags: ["yellow-belt", "litellm", "claude-enterprise", "model-routing"]
updated: "2026-04-27"
---

# Y.8 - LiteLLM and Claude Enterprise

Yellow Belt readers do not need to operate model infrastructure. You do need enough vocabulary to stop confusing the model route with the knowledge surface.

LiteLLM-style routing and Claude Enterprise-style knowledge access solve different jobs.

---

## If you're short on time

- Model routing decides how approved model calls move through the org path.
- Enterprise knowledge surfaces help you search and reason over approved org context.
- Daily builders should use the approved path, not invent alternate routes.

---

## The mental model

```text
Model route:       how the request reaches a model
Knowledge surface: what approved context the assistant can search
Local tool:        where you work with files and commands
```

The confusion usually sounds like:

```text
Claude Enterprise should be able to fix my repo.
```

Maybe not. It may know about docs and conversations, but repo edits belong in Claude Code or a coding agent.

Another confusion:

```text
LiteLLM knows the answer.
```

No. Routing infrastructure is not the knowledge source. It helps manage model calls.

---

## Worked example

Task:

```text
I need to understand why a team chose a particular dashboard flow, then fix a small UI bug.
```

Better sequence:

1. Use enterprise knowledge or connector search to find the decision note or discussion summary.
2. Summarize the relevant context in five lines.
3. Open the repo in Claude Code.
4. Ask Claude Code to locate the component.
5. Use the approved model path and local harness to edit, test, and PR.

Do not try to make one surface do all of it.

---

## What daily builders need to know

You should know:

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

**"I used the enterprise surface for a code diff."** Use Claude Code when files must change.

**"I treated routing errors like prompt errors."** If every prompt fails before reasoning starts, route the model path issue.

**"I assumed all tools share memory."** They do not. Carry concise context between surfaces.

**"I tried to bypass the approved route."** Stop. The approved route is part of the safety and support model.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can distinguish model route from knowledge surface;
- you know which surface edits repo files;
- you can route model-path failures without improvising.

You are **YELLOW** if:

- you know which tool to open but not why;
- model route and connector context blur together;
- you need help interpreting an auth or quota error.

You are **RED** if:

- you consider unapproved model paths;
- you paste sensitive context into the wrong surface;
- all model calls fail after setup repair.

---

## What you can say after this module

> "I can tell model routing, enterprise knowledge, and local repo work apart."

---

**Previous:** [Y.7 Permissions, hooks, slash commands](Y07-permissions-and-hooks.md) - **Next:** [Y.9 Figma MCP for non-engineers](Y09-figma-mcp.md)

