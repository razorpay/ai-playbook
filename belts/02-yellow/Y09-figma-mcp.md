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
outcome: "Choose the right Figma connector workflow for one small, reviewable canvas or code change."
prev: "belts/yellow/litellm-and-enterprise"
next: "belts/yellow/slack-and-gworkspace-mcps"
pillar: "context"
belt: "yellow"
tags: ["yellow-belt", "figma", "mcp", "design-to-code"]
updated: "2026-08-21"
---

# Y.9 - Figma MCP for non-engineers

This module is for the moment a design stops being a screenshot and becomes useful implementation context. A design connector can help Claude understand structure, copy, spacing, variants, and intended state. It does not remove the need for design judgement or code review.

Yellow Belt goal: use design context to make one small canvas or code move, not to auto-generate a whole product surface.

---

## If you're short on time

- Choose the output first. For work that stays on the Figma canvas, use the Design plugin's Blade skills. For production code, use the connector-to-repo path in this chapter.
- Start ambiguous Blade requests with `/design:blade-runner`; it can triage before creating anything that may already exist.
- Scope the target to one frame or component, then inspect the canvas output. A Blade-compliant Figma result is still design evidence, not production code.

---

## The mental model

```text
Canvas lane: Figma selection -> Blade skill -> created/reviewed/migrated canvas output
Code lane:   Figma frame -> design summary -> repo component -> small diff -> screenshot review
```

The connector enables both lanes. The Design plugin can act inside Figma; Claude Code handles the repo lane. You still review the final design and, when code changes, the rendered UI.

---

## Use the current Design plugin for Blade work in Figma

Razorpay's supported designer route is the `design` plugin. The older `design-engineer` plugin was absorbed into it in July 2026, so old installs no longer receive updates. The current plugin registers the Figma connector and exposes Blade workflows under the `/design:` prefix.

Install it after your core White Belt setup is GREEN:

```bash
claude marketplace add razorpay-marketplace https://github.com/razorpay/claude-plugins.git
claude plugin install design@razorpay-marketplace --scope user
```

If you still have the retired plugin, migrate rather than keeping both surfaces:

```bash
claude plugin uninstall design-engineer@razorpay-marketplace
claude plugin install design@razorpay-marketplace --scope user
```

### Choose the smallest Blade workflow

| You need to... | Start with | Expected Figma output |
|---|---|---|
| Decide whether Blade already covers a request | `/design:blade-triage` | A use, enhance, Snowflake, or create recommendation; no component build yet |
| Reason through an open design-system choice | `/design:blade-brainstorm` | A source-checked recommendation and unresolved questions |
| Route an ambiguous create/review/migrate request | `/design:blade-runner` | A hand-off to the right specialist skill |
| Create a confirmed-new component set | `/design:blade-component-designer` | A new component set using Blade variables, styles, and existing library instances |
| Audit an existing component or Snowflake | `/design:blade-component-reviewer` | A new audit frame; the reviewer may also apply mechanical name-only fixes |
| Rebuild an existing screen with Blade DSL | `/design:blade-design-migrator` | A Blade-based recreation beside the source design |
| Produce production frontend code | Do not use a canvas specialist | Follow the code lane here, then [G.15](../03-green/b-practices/G15-design-to-code.md) |

The canvas specialists create new nodes or reports beside the source rather than deleting or replacing it. That safeguard does not make every run read-only: the component reviewer can rename components, properties, values, or layers for mechanical compliance fixes. Confirm the selected target before you run it, and use a duplicate or scratch file when you are learning.

### Try it: one selected component, one receipt

Use this exercise on a non-critical component you can safely inspect:

1. Select one component in Figma. Do not target a whole library.
2. Ask the runner to classify the job before acting:

   ```text
   /design:blade-runner
   Review the selected component for Blade readiness.
   First name the specialist skill, target node, expected canvas changes,
   and stop conditions. Do not run the specialist until I confirm.
   ```

3. Confirm that it chose `blade-component-reviewer`, names the right node, and limits changes to the audit frame plus documented mechanical renames.
4. Approve the bounded run. Inspect the audit frame and every renamed item; undo any rename that alters design meaning rather than naming mechanics, and record the finding as rejected.
5. Save a small receipt: the Figma link, verdict, top finding, accepted rename, rejected finding, and unresolved owner question.

This is the interactive check for the module: the skill can produce the audit, but you must prove that you chose the right workflow and reviewed its effects.

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

**"My command starts with `/design-engineer:`."** That is the retired plugin prefix. Uninstall `design-engineer`, install or update `design`, restart Claude Code, and use `/design:`.

**"I used the component designer before checking whether Blade already had it."** Start with `blade-runner` or `blade-triage`. Recreating an existing component is drift with extra steps.

**"The audit changed names on my component."** The reviewer can apply mechanical name-only fixes. Verify the selected node and expected effects first; learn in a duplicate or scratch file, and inspect every rename.

**"The migrator made a Blade-looking Figma screen, so I handed it to engineering as code."** The migrator changes the canvas and generates no production code. Use the code lane and G.15 for an implementation that can ship.

**"The connector pulled too much design context."** Scope to selected frame, selected component, or named state.

**"Claude generated raw CSS instead of using the design system."** Add the constraint: prefer existing components and tokens.

**"The design and code disagree."** Do not force it. Ask for the smallest safe alignment and list unresolved design questions.

**"The implementation changed behaviour, not just presentation."** That may be out of Yellow scope. Stop and ask for review.

**"No screenshot was attached."** Visual changes need visual evidence, even tiny ones.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can choose the canvas lane or code lane before acting;
- you can route one bounded Blade request and inspect its canvas effects;
- you can fetch scoped design context;
- you can summarize design intent before editing code;
- you can keep a design-to-code change small;
- you include visual verification when UI changes.

You are **YELLOW** if:

- you can invoke a Blade skill but cannot predict whether it will create, rename, or only report;
- design context is available but noisy;
- the existing code does not match the design system name;
- you need help choosing between design and code conventions.

You are **RED** if:

- connector setup is not GREEN;
- you treat a Blade Figma recreation as production code;
- Claude proposes replacing a whole screen;
- the change touches design-system internals.

---

## What you can say after this module

> "I can choose a bounded Figma canvas or code workflow, inspect what the connector changed, and keep the final review human."

---

## Further reading

- [Razorpay Design plugin](https://github.com/razorpay/claude-plugins/tree/master/plugins/design) for the current install route, skill names, requirements, and supported boundaries.
- [`design-engineer` consolidation PR](https://github.com/razorpay/claude-plugins/pull/1057) for the migration from the retired plugin to the `/design:` surface.
- [Figma guide to the Dev Mode MCP Server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server) for the public product surface, access model, and setup vocabulary.
- [Model Context Protocol introduction](https://modelcontextprotocol.io/docs/getting-started/intro) for the underlying MCP mental model behind design connectors.

---

**Previous:** [Y.8 LiteLLM and Claude workspace access](Y08-litellm-and-enterprise.md) - **Next:** [Y.10 Slack and Google Workspace MCPs](Y10-slack-and-gworkspace-mcps.md)
