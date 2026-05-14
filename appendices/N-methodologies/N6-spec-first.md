---
title: "Spec-first / agentic-loop design"
slug: "appendices/methodologies/spec-first"
section: "appendices"
status: "drafted"
type: "chapter"
track: "methodologies"
order: 6
time_minutes: 15
audience: "engineer"
outcome: "Understand why spec-first loops make AI work reviewable and reliable."
prev: "appendices/methodologies/three-pillars"
next: "appendices/methodologies/minimum-viable-wiki"
pillar: null
belt: null
tags: ["appendix", "frameworks", "spec-first"]
updated: "2026-04-26"
---

# N.6 — Spec-first / agentic-loop design

> **What this section is.** The harness-engineering pattern that all three frameworks in N.2–N.4 quietly assume. Spec-first is the discipline of *separating planning from execution* so that AI agents have a clean contract to work against — and "agentic loop design" is the broader family of harness patterns that make spec-first reliable in practice.

---

## The pitch in one paragraph

Spec-first is the discipline of writing down *what you want* in enough structured detail that an AI agent can execute it without re-deriving the intent from scratch. The spec is small (often a single markdown file), explicit (no implicit assumptions), and *separate from the execution* — you write it in one session, you execute it in another. Around the spec sits an **agentic loop**: the agent reads the spec, takes an action, observes the result, decides what to do next, repeats until done: with checkpoints, retries, and verification baked in. The two together (spec discipline plus loop design) are what turns "I asked the AI and got a confidently wrong answer" into "I gave the AI a contract and got a verifiable result." Most builders find that *spec-first is the single biggest unlock* in their journey from prompt-jockey to systems thinker.

---

## Why this pattern matters

Most readers learn AI coding by *talking* to the model. You type a request, it produces output, you adjust. This conversational style works fine for small tasks: *"explain this function," "fix this typo," "write a quick test."* It fails predictably for anything bigger.

The failure mode is recognisable: you start a session with a clear goal, the model produces something close to what you wanted, you ask for a tweak, then another, then another. By turn ten the conversation has accumulated so much half-finished context that the model loses the thread. By turn fifteen you're getting confidently wrong answers. By turn twenty you abandon and start over — and starting over means re-pasting all the context you'd already loaded.

Spec-first refuses the spiral. Instead of *talking your way to a result*, you spend ten minutes writing a *spec* — a structured, written-down version of what you want, what files it touches, how you'll verify success — and then you give the spec to a fresh agent session and let it execute. *No conversational drift. No context bloat. No turn-twenty confusion.* The spec is the contract; the execution is mechanical.

Once you've experienced this work loop a few times, the conversational style starts to feel quaint. *"I'll just write a quick spec"* becomes the default move for anything more complex than a one-off question. That instinct is what spec-first installs.

---

## What a spec actually contains

A spec for a small piece of work has, at minimum, five named parts. Different frameworks use different names (GSD's XML plans, gstack's autoplan output, the "design doc" pattern) but the *shape* is consistent.

**The goal.** One sentence. *"Add a 'reset password' link to the login page."* If you can't write the goal in one sentence, the work is too big and should be split into smaller specs.

**The files affected.** A list. *"`src/pages/Login.jsx`, `src/components/AuthLinks.jsx`, `tests/login.spec.ts`."* Specifying the files up-front *enormously* reduces the agent's tendency to wander into adjacent code. If a file isn't on the list, the agent shouldn't touch it.

**The action.** Step-by-step instructions for what to do, in plain language. *"Add a `<Link>` component below the password field. The link text is 'Forgot password?'. Clicking it navigates to `/auth/reset`. Style it to match the existing 'Sign up' link."* The level of detail here is the spec's craft — too vague and the agent improvises; too detailed and the spec becomes the work.

**The verification.** How will you know it worked? *"The login page renders the new link. Clicking it navigates to `/auth/reset`. The existing Playwright test for the login page still passes. The new link is keyboard-accessible (tab order, focus visible)."* The verification is the part most people skip and most regret skipping. Without it, the agent declares done when it *thinks* it's done; with it, the agent declares done when *the system says so.*

**The done condition.** What does the finished state look like, externally? *"PR open with the change, screenshot included, all checks green."* The done condition is the contract for *what comes out of this spec*, not what happens during.

You can write a useful spec in 10 minutes. Most are about 30–60 lines of markdown. Anything longer is usually two specs pretending to be one.

---

## The agentic loop, in one diagram

Around any spec, the harness runs a loop:

