---
title: "Figma MCP for non-engineers"
slug: "belts/yellow/figma-mcp"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 9
time_minutes: 30
audience: "designer-builder"
outcome: "Use design connector context to move from a Figma frame to a small, reviewable code change."
prev: "belts/yellow/litellm-and-enterprise"
next: "belts/yellow/slack-and-gworkspace-mcps"
pillar: "context"
belt: "yellow"
tags: ["yellow-belt", "figma", "mcp", "design-to-code"]
updated: "2026-04-27"
---

# Y.9 - Figma MCP for non-engineers

This module is for the moment a design stops being a screenshot and becomes useful implementation context. A design connector can help Claude understand structure, copy, spacing, variants, and intended state. It does not remove the need for design judgement or code review.

Yellow Belt goal: use design context to make one small implementation move, not to auto-generate a whole product surface.

---

## If you're short on time

- Use the design connector to fetch scoped design context, not the whole file.
- Ask Claude to compare design intent with existing code before editing.
- Keep the first design-to-code change small: copy, state, spacing, or a single component variant.

---

## The mental model

```text
Figma frame -> design context summary -> repo component -> small diff -> screenshot review
```

The connector helps with the first two steps. Claude Code helps with the repo steps. You still review the final UI.

---

## What design context can provide

Depending on the connector and permissions, design context may include:

- frame names;
- layer hierarchy;
- text content;
- component names;
- variant names;
- tokens or style hints;
- spacing and layout clues;
- screenshots or preview snippets.

Treat this as input, not truth. The design may be stale. The code may already have a better component. The design system may require a different implementation path.

---

## Worked example: empty-state copy

Task:

```text
The design shows a clearer empty-state message than the current dashboard.
```

Step 1: fetch scoped design context.

```text
Goal: inspect the selected empty-state frame.
Scope: selected frame only.
Success criteria: summarize visible copy, component names, and any state labels.
```

Step 2: move to Claude Code.

```text
Goal: compare the design empty-state copy with the current implementation.
Context: design summary says the empty state title is "No matching transactions" and body text explains clearing filters.
Scope: dashboard empty-state component only.
Constraints: do not edit yet; prefer existing components.
Success criteria: identify the file and propose the smallest copy-only change.
```

Step 3: edit only after review.

```text
Apply only the copy change. Show me the diff. Do not commit.
```

Step 4: screenshot before PR.

If visual output changes, include a screenshot or a clear local verification note in the PR.

---

## What not to ask for

Avoid:

```text
Implement this whole Figma file.
```

Better:

```text
Use this selected frame to identify the empty-state copy and component variant. Then compare to the existing code and propose one small change.
```

Avoid:

```text
Make it pixel perfect.
```

Better:

```text
Use existing design-system components and tokens. Call out any mismatch you cannot safely fix in this PR.
```

---

## Common failure modes

**"The connector pulled too much design context."** Scope to selected frame, selected component, or named state.

**"Claude generated raw CSS instead of using the design system."** Add the constraint: prefer existing components and tokens.

**"The design and code disagree."** Do not force it. Ask for the smallest safe alignment and list unresolved design questions.

**"The implementation changed behaviour, not just presentation."** That may be out of Yellow scope. Stop and ask for review.

**"No screenshot was attached."** Visual changes need visual evidence, even tiny ones.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can fetch scoped design context;
- you can summarize design intent before editing code;
- you can keep a design-to-code change small;
- you include visual verification when UI changes.

You are **YELLOW** if:

- design context is available but noisy;
- the existing code does not match the design system name;
- you need help choosing between design and code conventions.

You are **RED** if:

- connector setup is not GREEN;
- Claude proposes replacing a whole screen;
- the change touches design-system internals.

---

## What you can say after this module

> "I can use design context to guide a small code change without pretending the connector is the reviewer."

---

## Further reading

- [Figma guide to the Dev Mode MCP Server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server) for the public product surface, access model, and setup vocabulary.
- [Model Context Protocol introduction](https://modelcontextprotocol.io/docs/getting-started/intro) for the underlying MCP mental model behind design connectors.

---

**Previous:** [Y.8 LiteLLM and Claude Enterprise](Y08-litellm-and-enterprise.md) - **Next:** [Y.10 Slack and Google Workspace MCPs](Y10-slack-and-gworkspace-mcps.md)