```
                 ┌──────────────────────────────┐
                 │           THE SPEC             │
                 │  (goal, files, action,         │
                 │   verification, done)          │
                 └──────────────▲───────────────┘
                                │  read by
                 ┌──────────────┴───────────────┐
                 │           THE AGENT           │
                 │   (a fresh Claude session,    │
                 │    no prior context)          │
                 └──────────────▲───────────────┘
                                │  loops:
                                │
                  ┌─────────────┼──────────────┐
                  │             │              │
                  ▼             ▼              ▼
           ┌────────────┐ ┌────────────┐ ┌────────────┐
           │  TAKE      │ │  OBSERVE   │ │  DECIDE    │
           │  ACTION    │ │  RESULT    │ │  NEXT STEP │
           │            │ │            │ │            │
           │ (edit file,│ │ (read      │ │ (continue, │
           │  run cmd,  │ │  output,   │ │  retry,    │
           │  call API) │ │  parse)    │ │  abort)    │
           └────────────┘ └────────────┘ └────────────┘
                                │
                                ▼  on done:
                 ┌──────────────────────────────┐
                 │         VERIFICATION           │
                 │  (run the spec's verification  │
                 │   step; pass = ship, fail =    │
                 │   loop again or escalate)      │
                 └──────────────────────────────┘
```

Three things in that loop matter more than the specifics.

**The agent reads the spec, not the conversation.** The session starts fresh. There is no prior turn. The spec is the only context. *This is the architectural choice that prevents conversational drift.*

**Action → observe → decide is the inner loop.** Each turn the agent does *one thing*, looks at what happened, and decides what to do next. If the action failed, the next decision is "retry differently." If the action succeeded, the next decision is "next step in the plan." The loop is conceptually simple and operationally hard: the agent has to be able to read its own output, parse what happened, and make a sensible next call.

**Verification is the exit condition.** The loop doesn't end when the agent decides it's done. It ends when the *spec's verification step* says it's done. This separation (*agent declares progress, spec declares success*) is what makes the pattern reliable. Without it, agents declare success on confidently-wrong work.

---

## What "agentic loop design" includes beyond the spec

The pattern goes by a few names: *agentic loops*, *agent harnesses*, *spec-and-loop*. Whatever you call it, the design considerations beyond just the spec are:

**Permission scoping.** What is the agent allowed to do? Read any file, write specific files, run specific commands, call specific APIs. The default in Claude Code (`y / n / a` per action, with bypassable batches) is roughly this; more sophisticated harnesses pre-declare the permissions in the spec itself so the agent never even *attempts* something out of scope.

**Retry policy.** When an action fails, what does the agent try next? Naïve harnesses retry the same action. Better ones retry with *more context* (the error message, the recent failure history). Best ones know when to escalate to a human rather than burn cycles on a stuck loop.

**Checkpoint cadence.** How often does the agent commit progress to disk so a crash doesn't lose work? Every action? Every step in the plan? Every verified milestone? The right answer depends on the cost of redoing work; for most coding tasks, every step is right.

**Observability.** What does the agent log? Which actions, with what context, with what outcomes? A run with no logs is a run you can't debug. Modern agentic harnesses lean heavily on tracing tools (Langfuse, internal equivalents) to make the loop's decisions inspectable after the fact.

**Verification depth.** A weak verification step says "the diff applied without error." A strong one runs the full test suite, takes a screenshot, checks an external API. The strength of verification is roughly the strength of the agent's honesty about whether the work is done.

You don't have to design a harness yourself to benefit from harness thinking. *Knowing what's in a good harness* helps you choose between platforms, helps you spot when a tool is missing a leg, and helps you tune the bits you can tune.

---

## Worked example — small enough to internalise

Imagine you want to add a "delete" button to a settings page. Conversationally, this is a five-message exchange that might or might not converge. Spec-first, it looks like this:

```markdown
# Spec: Add delete button to settings page

## Goal
Add a "Delete account" button to /settings/account that opens a confirmation modal,
and on confirm, calls the existing /api/v1/account/delete endpoint and
redirects to /goodbye.

## Files affected
- src/pages/SettingsAccount.jsx (add the button + modal trigger)
- src/components/DeleteAccountModal.jsx (new)
- tests/settings-account.spec.ts (new test)

## Action
1. Add a danger-styled button at the bottom of /settings/account titled "Delete account."
2. Clicking opens a confirmation modal with copy: "This permanently deletes your account.
   Type DELETE to confirm." Modal has Cancel and Confirm buttons. Confirm is disabled
   until the user types DELETE.
3. On Confirm, call the existing API endpoint /api/v1/account/delete (POST).
   On success, redirect to /goodbye. On failure, show an inline error in the modal.
4. Use the existing Blade Modal component, the existing Blade Button (variant="danger"),
   and the existing TextInput component.
5. Add a Playwright test that exercises: open settings, click delete, type partial DELETE
   (verify Confirm is disabled), type full DELETE (verify enabled), click Cancel
   (verify modal closes), click Confirm (verify redirect to /goodbye).

## Verification
- The existing test suite passes (no regressions).
- The new Playwright test passes.
- A manual screenshot of the modal looks like a Blade-compliant confirmation dialog.
- pre-ship-check passes all six layers (Blade compliance, design soundness,
  dependencies, conflicts, accessibility, screenshot).

## Done
- PR open with the changes, the new test, and the screenshot.
- pr-guardrail used to construct the PR description.
- Tagged the surface owner for review.
```

Read that spec. Notice how *little judgement* it leaves to the agent. The files are listed. The components to use are named. The test is described. The verification is concrete. The agent's job is to execute, not to invent — which is exactly what the model is best at.

The spec took about ten minutes to write. The execution, with a fresh agent session, takes another ten to twenty. Total time: half an hour. The conversational version of this task ("hey Claude, add a delete button") would have taken longer and produced a less reviewable result.

---

## Why this pattern is the harness pillar in practice

In the [N.5 three-pillar frame](N5-three-pillars.md), spec-first lives squarely in the *harness* pillar. It's a discipline about how the agent's environment is structured around the model's reasoning. You can have brilliant prompts and rich context, but without spec-and-loop discipline, your agent will drift, hallucinate, and declare done when it shouldn't.

This is also why the harness pillar is so *under-invested-in* across the industry. Spec-first feels like overhead. Writing a 30-line spec before doing the work *feels slower* even when it's faster. Most builders don't internalise spec-first until they've experienced one too many turn-twenty failures and concluded that the conversational style isn't the right tool for any work bigger than a typo.

Once you're past that threshold, spec-first becomes invisible — the same way version control became invisible to people who used to copy `final.docx` to `final-v2-real-this-time.docx`. The discipline disappears into the background; the *result* is that you ship work that's clean, verifiable, and resumable across sessions.

---

## How this maps to the playbook

A few specific places the pattern shows up by other names:

- **Plan mode in Claude Code.** When you toggle into plan mode (Shift+Tab), Claude proposes a plan before taking any action. *That's a spec.* You read it, edit it, accept it. The execution that follows is bounded by the plan you accepted. White Belt teaches plan mode as a safety reflex; Yellow Belt expects you to use it on anything non-trivial; Green Belt teaches you to *write* better specs that give plan mode more to work with.
- **The pre-ship-check skill.** A six-layer verification pass before any PR ships. *That's the verification leg of the loop.* The fact that the playbook ships a skill specifically for this is a tell about how load-bearing the verification step is.
- **The PR-guardrail skill.** A gated PR creation skill that reads the pre-ship report, refuses to open the PR if anything failed, and constructs the description from the prior context. *That's done-condition enforcement.* The agent isn't allowed to declare done; the guardrail is.
- **GSD's `.planning/` directory.** Specs as files in a directory, persisted across sessions. The whole framework profiled in [N.3](N3-gsd.md) is one elaborate spec-first system.

---

## When to skip spec-first

Honesty: you don't need a spec for everything.

- A typo fix doesn't need a spec.
- A one-line copy change doesn't need a spec.
- A quick exploration ("what does this code actually do?") doesn't need a spec.
- A creative wandering session — "what are we missing in this design?" — would be killed by a spec.

*Use spec-first when the work has a knowable shape.* When you can describe what done looks like, a spec helps. When you genuinely don't know what done looks like (exploration, research, brainstorming) a spec is premature; let the conversation breathe.

The line between "knowable shape" and "exploration" is judgement, and you'll calibrate over time. The default mistake is *to skip spec-first when you should have used it*; almost no one makes the opposite mistake.

---

**Up to:** [↑ Appendix N README](README.md) · **Previous:** [← N.5 The three pillars](N5-three-pillars.md) · **Next:** [→ N.7 The minimum viable wiki](N7-minimum-viable-wiki.md)

**Further reading**
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/) — the canonical write-up of the loop pattern from the harness side
- [Anthropic on Claude Code plan mode](https://code.claude.com/docs) — official documentation for the spec-first feature in the harness
- [Get Shit Done's `.planning/` schema](https://github.com/gsd-build/get-shit-done) — the most-developed public example of spec-first as a directory structure
